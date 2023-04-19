import * as d3 from "d3";

const drawEpisodeWordAxes = (xAxisRef, yAxisRef, xScale, yScale) => {
  if (xAxisRef.current) {
    const xAxis = d3.axisBottom(xScale);
    d3.select(xAxisRef.current)
      .transition()
      .duration(1000)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "end")
      .style("font-size", "5px")
      .attr("dx", "4em")
      .attr("dy", "-1.5em");

    // d3.select(xAxisRef.current)
    //   .call(xAxis)
    //   .select(".domain")
    //   .style("stroke", "none");
  }

  if (yAxisRef.current) {
    const yAxis = d3.axisLeft(yScale);
    d3.select(yAxisRef.current).transition().duration(1000).call(yAxis);
  }
};

export default drawEpisodeWordAxes;
