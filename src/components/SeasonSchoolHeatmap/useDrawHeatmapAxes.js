import { useEffect } from "react";
import * as d3 from "d3";

const useDrawHeatmapAxes = (xAxisRef, yAxisRef, xScale, yScale) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDrawHeatmapAxes;
