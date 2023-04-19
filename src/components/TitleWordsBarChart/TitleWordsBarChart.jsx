import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

const width = 800;
const height = 1000;
const margin = { top: 20, right: 5, bottom: 20, left: 250 };

const TitleWordsBarChart = ({ data }) => {
  let svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => draw(), [data]);

  const colorExtent = d3.extent(data, (d) => d.words).reverse();
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateInferno);

  // set domains on the scales
  const xDomain = d3.extent(data, (d) => d.words + 30);
  const yDomain = data.map((d) => d.title);

  // create scales
  const xScale = d3
    .scaleLinear()
    .domain([0, Math.max(...xDomain)])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleBand()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top]);

  const barHeight = (height - margin.top) / data.length;

  const draw = () => {
    //grab elements and style/position
    if (svgRef.current) {
      d3.select(svgRef.current)
        .selectAll("rect")
        .data(data, (d, i) => i)
        .join(
          (enter) => {
            const rect = enter
              .append("rect")
              .attr("x", margin.left)
              .attr("y", (d, i) => i * barHeight)
              .attr("width", 0)
              .attr("height", 0);

            return rect;
          },
          (update) => update,
          (exit) => {
            exit
              .transition()
              .duration(1000)
              .attr("y", barHeight)
              .attr("height", 0)
              .remove();
          }
        )
        .transition()
        .duration(1000)
        .attr("x", margin.left)
        .attr("y", (d) => yScale(d.title))
        .attr("height", yScale.bandwidth())
        .attr("width", (d) => xScale(d.words) - margin.left)
        .style("fill", (d) => colorScale(d.words))
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    }
  };

  // Draw the axis
  useEffect(() => {
    if (xAxisRef.current) {
      const xAxis = d3.axisBottom(xScale);
      d3.select(xAxisRef.current).transition().duration(1000).call(xAxis);
    }

    if (yAxisRef.current) {
      const yAxis = d3.axisLeft(yScale);
      d3.select(yAxisRef.current).transition().duration(1000).call(yAxis);
    }
  }, [xScale, yScale]);

  //create elements (but without anything special)
  // const bars = filteredData.map((d) => <rect key={d.id} />);

  return (
    <svg className="" width={width} height={height} ref={svgRef}>
      {/* {bars} */}
      <g
        className=""
        ref={xAxisRef}
        transform={`translate(0, ${height - margin.bottom})`}
      />
      <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
    </svg>
  );
};

export default TitleWordsBarChart;
