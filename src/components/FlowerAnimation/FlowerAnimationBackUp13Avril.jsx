import * as d3 from "d3";
import { useEffect, useRef } from "react";
import _ from "lodash";

const width = 800;
// const height = 450;
// const margin = { top: 5, right: 5, bottom: 20, left: 35 };
const layout = [4, 5, 4]; // Represents rows of 3 films, 3, 3 and 4
const animationObj = [
  {
    technique: "Traditionnelle",
    color: "#1b0c41",
    path: `M5.38,.61c2.14,1.88,4.28,3.84,6.41,5.8,2.11,1.98,4.23,3.96,6.27,5.95,1.03,.99,2.04,1.98,3.02,2.97,.99,.99,1.97,1.96,2.92,2.94,3.8,3.88,7.26,7.62,10.14,10.9,2.88,3.28,5.2,6.11,6.78,8.13,.8,1,1.39,1.83,1.81,2.38,.41,.56,.62,.86,.62,.86,0,0-.31-.2-.9-.56-.58-.38-1.45-.91-2.51-1.62-2.14-1.43-5.13-3.52-8.62-6.14-3.49-2.63-7.47-5.79-11.63-9.28-1.05-.87-2.09-1.77-3.15-2.69-1.07-.91-2.13-1.84-3.19-2.79-2.15-1.88-4.27-3.84-6.41-5.8-2.11-1.98-4.23-3.96-6.26-5.96-.23-.22-.44-.44-.66-.66,1.72,13.55,7.72,49.84,24.07,64.99,37.09,34.38,33.93,10.25,46.98-3.82,13.04-14.07,37.35-12.75,.26-47.13C54.96,3.93,18.32,.69,4.67,0c.24,.2,.47,.4,.71,.61Z`,
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

  // Memoize the flowersObj function

  const draw = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // svg.selectAll("*").remove();

      // Add Gaussian blur filter
      // eslint-disable-next-line no-unused-vars
      const filter = svg
        .append("defs")
        .append("filter")
        .attr("id", "blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 2); // adjust the blur intensity by changing the stdDeviation value

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
              .attr("fill-opacity", 0.4)
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
              .attr("stroke", "black")
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
            exit.transition().duration(1000).attr("opacity", 0).remove();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <h1>Flower Animation</h1>
      <div className={`flex overflow-y-auto overflow-x-hidden`}>
        <svg ref={svgRef} width={width} height={svgHeight}></svg>
      </div>
    </div>
  );
};

export default FlowerAnimation;
