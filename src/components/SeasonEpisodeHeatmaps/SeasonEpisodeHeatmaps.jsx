import { useEffect, useRef, useCallback, useState } from "react";
import * as d3 from "d3";
import _, { throttle } from "lodash";
import LegendInteractive from "./LegendInteractive";
import ToggleSwitch from "../ToggleSwitch";
import schoColor from "../../utils/schoolColors.json";
import technicolor from "../../utils/techniqueColors.json";

// CONSTANTS
const width = 600;
const height = 450;
const margin = { top: 5, right: 5, bottom: 20, left: 35 };

const SeasonEpisodeHeatmaps = ({ data }) => {
  // References
  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const tooltipRef = useRef(null);

  // States
  const [chartVar, setChartVar] = useState("school");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  // Click handlers
  const handleSchoolLegendClick = (schoolName) => {
    if (selectedSchool === schoolName) {
      setSelectedSchool(null);
    } else {
      setSelectedSchool(schoolName);
    }
  };

  const handleTechniqueLegendClick = (techniqueName) => {
    if (selectedTechnique === techniqueName) {
      setSelectedTechnique(null);
    } else {
      setSelectedTechnique(techniqueName);
    }
  };

  // Get data
  const seasons = _.uniqBy(data, "season").map((film) => film.season);
  const episodes = _.uniqBy(data, "episode").map((film) => film.episode);

  const techniques = _.uniqBy(data, "technique").map((film) => film.technique);
  const schools = _.uniqBy(data, "school").map((film) => film.school);

  // Schools Objects
  const schoolCounts = _.countBy(data, "school");
  const schoolsObj = schools.map((school) => {
    return {
      name: school,
      count: schoolCounts[school] || 0,
      color: schoColor.find((s) => s.name === school).color,
    };
  });

  schoolsObj.sort((a, b) => b.count - a.count);

  // Technique Objects
  const techniquesCounts = _.countBy(data, "technique");
  const techniquesObj = techniques.map((technique) => {
    return {
      name: technique,
      count: techniquesCounts[technique] || 0,
      color: technicolor.find((t) => t.name === technique).color,
    };
  });

  techniquesObj.sort((a, b) => b.count - a.count);

  // create scales
  const xScale = d3
    .scaleBand()
    .domain(episodes)
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleBand()
    .domain(seasons)
    .range([height - margin.bottom, margin.top])
    .padding(0.1);

  // Tooltip
  const updateTooltip = (event, d) => {
    const xOffset = 15; // Adjust the offset to your preference
    const yOffset = 15;

    const [pointerX, pointerY] = d3.pointer(event, svgRef.current);

    const tooltipX = pointerX + xOffset;
    const tooltipY = pointerY + yOffset;

    tooltipRef.current.style.opacity = 1;
    tooltipRef.current.style.transform = `translate(${tooltipX}px, ${tooltipY}px)`;
    tooltipRef.current.textContent = `Titre: ${d.title}
    Réalisateur: ${d.director}
    Technique: ${d.technique}
      École : ${d.school}
      Saison: ${d.season}, Episode: ${d.episode}`;
  };

  const handleMouseOver = useCallback((event, d) => {
    d3.select(event.target).style("stroke", "black");
    d3.select(event.target).style("stroke-width", 3);

    tooltipRef.current.style.display = "inline-block";
    updateTooltip(event, d);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = useCallback(
    throttle((event, d) => {
      updateTooltip(event, d);
    }, 10),
    []
  );

  const handleMouseLeave = useCallback(() => {
    d3.select(event.target).style("stroke", "none");
    d3.select(event.target).style("stroke-width", 0);
    tooltipRef.current.style.display = "none";
  }, []);

  // Draw the charts
  const draw = () => {
    if (svgRef.current) {
      // eslint-disable-next-line no-unused-vars
      const rects = d3
        .select(svgRef.current)
        .selectAll("rect")
        .data(data, (d) => d.id)
        .join(
          (enter) => {
            const rect = enter
              .append("rect")
              // attributes to transition from
              .attr("fill", "none")
              .attr("opacity", 0);

            return rect;
          },
          (update) => update,
          (exit) => {
            exit
              .transition()
              .duration(1500)
              // everything after here is transition TO
              .attr("opacity", 0)
              .attr("fill", (d) =>
                chartVar === "technique"
                  ? techniquesObj.find((item) => item.name === d.technique)
                      .color
                  : schoolsObj.find((item) => item.name === d.school).color
              );
          }
        )
        .attr("x", (d) => xScale(d.episode))
        .attr("y", (d) => yScale(d.season))
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseleave", handleMouseLeave)
        .transition()
        .duration(1500)
        .ease(d3.easeQuadInOut)
        .attr("opacity", 1)
        .attr("fill", (d) => {
          if (chartVar === "technique") {
            return selectedTechnique && d.technique !== selectedTechnique
              ? "#FAF7FF"
              : techniquesObj.find((item) => item.name === d.technique).color;
          } else {
            return selectedSchool && d.school !== selectedSchool
              ? "#FAF7FF"
              : schoolsObj.find((item) => item.name === d.school).color;
          }
        })
        .style("stroke-width", 4)
        .style("stroke", "none");
    }
  };

  // Axes
  useEffect(() => {
    if (xAxisRef.current) {
      const xAxis = d3.axisBottom(xScale);
      d3.select(xAxisRef.current)
        .call(xAxis.tickSize(0))
        .select(".domain") // select the axis line
        .remove();

      d3.select(xAxisRef.current)
        .selectAll(".tick text")
        .attr("text-anchor", "center")
        .text((d) => `E ${d}`)
        .style("font-size", 12)
        .style("font-weight", "bold");
    }
    if (yAxisRef.current) {
      const yAxis = d3.axisLeft(yScale);
      d3.select(yAxisRef.current)
        .call(yAxis.tickSize(0))
        .select(".domain")
        .remove();
      // .style("stroke", "none");

      d3.select(yAxisRef.current)
        .selectAll(".tick text")
        .attr("text-anchor", "center")
        .text((d) => `S ${d}`)
        .style("font-size", 12)
        .style("font-weight", "bold");
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => draw(), [data, chartVar, selectedSchool, selectedTechnique]);

  return (
    <div>
      <div className="flex justify-end">
        <ToggleSwitch
          checked={chartVar === "school"}
          onChange={() => {
            if (chartVar === "school") {
              setChartVar("technique");
              setSelectedSchool(null);
            } else {
              setChartVar("school");
              setSelectedTechnique(null);
            }
          }}
          // onChange={() => {
          //   setChartVar(chartVar === "school" ? "technique" : "school");

          // }}
        />
      </div>
      <div className="flex">
        <svg ref={svgRef} width={width} height={height}>
          <g
            ref={xAxisRef}
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
        </svg>
        <div
          ref={tooltipRef}
          className="absolute z-30 w-40 whitespace-pre-line rounded-md border border-slate-900 bg-white p-1 text-xs opacity-0 shadow-lg"
        ></div>
        <div id="legends-container" className="relative w-40">
          <div
            className={
              "absolute z-0 ml-2 transition-all duration-1000 ease-in-out " +
              `${chartVar === "technique" ? "opacity-100" : "opacity-0"} 
              ${chartVar === "school" ? "pointer-events-none" : ""}
              `
            }
          >
            <LegendInteractive
              obj={techniquesObj}
              onLegendClick={handleTechniqueLegendClick}
            />
          </div>
          <div
            className={
              "absolute z-0 ml-2 transition-all duration-1000 ease-in-out " +
              `${chartVar === "school" ? "opacity-100" : "opacity-0"}
              ${chartVar === "technique" ? "pointer-events-none" : ""}
              `
            }
          >
            <LegendInteractive
              obj={schoolsObj}
              onLegendClick={handleSchoolLegendClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonEpisodeHeatmaps;
