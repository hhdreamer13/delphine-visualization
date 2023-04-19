// import React, { useRef, useEffect, useCallback, useState } from "react";
// import * as d3 from "d3";
// import _ from "lodash";

// const width = 800;
// const height = 450;
// const margin = { top: 20, right: 5, bottom: 20, left: 35 };

// const EpisodeWordsBarChart = ({ data: films }) => {
//   const svgRef = useRef(null);
//   const xAxisRef = useRef(null);
//   const yAxisRef = useRef(null);
//   const tooltipRef = useRef(null);

//   const [data, setData] = useState(films);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => draw(), [data]);

//   const colorExtent = d3.extent(data, (d) => d.words).reverse();
//   const colorScale = d3
//     .scaleSequential()
//     .domain(colorExtent)
//     .interpolator(d3.interpolateInferno);

//   // set domains on the scales
//   const xDomain = data.map((d) => d.id);
//   const yDomain = d3.extent(data, (d) => d.words + 40);

//   // create scales
//   const xScale = d3
//     .scaleBand()
//     .domain(xDomain)
//     .range([margin.left, width - margin.right]);
//   const yScale = d3
//     .scaleLinear()
//     .domain([0, Math.max(...yDomain)])
//     .range([height - margin.bottom, 0]);

//   const barWidth = (width - (margin.left + margin.right)) / data.length;

//   const draw = () => {
//     //grab elements and style/position
//     if (svgRef.current) {
//       d3.select(svgRef.current)
//         .selectAll("rect")
//         // helps D3.js to match the data elements by their index, and solve the problem with the transitions for the bars
//         .data(data, (d, i) => i)
//         .join(
//           (enter) => {
//             const rect = enter
//               .append("rect")
//               // attributes to transition FROM
//               .attr("x", (d, i) => i * barWidth + margin.left)
//               .attr("y", height - margin.bottom)
//               .attr("height", 0);

//             return rect;
//           },
//           (update) => update,

//           (exit) => {
//             exit
//               .transition()
//               .duration(1000)
//               // everything after here is transition TO
//               .attr("y", height - margin.bottom)
//               .attr("height", 0)
//               .remove();
//           }
//         )
//         .attr("width", xScale.bandwidth())
//         .transition()
//         .duration(1000)
//         .attr("x", (d) => xScale(d.id))
//         .attr("y", (d) => yScale(d.words))
//         .attr("height", (d) => height - margin.bottom - yScale(d.words))
//         .style("fill", (d) => colorScale(d.words))
//         .attr("stroke", "black")
//         .attr("stroke-width", 2);

//       d3.select(svgRef.current)
//         .selectAll("rect")
//         .on("mouseover", handleMouseOver)
//         .on("mousemove", handleMouseMove)
//         .on("mouseleave", handleMouseLeave);
//     }
//   };

//   // Draw the axis
//   useEffect(() => {
//     if (xAxisRef.current) {
//       const xAxis = d3.axisBottom(xScale);
//       d3.select(xAxisRef.current)
//         .transition()
//         .duration(1000)
//         .call(xAxis)
//         .selectAll("text")
//         .attr("transform", "rotate(90)")
//         .style("text-anchor", "end")
//         .style("font-size", "5px")
//         .attr("dx", "4em")
//         .attr("dy", "-1.5em");

//       // d3.select(xAxisRef.current)
//       //   .call(xAxis)
//       //   .select(".domain")
//       //   .style("stroke", "none");
//     }

//     if (yAxisRef.current) {
//       const yAxis = d3.axisLeft(yScale);
//       d3.select(yAxisRef.current).transition().duration(1000).call(yAxis);
//     }
//   }, [xScale, yScale]);

//   // Tooltip
//   const updateTooltip = (event, d) => {
//     const xOffset = 10; // Adjust the offset to your preference
//     const yOffset = -height + 10;

//     const [pointerX, pointerY] = d3.pointer(event, svgRef.current);

//     const tooltipX = pointerX + xOffset;
//     const tooltipY = pointerY + yOffset;

//     tooltipRef.current.style.opacity = 1;
//     tooltipRef.current.style.transform = `translate(${tooltipX}px, ${tooltipY}px)`;
//     tooltipRef.current.textContent = `Titre: ${d.title}
//         Réalisateur: ${d.director}
//         Saison: ${d.season}, Episode: ${d.episode}
//         Mots: ${d.words}`;
//   };

//   const handleMouseOver = useCallback((event, d) => {
//     updateTooltip(event, d);
//   }, []);

//   const handleMouseMove = useCallback((event, d) => {
//     updateTooltip(event, d);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     tooltipRef.current.style.opacity = 0;
//   }, []);

//   return (
//     <div>
//       <div className="my-10 flex w-full justify-around">
//         <button
//           onClick={() => setData(_.sortBy(data, (d) => d.words))}
//           className="btn-outline btn-sm btn normal-case"
//         >
//           Ascending
//         </button>
//         <button
//           onClick={() => setData(films)}
//           className="btn-outline btn-sm btn normal-case"
//         >
//           Reset
//         </button>
//         <button
//           onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
//           className="btn-outline btn-sm btn normal-case"
//         >
//           Descending
//         </button>
//       </div>

//       <svg width={width} height={height} ref={svgRef}>
//         {/* {bars} */}
//         <g
//           ref={xAxisRef}
//           transform={`translate(0, ${height - margin.bottom})`}
//         />
//         <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
//       </svg>
//       <div
//         ref={tooltipRef}
//         className="absolute w-40 whitespace-pre-line rounded-md border border-slate-900 bg-white p-1 text-xs opacity-0 shadow-lg"
//       ></div>
//     </div>
//   );
// };

// export default EpisodeWordsBarChart;
