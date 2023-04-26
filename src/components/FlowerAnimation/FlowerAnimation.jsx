import * as d3 from "d3";
import { useEffect, useRef, useCallback } from "react";
import _ from "lodash";
import schoolFlowerTooltip from "./schoolFlowerTooltip";
import flowerPetalPaths from "../../utils/flowerPetalPaths.json";

const width = 800;
// const height = 450;
// const margin = { top: 5, right: 5, bottom: 20, left: 35 };
const layout = [4, 5, 4]; // Represents rows of 3 films, 3, 3 and 4

const animationObj = [
  {
    technique: "Traditionnelle",
    color: "#1b0c41",
    path: flowerPetalPaths[0].path,
  }, // Curvy petal with hollow inside
  {
    technique: "Numérique",
    color: "#721a6e",
    path: flowerPetalPaths[1].path,
  }, // Tooth shape petal
  {
    technique: "Papiers découpés",
    color: "#c63d4d",
    path: flowerPetalPaths[2].path,
  }, // Cartoony petal shape
  {
    technique: "Volume",
    color: "#f8890c",
    path: flowerPetalPaths[3].path,
  }, // realistic
  {
    technique: "Variée",
    color: "#f1ef75",
    path: flowerPetalPaths[4].path,
  }, // realistic pointy
];

const pathWidth = 120;
// const rowMargin = 100; // add margin between rows
// const perRow = Math.floor(width / pathWidth);

const calculateGridPos = (i, layout) => {
  let rowIndex = 0;
  let colIndex = i;
  let numElementsPassed = 0;

  while (colIndex >= layout[rowIndex]) {
    // eslint-disable-next-line no-unused-vars
    numElementsPassed += layout[rowIndex];
    colIndex -= layout[rowIndex];
    rowIndex++;
  }

  const topMargin = 20;
  // const rightMargin = 20;
  const interRowMargin = 100;
  const interColMargin = 20;

  // Calculate horizontal offset for centering each row
  const rowWidth =
    layout[rowIndex] * pathWidth + (layout[rowIndex] - 1) * interColMargin;
  const horizontalOffset = (width - rowWidth) / 2;

  return [
    horizontalOffset + (colIndex + 0.5) * pathWidth + colIndex * interColMargin,
    (rowIndex + 0.5) * pathWidth +
      rowIndex * interRowMargin +
      (rowIndex === 0 ? topMargin : 0),
  ];
};

// The component starts from here

