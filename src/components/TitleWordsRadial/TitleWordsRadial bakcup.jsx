// import { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import _ from "lodash";

// const margin = { top: 5, right: 5, bottom: 20, left: 35 };
// const width = 750 - margin.left - margin.right;
// const height = 750 - margin.top - margin.bottom;
// const innerRadius = 90;
// const outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

// const TitleWordsRadial = ({ data }) => {
//   const filteredData = data.filter((d) => d.season === 1);
//   const svgRef = useRef(null);

//   const techniques = _.uniqBy(data, "technique").map((film) => film.technique);

//   // Color array based on techniques
//   function d3ColorExtractor(colorFormat, number) {
//     const start = 0.11; // Adjust this value to change the starting point of the color range
//     const end = 0.95; // Adjust this value to change the end point of the color range

//     const colorScaleExtract = d3
//       .scaleQuantize()
//       .domain([0, number - 1])
//       .range(
//         d3.quantize((t) => colorFormat(start + t * (end - start)), number)
//       );

//     const arrayColors = Array.from({ length: number }, (_, i) =>
//       colorScaleExtract(i)
//     );
//     return arrayColors;
//   }

//   const colorRange = d3ColorExtractor(d3.interpolateInferno, 5);

//   const techniColor = techniques.map((technique, i) => {
//     return {
//       technique: technique,
//       color: colorRange[i],
//     };
//   });

//   // Create Domains
//   const titles = filteredData.map((d) => d.title);
//   const words = filteredData.map((d) => d.words);
//   const wordsExtent = [0, Math.max(...words)];

//   // Create Scales
//   const xScale = d3
//     .scaleBand()
//     .align(0)
//     .domain(titles)
//     .range([0, 2 * Math.PI]); // X axis goes from 0 to 2pi = all around the circle

//   const yScale = d3
//     .scaleLinear()
//     .domain(wordsExtent)
//     .range([innerRadius, outerRadius]);

//   // Draw the chart
//   const draw = () => {
//     if (svgRef.current) {
//       d3.select(svgRef.current)
//         .append("g")
//         .attr("transform", `translate(${width / 2},${height / 2})`)
//         .selectAll("path")
//         .data(filteredData)
//         .enter()
//         .append("path")
//         .attr(
//           "fill",
//           (d) => techniColor.find((obj) => d.technique === obj.technique).color
//         )
//         .attr(
//           "d",
//           d3
//             .arc()
//             .innerRadius(innerRadius)
//             .outerRadius((d) => yScale(d.words))
//             .startAngle((d) => xScale(d.title))
//             .endAngle((d) => xScale(d.title) + xScale.bandwidth())
//             .padAngle(0.01)
//             .padRadius(innerRadius)
//         );

//       d3.select(svgRef.current)
//         .append("g")
//         .attr("transform", `translate(${width / 2},${height / 2})`)
//         .selectAll("g")
//         .data(filteredData)
//         .enter()
//         .append("g")
//         .attr("text-anchor", (d) =>
//           (xScale(d.title) + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
//           Math.PI
//             ? "end"
//             : "start"
//         )
//         .attr(
//           "transform",
//           (d) =>
//             `rotate(${
//               ((xScale(d.title) + xScale.bandwidth() / 2) * 180) / Math.PI - 90
//             }) translate(${yScale(d.words) + 10}, 0)`
//         )
//         .append("text")
//         .text((d) => _.truncate(d.title, { length: 15 }))
//         .attr("transform", (d) =>
//           (xScale(d.title) + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
//           Math.PI
//             ? "rotate(180)"
//             : "rotate(0)"
//         )
//         .style("font-size", "15px")
//         .attr("alignment-baseline", "middle");
//     }
//   };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => draw(), [filteredData]);

//   return (
//     <div className="flex">
//       <svg ref={svgRef} width={width} height={height}></svg>
//       <div>
//         {techniColor
//           .slice() // create a copy of the array before reversing it, to avoid modifying the original array
//           .reverse() // reverse the copy of the array
//           .map((film) => (
//             <div key={film.color}>
//               <span
//                 className={"mr-1 inline-block h-3 w-3 rounded-xl"}
//                 style={{
//                   backgroundColor: film.color,
//                 }}
//               ></span>
//               {film.technique}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default TitleWordsRadial;
