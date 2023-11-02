import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import _ from "lodash";
import Legend from "../Legend";
import schoColor from "../../utils/schoolColors.json";
import technicolor from "../../utils/techniqueColors.json";

const width = 600;
const height = 450;

const SchoolForce = ({ data, language }) => {
  const ref = useRef(null);

  const schools = _.map(_.uniqBy(data, "school"), (school, i) => ({
    id: `school-${i}`,
    title: school.school,
    group: "school",
  }));

  const schoolsNames = _.uniqBy(data, "school").map((film) => film.school);
  const schoolCounts = _.countBy(data, "school");
  const techniques = _.uniqBy(data, "technique").map((film) => film.technique);

  const schoolObj = schoolsNames.map((school) => {
    return {
      name: school,
      count: schoolCounts[school] || 0,
      color: schoColor.find((s) => s.name === school).color,
    };
  });

  schoolObj.sort((a, b) => b.count - a.count);

  // Technique Objects
  const techniquesCounts = _.countBy(data, "technique");
  const techniquesObj = techniques.map((technique) => {
    return {
      name: technique,
      count: techniquesCounts[technique] || 0,
      color: technicolor["fr"].find((t) => t.name === technique).color,
    };
  });

  techniquesObj.sort((a, b) => b.count - a.count);

  // Color Scale
  const colorScale = d3
    .scaleOrdinal()
    .domain(schoolObj.map((s) => s.name))
    .range(schoolObj.map((s) => s.color));

  const nodesData = data
    .map((d) => {
      return {
        id: `data-${d.id}`,
        title: d.title,
        group: d.school,
      };
    })
    .concat(schools);

  const linksData = data.map((d) => {
    return {
      source: `data-${d.id}`,
      target: schools.find((s) => s.title === d.school).id,
    };
  });

  const nodeFill = (d) => {
    const schoolNode = schools.find((school) => school.id === d.id);
    if (schoolNode) {
      return colorScale(schoolNode.title);
    } else {
      const filmNode = data.find((film) => `data-${film.id}` === d.id);
      if (filmNode) {
        const technique = filmNode.technique; // Assuming the technique is stored in the 'technique' property of each film object
        return technicolor["fr"].find((tech) => tech.name === technique).color;
      }
    }
  };
  const nodeStroke = "#fff"; // node stroke color
  const nodeStrokeWidth = 1.5; // node stroke width, in pixels
  const nodeStrokeOpacity = 1; // node stroke opacity
  const nodeRadius = (d) => {
    return d.group === "school" ? 10 : 5;
  };
  const linkStroke = "#999"; // link stroke color
  const linkStrokeOpacity = 0.6; // link stroke opacity
  const linkStrokeWidth = 1.5; // given d in links, returns a stroke width in pixels
  const linkStrokeLinecap = "round"; // link stroke linecap

  useEffect(() => {
    // Compute values.
    const N = nodesData.map((d) => d.id); // Update this line
    const LS = linksData.map(
      (d) => nodesData.find((node) => node.id === d.source).id
    );
    const LT = linksData.map(
      (d) => nodesData.find((node) => node.id === d.target).id
    );

    let nodeTitle = nodesData.map((d) => intern(d.title));

    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodesData.map((d) => d.title);
    const G = nodesData.map((d) => intern(d.id));
    const W =
      typeof linkStrokeWidth !== "function"
        ? null
        : d3.map(linksData, linkStrokeWidth);

    // Replace the input nodes and links with mutable objects for the simulation.
    const nodes = nodesData.map((d, i) => ({ id: N[i], group: d.group }));
    const links = linksData.map((_, i) => ({
      source: LS[i],
      target: LT[i],
    }));

    // Compute default domains.
    let nodeGroups = nodesData.map((d) => d.group);
    if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id((d) => d.id);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    let svg = d3.select(ref.current).select("svg");
    if (svg.empty()) {
      svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    }

    let linkLayer = svg.select(".links");
    if (linkLayer.empty()) {
      linkLayer = svg.append("g").attr("class", "links");
    } else {
      linkLayer.selectAll("line").remove();
    }

    let nodeLayer = svg.select(".nodes");
    if (nodeLayer.empty()) {
      nodeLayer = svg.append("g").attr("class", "nodes");
    } else {
      nodeLayer.selectAll("circle").remove();
    }

    const link = linkLayer
      .append("g")
      .attr("stroke", linkStroke)
      .attr("stroke-opacity", linkStrokeOpacity)
      .attr(
        "stroke-width",
        typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
      )
      .attr("stroke-linecap", linkStrokeLinecap)
      .selectAll("line")
      .data(links)
      .join("line");

    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);

    const node = nodeLayer
      .append("g")
      .attr("stroke", nodeStroke)
      .attr("stroke-opacity", nodeStrokeOpacity)
      .attr("stroke-width", nodeStrokeWidth)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", nodeFill)
      .call(drag(simulation));

    // if (T) node.append("title").text(({ index: i }) => T[i]);
    if (T) {
      node.append("title").text(({ index: i }) => {
        const currentTitle = T[i];
        const currentNodeData = nodesData[i];
        if (currentNodeData.group !== "school") {
          const filmNode = data.find(
            (film) => `data-${film.id}` === currentNodeData.id
          );
          if (filmNode) {
            return `${currentTitle}
Technique: ${filmNode.technique}`;
          }
        } else {
          const schoolName = currentNodeData.title;
          const filmCount = schoolCounts[schoolName] || 0;
          return `${currentTitle}
Nombre de films: ${filmCount}`;
        }
        return currentTitle;
      });
    }

    function intern(value) {
      return value !== null && typeof value === "object"
        ? value.valueOf()
        : value;
    }

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        if (event.type === "touchmove") {
          // If this is a touch event, use the first touch point as the mouse position.
          event.subject.fx = event.changedTouches[0].clientX;
          event.subject.fy = event.changedTouches[0].clientY;
        } else {
          // Otherwise, use the mouse position.
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    ref.current.appendChild(svg.node());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="ml-28 flex flex-col">
      <div className="flex">
        <div ref={ref}></div>
        <div className="mt-4">
          <Legend obj={schoolObj} />
        </div>
      </div>
      <div className="mt-8 flex">
        {technicolor[language].map((item) => (
          <div key={item.name} className="mx-2 font-body drop-shadow-md">
            <span
              className={"mr-1 inline-block h-3 w-3 rounded-xl"}
              style={{
                backgroundColor: item.color,
              }}
            ></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolForce;
