const drawRadialAxisGuides = (svg, width, height, yScale, tickValues) => {
  const radialAxisGroup = svg
    .append("g")
    .attr("class", "radial-axis-group")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const radialAxis = radialAxisGroup
    .selectAll(".radial-axis")
    .data(tickValues)
    .join("g")
    .attr("class", "radial-axis");

  // Draw circles
  radialAxis
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", (d) => yScale(d))
    .attr("stroke", "#ccc")
    .attr("fill", "none")
    .attr("stroke-width", 0.5);

  // Draw labels
  radialAxis
    .append("text")
    .attr("x", 0)
    .attr("y", (d) => -yScale(d))
    .attr("dy", "-0.5em")
    .style("font-size", "10px")
    .attr("text-anchor", "middle")
    .text((d) => d);
};

export default drawRadialAxisGuides;
