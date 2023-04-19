import * as d3 from "d3";
import { useEffect, useRef, useCallback } from "react";
import _ from "lodash";
import schoolFlowerTooltip from "./schoolFlowerTooltip";

const width = 800;
// const height = 450;
// const margin = { top: 5, right: 5, bottom: 20, left: 35 };
const layout = [4, 5, 4]; // Represents rows of 3 films, 3, 3 and 4
const flowerPetalPath = [
  {
    index: 0,
    name: "Miniature",
    path: "M7.21,3.62c.65-1.01,2.91-1.89,4.06-1.64,6.88,1.47,5.38-.13,9.86-.55,6.33-.58,11.81-1.53,19.61-.4,2.79,.4,5.89,.78,7.86,2.86,1,1.47-.16,3.22-.78,4.67,3.17,1.78,7.05,1.87,10.28,3.49,3.05,1.48,5.95,3.35,8.25,5.79,2.54,2.67,3.06,6.47,4.45,9.75,1.1,2.7,3.49,4.51,5.36,6.65-1.42,.72-2.86,1.41-4.29,2.11,3.49,5.02,7.11,9.97,9.93,15.41,2.45,4.68,3.67,9.96,6.56,14.41,2.32,3.47,6.11,5.56,9.1,8.4-6.2,4.59-14.05,6.28-21.46,5.94-5.57-.23-11.04-1.42-16.08-3.47-2.29-.92-4.13-2.75-6.63-3.21-2.08,.76-2.91,3.26-5.03,3.98-2.94,.96-6.03,.63-8.93,.1-2.52-.53-5.23-1.19-6.94-3.15-1.58-1.52-2.64-3.62-4.69-4.64-2.16-.47-3.53,2.9-5.68,1.94-4.13-1.46-6.27-5.51-9.82-7.78-4.7-3.1-9.84-6.6-11.15-12.39-1.97-8.68,1.75-13.58,2.25-25.21,.2-4.64-1.06-8.92-2.16-12.14-.33-.95,.25-3.54,1-4.31,.43-.44,.94-1.04,1.49-1.72,.12-.14,3.92,.27,6.57,1.93,3.49,2.17,9.8,10.54,9.96,10.34,.14-.18-6.4-8.8-9.53-11.3-2.53-2.02-5.56-2.82-5.45-2.96,.79-1.06,1.52-2.11,2.01-2.88Z",
  },
  {
    index: 1,
    name: "Fire",
    path: "M26.11,.96L5.85,4.85c-.27,.05-.52,.19-.7,.4h0c-.48,.55-.38,1.39,.2,1.82l17.38,15.25L4.17,7.99c-.52-.33-1.2-.23-1.6,.23l-.3,.34c-.18,.2-.28,.46-.3,.73L.74,27.06s-1.72,21.39,4.04,29.84c8.25,12.1,33.03,31.24,44.22,34.37,.99,.28,1.85-.71,1.46-1.66-2.61-6.41-2.4-16.12-2.22-19.57,.04-.7,.65-1.24,1.34-1.17,15.09,1.42,21.54,12.08,23.87,17.53,.45,1.04,1.96,.97,2.31-.1,8.12-24.51-1.16-41.65-5.96-48.33-.65-.91,.15-2.12,1.25-1.92,6.28,1.1,13.66-1.2,17.19-2.53,.92-.35,1.09-1.56,.3-2.15-10.52-7.87-24.79-20.95-25.49-21.6-.02-.02-.04-.03-.06-.05C48.61-2.53,26.11,.96,26.11,.96Z",
  },
  {
    index: 2,
    name: "Cartoony",
    path: "M87.13,81.44c-.41-13.1-14.67-27.08-30.19-40.23,.45,.26,.91,.56,1.34,.79,14.53,11.03,31.56,19.51,41.57,20.02,5.04-3.03,2.47-9.49-8.73-19.94,13.49,3.71,17.76-.92,14.33-5.43C93.29,16.5,74.39,6.19,57.28,1.67c-14.79-2.66-28.5,.16-41.97-.62,6.11,6.4,15.11,10.85,18.89,15.19-6.98-1.25-13.89-4.73-20.94-5.09,.68,5.83,6.76,12.89,6.78,16.64C13.25,22.99,8.75,17.59,1,13.05c.99,2.5,2.6,4.11,3.49,5.96,3.44,4.64,4.35,7.68,6.68,11.76,3.04,8.05,6.89,16.73,10.81,23,8.52,12.41,19.95,23.31,32.31,28.16,7.98,2.58,10.69-.72,6.7-10.49,13.7,10.67,24.81,12.94,26.12,9.99h0Z",
  },
  {
    index: 3,
    name: "Tooth",
    path: "M23.42,22.2C10.72,10.03,3.3,4.76,1.15,6.4c-.66,.5-.82,1.65-.49,3.45,2.13,18.55,8.6,42.61,26.7,61.96,4.45,4.75,20.8,22.1,32.74,18.01,6.89-2.36,9-13.06,16.21-20.59,7.28-7.6,18.27-10.41,20.02-17.37,2.95-11.72-16.06-26.28-21.05-30.07C65.93,14.66,44.74,1.34,8.84,.52c-1.66-.11-2.68,.16-3.07,.81-1.34,2.24,4.77,8.96,18.34,20.16-1.47,1.52,.79-.81-.68,.71Z",
  },
  {
    index: 4,
    name: "Simple",
    path: "M28.09,22.8c-3.5-4.04-4.62-5.08-9.92-8.62-2.09-1.4-4.97-3.37-8.38-5.86,1.8-2.09,4.09-5.17,5.18-7.66,4.03,1.77,8.09,2.84,12.4,2.54,17.42-1.11,39.34,1.79,44.24,31.96,2.29,15.14,7.74,26.41,14.74,42.82-19.15-9.88-31.99-8.39-44.26-11.05C18.89,59.71,12,51.39,6.25,28.13c-.54-5.15-2.78-9.28-5.49-13.52,2.29-.76,5.91-3.19,7.71-4.83,1.84,1.71,12.74,8.54,17.49,11.69,.21,.14,2.38,1.62,2.13,1.33Z",
  },
];
const animationObj = [
  {
    technique: "Traditionnelle",
    color: "#1b0c41",
    path: flowerPetalPath[0].path,
  }, // Curvy petal with hollow inside
  {
    technique: "Numérique",
    color: "#721a6e",
    path: flowerPetalPath[1].path,
  }, // Tooth shape petal
  {
    technique: "Papiers découpés",
    color: "#c63d4d",
    path: flowerPetalPath[2].path,
  }, // Cartoony petal shape
  {
    technique: "Volume",
    color: "#f8890c",
    path: flowerPetalPath[3].path,
  }, // realistic
  {
    technique: "Variée",
    color: "#f1ef75",
    path: flowerPetalPath[4].path,
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
        .attr("stdDeviation", 2); // adjust the blur intensity by changing the stdDeviation value

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
            const circleRadius = 26; // radius of circles

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
      <h1>Flower Animation</h1>
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
