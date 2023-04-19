import * as d3 from "d3";
import { useEffect, useRef } from "react";
import _ from "lodash";

const width = 800;
// const height = 450;
// const margin = { top: 5, right: 5, bottom: 20, left: 35 };
const animationObj = [
  {
    technique: "Traditionnelle",
    color: "#1b0c41",
    path: "M0 0 C50 50 50 100 0 100 C-50 100 -50 50 0 0",
  },
  {
    technique: "Numérique",
    color: "#721a6e",
    path: "M-35 0 C-25 25 25 25 35 0 C50 25 25 75 0 100 C-25 75 -50 25 -35 0",
  },
  {
    technique: "Papiers découpés",
    color: "#c63d4d",
    path: "M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0",
  },
  {
    technique: "Volume",
    color: "#f8890c",
    path: "M0,85 L-20,100 C-55,70 -40,50 -30,40 L-20,60 C-35,20 -10,25 0,0 M0,85 L20,100 C55,70 40,50 30,40 L20,60 C35,20 10,25 0,0",
  },
  {
    technique: "Variée",
    color: "#f1ef75",
    path: "M0 0 C50 25 50 75 0 100 C-50 75 -50 25 0 0",
  },
];

const pathWidth = 120;
const rowMargin = 100; // add margin between rows
const perRow = Math.floor(width / pathWidth);

const calculateGridPos = (i) => {
  const row = Math.floor(i / perRow);
  const col = i % perRow;
  const topMargin = 20; // Add top margin value here
  const rightMargin = 20; // Add right margin value here
  return [
    (col + 0.5) * pathWidth + (col === perRow - 1 ? rightMargin : 0),
    (row + 0.5) * pathWidth + row * rowMargin + (row === 0 ? topMargin : 0), // add margin between rows
  ];
};

// The component starts from here

const FlowerAnimation = ({ data }) => {
  const svgRef = useRef(null);

  const svgHeight =
    (Math.ceil(data.length / perRow) + 0.5) * pathWidth +
    Math.max(0, Math.ceil(data.length / perRow) - 1) * rowMargin;

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
        color: animationObj.find((film) => film.technique === d.technique)
          .color,
        path: animationObj.find((film) => film.technique === d.technique).path,
        palette: d.palette, // Add this line to include the palette property
        // scale: petalScale(d.words),
        numPetals: numPetalScale(d.words),
        translate: calculateGridPos(i),
      };
    });
  };

  // Memoize the flowersObj function

  const draw = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // svg.selectAll("*").remove();

      // Add Gaussian blur filter
      const filter = svg
        .append("defs")
        .append("filter")
        .attr("id", "blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 2); // adjust the blur intensity by changing the stdDeviation value

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
            const circleRadius = 30; // radius of circles

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
              .attr("fill-opacity", 0.35)
              .attr("stroke", "none")
              .attr("filter", "url(#blur)"); // apply the blur filter

            // Draw flower petals
            flower
              .selectAll("path")
              .data((d) => {
                return _.times(d.numPetals, (i) =>
                  Object.assign({}, d, { rotate: i * (360 / d.numPetals) })
                );
              })
              .join("path")
              .attr("d", (d) => d.path)
              .attr("fill", "none")
              .attr("stroke", "#2b2d2f")
              .attr("stroke-width", 5)
              .transition()
              .duration(1000)
              .attr("transform", (d) => `rotate(${d.rotate}) scale(${0.5})`);

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
              .delay(750)
              .duration(1000)
              .attr("opacity", 1);
            text
              .attr("opacity", 0)
              .transition()
              .duration(1000)
              .attr("opacity", 1);

            return flower;
          },
          (update) => update,
          (exit) => {
            // exit
            //   .selectAll(".background-circles")
            //   .transition()
            //   .duration(1000)
            //   .attr("opacity", 0);
            // exit
            //   .selectAll("text")
            //   .transition()
            //   .duration(1000)
            //   .attr("opacity", 0);
            exit
              .selectAll("*")
              .transition()
              .duration(1000)
              .attr("opacity", 0)
              .remove();
          }
        )
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("transform", (d) => `translate(${d.translate})`);
    }
  };

  useEffect(() => {
    draw();
  }, [data]);

  return (
    <div>
      <h1>Flower Animation</h1>
      <div className={`max-h-[600px] overflow-y-auto overflow-x-hidden`}>
        <svg ref={svgRef} width={width} height={svgHeight}></svg>
      </div>
    </div>
  );
};

export default FlowerAnimation;
