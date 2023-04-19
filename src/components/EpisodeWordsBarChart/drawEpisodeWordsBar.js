import * as d3 from "d3";

const drawEpisodeWordsBar = (
  svgRef,
  data,
  xScale,
  yScale,
  colorScale,
  width,
  height,
  margin,
  handleMouseOver,
  handleMouseMove,
  handleMouseLeave
) => {
  const barWidth = (width - (margin.left + margin.right)) / data.length;

  if (svgRef.current) {
    d3.select(svgRef.current)
      .selectAll("rect")
      // helps D3.js to match the data elements by their index, and solve the problem with the transitions for the bars
      .data(data, (d, i) => i)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            // attributes to transition FROM
            .attr("x", (d, i) => i * barWidth + margin.left)
            .attr("y", height - margin.bottom)
            .attr("height", 0);

          return rect;
        },
        (update) => update,

        (exit) => {
          exit
            .transition()
            .duration(1000)
            // everything after here is transition TO
            .attr("y", height - margin.bottom)
            .attr("height", 0)
            .remove();
        }
      )
      .attr("width", xScale.bandwidth())
      .transition()
      .duration(1000)
      .attr("x", (d) => xScale(d.id))
      .attr("y", (d) => yScale(d.words))
      .attr("height", (d) => height - margin.bottom - yScale(d.words))
      .style("fill", (d) => colorScale(d.words))
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    d3.select(svgRef.current)
      .selectAll("rect")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseleave", handleMouseLeave);
  }
};

export default drawEpisodeWordsBar;
