import * as d3 from "d3";

const drawTitleWordsRadialSeason = (
  svgRef,
  radialBarRef,
  filteredData,
  xScale,
  yScale,
  techniColor,
  width,
  height,
  innerRadius,
  handleMouseOver,
  handleMouseMove,
  handleMouseLeave
) => {
  const radialArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius((d) => yScale(d.words))
    .startAngle((d) => xScale(d.title))
    .endAngle((d) => xScale(d.title) + xScale.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

  if (svgRef.current) {
    d3.select(radialBarRef.current)
      .selectAll("path")
      .attr("class", "radial-bar")
      .data(filteredData, (d, i) => i)
      .join(
        (enter) => {
          const enterRadialBar = enter
            .append("path")
            .attr(
              "d",
              radialArc.innerRadius(innerRadius).outerRadius(innerRadius)
            );

          enterRadialBar
            .transition()
            .duration(2000)
            .attrTween("d", function (d) {
              const interpolateOuterRadius = d3.interpolate(
                innerRadius,
                yScale(d.words)
              );
              return function (t) {
                return radialArc
                  .innerRadius(innerRadius)
                  .outerRadius(interpolateOuterRadius(t))(d);
              };
            });

          return enterRadialBar;
        },
        (update) => update,

        (exit) => {
          exit
            .transition() // add a transition for the exit animation
            .duration(1000)
            .attrTween("d", function (d) {
              const interpolateOuterRadius = d3.interpolate(
                yScale(d.words),
                innerRadius
              );
              return function (t) {
                return radialArc
                  .innerRadius(innerRadius)
                  .outerRadius(interpolateOuterRadius(t))(d);
              };
            })
            .remove();
        }
      )
      .transition()
      .duration(1000)
      .attr(
        "fill",
        (d) => techniColor.find((obj) => d.technique === obj.technique).color
      )
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => yScale(d.words))
          .startAngle((d) => xScale(d.title))
          .endAngle((d) => xScale(d.title) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    d3.select(radialBarRef.current)
      .selectAll(".radial-bar")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseleave", handleMouseLeave);

    // Static center text
    const staticCenterText = d3
      .select(svgRef.current)
      .select(".static-center-text");

    if (staticCenterText.empty()) {
      d3.select(svgRef.current)
        .append("text")
        .attr("class", "static-center-text")
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .style("font-size", "15px")
        .attr("opacity", "1")
        .attr("transform", `translate(${width / 2 + 10},${height / 2})`)
        .text("Saison :");
    }

    // Dynamic center text (number)
    const dynamicCenterText = d3
      .select(svgRef.current)
      .select(".dynamic-center-text");

    if (!dynamicCenterText.empty()) {
      dynamicCenterText
        .transition()
        .duration(500)
        .attr("opacity", "0")
        .attr("transform", `translate(${width / 2 + 15},${height / 2 + 20})`)
        .on("end", () => {
          dynamicCenterText
            .text(filteredData[0].season)
            .transition()
            .duration(500)
            .attr("opacity", "1")
            .attr("transform", `translate(${width / 2 + 15},${height / 2})`);
        });
    } else {
      d3.select(svgRef.current)
        .append("text")
        .attr("class", "dynamic-center-text")
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .style("font-size", "15px")
        .attr("opacity", "1")
        .attr("transform", `translate(${width / 2 + 15},${height / 2})`)
        .text(filteredData[0].season);
    }

    // Text above bars
    const textArc = d3
      .arc()
      .innerRadius((d) => yScale(d.words) + 10)
      .outerRadius((d) => yScale(d.words) + 10)
      .startAngle((d) => xScale(d.title))
      .endAngle((d) => xScale(d.title) + xScale.bandwidth());

    const titlesGroup = d3
      .select(svgRef.current)
      .selectAll(".titles-group")
      .data(filteredData)
      .join(
        (enter) =>
          enter
            .append("g")
            .attr("class", "titles-group")
            .attr("transform", `translate(${width / 2},${height / 2})`),
        (update) => update,
        (exit) => exit.remove()
      );

    titlesGroup
      .selectAll("text")
      .data((d) => [d])
      .join(
        (enter) =>
          enter
            .append("text")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "middle"),
        (update) => update,
        (exit) => exit.remove()
      )
      .transition()
      .duration(1000)
      .attr("x", (d) => textArc.centroid(d)[0])
      .attr("y", (d) => textArc.centroid(d)[1])
      .attr("transform", (d) => {
        const angle =
          Math.atan2(textArc.centroid(d)[1], textArc.centroid(d)[0]) *
          (180 / Math.PI);
        const rotatedAngle =
          angle < 90 && angle > -90 ? angle + 90 : angle + 90;
        return `rotate(${rotatedAngle},${textArc.centroid(d)[0]},${
          textArc.centroid(d)[1]
        })`;
      })
      .text((d) => `E ${d.episode}`);

    // Re-calculate the center of each bar
    titlesGroup.selectAll("text").each(function (d) {
      const textNode = d3.select(this);
      const textPathNode = textNode.select("textPath");
      const textLength = textNode.node().getComputedTextLength();
      const startAngle = xScale(d.title);
      const endAngle = xScale(d.title) + xScale.bandwidth();
      const arcLength = (yScale(d.words) + 10) * (endAngle - startAngle);
      const offset = Math.max(0, (arcLength - textLength) / 4);
      textPathNode.attr(
        "startOffset",
        `${((offset + arcLength / 2) / arcLength) * 100 - 50}%`
      );
    });
  }
};

export default drawTitleWordsRadialSeason;
