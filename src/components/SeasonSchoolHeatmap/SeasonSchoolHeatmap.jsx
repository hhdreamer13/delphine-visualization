import { useRef, useCallback } from "react";
import * as d3 from "d3";
import _ from "lodash";
import schoolTooltip from "./schoolTooltip";
import Legend from "./Legend";
import useDrawHeatmap from "./useDrawHeatmap";
import useDrawHeatmapAxes from "./useDrawHeatmapAxes";

const width = 600;
const height = 450;
const margin = { top: 5, right: 5, bottom: 20, left: 35 };
const colorRange = [
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#00CC99",
  "#4C4CFF",
  "#2F4F4F",
  "#006064",
  "#C51162",
  "#FFD600",
  "#FF6D00",
  "#8BC34A",
  "#AD1457",
  "#A83E6C",
  "#6200EA",
  "#283593",
  "#212121",
  "#00838F",
  "#FF4081",
];

const SeasonSchoolHeatmap = ({ data }) => {
  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const tooltipRef = useRef(null);

  // get the data
  const seasons = _.uniqBy(data, "season").map((film) => film.season);
  const episodes = _.uniqBy(data, "episode").map((film) => film.episode);

  const schools = _.uniqBy(data, "school").map((film) => film.school);
  const schoolCounts = _.countBy(data, "school");

  // create scales
  const xScale = d3
    .scaleBand()
    .domain(episodes)
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleBand()
    .domain(seasons)
    .range([height - margin.bottom, margin.top])
    .padding(0.1);

  // create color palette

  const schoolObj = schools.map((school, i) => {
    return {
      name: school,
      count: schoolCounts[school] || 0,
      color: colorRange[i],
    };
  });

  schoolObj.sort((a, b) => b.count - a.count);

  // Tooltip
  const updateTooltip = schoolTooltip(tooltipRef, svgRef, 0);

  const handleMouseOver = useCallback(
    (event, d) => {
      d3.select(event.target).style("stroke", "black");
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
    d3.select(event.target).style("stroke", "none");
    tooltipRef.current.style.opacity = 0;
  }, []);

  // Axes
  useDrawHeatmapAxes(xAxisRef, yAxisRef, xScale, yScale);

  // Draw the heatmap
  useDrawHeatmap(
    svgRef,
    data,
    xScale,
    yScale,
    schoolObj,
    handleMouseOver,
    handleMouseMove,
    handleMouseLeave
  );

  return (
    <div className="flex">
      <svg ref={svgRef} width={width} height={height}>
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
      <div
        ref={tooltipRef}
        className="absolute w-40 whitespace-pre-line rounded-md border border-slate-900 bg-white p-1 text-xs opacity-0 shadow-lg"
      ></div>
      <div className="mt-1">
        <Legend obj={schoolObj} />
      </div>
    </div>
  );
};

export default SeasonSchoolHeatmap;
