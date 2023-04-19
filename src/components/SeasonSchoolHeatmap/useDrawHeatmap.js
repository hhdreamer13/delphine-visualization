import { useEffect } from "react";
import * as d3 from "d3";

const useDrawHeatmap = (
  svgRef,
  data,
  xScale,
  yScale,
  schoolObj,
  handleMouseOver,
  handleMouseMove,
  handleMouseLeave
) => {
  useEffect(() => {
    if (svgRef.current) {
      d3.select(svgRef.current)
        .selectAll("rect")
        .data(data, (d) => d.id)
        .join("rect")
        .attr("x", (d) => xScale(d.episode))
        .attr("y", (d) => yScale(d.season))
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .attr(
          "fill",
          (d) => schoolObj.find((school) => school.name === d.school).color
        )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseleave", handleMouseLeave);
    }
  }, [
    data,
    handleMouseOver,
    handleMouseMove,
    handleMouseLeave,
    svgRef,
    schoolObj,
    yScale,
    xScale,
  ]);
};

export default useDrawHeatmap;