const FlowerAnimation = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const svgHeight = layout.reduce((sum, row) => sum + pathWidth + 100, 0);

  // calculate the scales
  const flowersObj = (data) => {
    // const petalScale = d3.scaleOrdinal().range(data.map((d) => d.words));

    const numPetalScale = d3
      .scaleQuantize()
      .domain(d3.extent(data, (d) => d.words))
      .range(_.range(5, 13));

    return _.map(data, (d, i) => {
      return {
        id: d.id,
        title: d.title,
        director: d.director,
        color: animationObj.find((film) => film.technique === d.technique)
          .color,
        path: animationObj.find((film) => film.technique === d.technique).path,
        palette: d.palette, // Add this line to include the palette property
        // scale: petalScale(d.words),
        numPetals: numPetalScale(d.words),
        translate: calculateGridPos(i, layout),
      };
    });
  };

  // Tooltip
  const updateTooltip = schoolFlowerTooltip(tooltipRef, svgRef, 0, 0);
  // const throttledUpdateTooltip = throttle(updateTooltip, 1000);

  const handleMouseOver = useCallback(
    (event, d) => {
      updateTooltip(event, d);
    },
    [updateTooltip]
  );

  const handleMouseMove = useCallback(
    (event, d) => {
      updateTooltip(event, d);
    },
    [updateTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    tooltipRef.current.style.opacity = 0;
  }, []);

  // Draw

  const draw = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // Add Gaussian blur filter
      const filter = svg
        .append("defs")
        .append("filter")
        .attr("id", "blurAndSaturation");

      filter
        .attr("id", "blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 4); // adjust the blur intensity by changing the stdDeviation value

      filter
        .append("feColorMatrix")
        .attr("type", "saturate")
        .attr("values", 1.7); // adjust saturation

      // eslint-disable-next-line no-unused-vars
      const flowers = svg
        .selectAll("g")
        .data(flowersObj(data), (d) => d.id)
        .join(
          (enter) => {
            const flower = enter
              .append("g")
              .attr("opacity", 0)
              .attr("transform", (d) => `translate(${d.translate})`);

            // Add background circles
            const circleGroup = flower
              .append("g")
              .attr("class", "background-circles");
            const circleAngles = [0, 72, 144, 216, 288]; // angles for 5 circles around the center
            const circleRadius = 27; // radius of circles

            circleGroup
              .selectAll("circle")
              .data((d) =>
                circleAngles.map((angle, i) => ({ angle, color: d.palette[i] }))
              )
              .join("circle")
              .attr(
                "cx",
                (d) => circleRadius * Math.cos((d.angle * Math.PI) / 180)
              )
              .attr(
                "cy",
                (d) => circleRadius * Math.sin((d.angle * Math.PI) / 180)
              )
              .attr("r", circleRadius)
              .attr("fill", (d) => d.color)
              .attr("fill-opacity", 0.47)
              .attr("stroke", "none")
              .attr("filter", "url(#blur)"); // apply the blur filter

            // Draw flower petals
            flower
              .selectAll("path")
              .data((d, i) => {
                return _.times(d.numPetals, (j) =>
                  Object.assign({}, d, {
                    index: i,
                    rotate: j * (360 / d.numPetals),
                  })
                );
              })
              .join("path")
              .attr("d", (d) => d.path)
              .attr("fill", "none")
              .attr("stroke", "black")
              .attr("stroke-width", 5)
              .transition()
              .delay((d) => d.index * 200)
              .duration(1000)
              .attr("transform", (d) => `rotate(${d.rotate}) scale(${0.45})`);

            // Add text
            const text = flower.append("text");

            text
              .attr("text-anchor", "middle")
              .attr("dy", 80)
              .style("font-size", ".7em")
              .style("font-weight", "bold")
              .style("font-style", "italic")
              // .style("text-shadow", "1px 1px 1px rgba(0,0,0,0.5)") // add drop shadow
              .style("fill", "black") // set text color to white
              .text((d) => _.truncate(d.title, { length: 20 }));

            circleGroup
              .attr("opacity", 0)
              .transition()
              .delay((d, i) => i * 210)
              .duration(1000)
              .attr("opacity", 1);
            text
              .attr("opacity", 0)
              .transition()
              .delay((d, i) => i * 210)
              .duration(1000)
              .attr("opacity", 1);

            return flower;
          },
          (update) => update,
          (exit) => {
            exit.transition().duration(1000).attr("opacity", 0).remove();
          }
        )
        .attr("class", "flower-container")
        .attr("transform", (d) => `translate(${d.translate})`)
        .transition()
        .delay((d, i) => i * 200)
        .duration(1000)
        .attr("opacity", 1);

      d3.selectAll(".flower-container")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseLeave);
    }
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <div className={`flex overflow-y-auto overflow-x-hidden`}>
        <svg ref={svgRef} width={width} height={svgHeight}></svg>
        <div
          ref={tooltipRef}
          className="absolute whitespace-pre-line rounded-md bg-stone-50 p-2 font-['Caveat'] text-lg opacity-0 shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.07)_0px_2px_4px,rgba(0,0,0,0.07)_0px_4px_8px,rgba(0,0,0,0.07)_0px_8px_16px,rgba(0,0,0,0.07)_0px_16px_32px,rgba(0,0,0,0.07)_0px_32px_64px] transition-opacity duration-300 ease-in-out"
        ></div>
      </div>
    </div>
  );
};

export default FlowerAnimation;
