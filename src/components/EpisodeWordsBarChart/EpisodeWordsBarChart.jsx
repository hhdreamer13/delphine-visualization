import React, { useRef, useEffect, useCallback, useState } from "react";
import * as d3 from "d3";
import _ from "lodash";
import drawEpisodeWordsBar from "./drawEpisodeWordsBar";
import drawEpisodeWordAxes from "./drawEpisodeWordAxes";
import episodeTooltip from "./episodeTooltip";

const width = 800;
const height = 450;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const EpisodeWordsBarChart = ({ data: films }) => {
  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const tooltipRef = useRef(null);

  const [data, setData] = useState(films);

  useEffect(
    () =>
      drawEpisodeWordsBar(
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
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const colorExtent = d3.extent(data, (d) => d.words).reverse();
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateInferno);

  // set domains on the scales
  const xDomain = data.map((d) => d.id);
  const yDomain = d3.extent(data, (d) => d.words + 40);

  // create scales
  const xScale = d3
    .scaleBand()
    .domain(xDomain)
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...yDomain)])
    .range([height - margin.bottom, 0]);

  // Draw the axis
  useEffect(() => {
    drawEpisodeWordAxes(xAxisRef, yAxisRef, xScale, yScale);
  }, [xScale, yScale]);

  // Tooltip
  const updateTooltip = episodeTooltip(tooltipRef, svgRef, height);

  const handleMouseOver = useCallback(
    (event, d) => {
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
    tooltipRef.current.style.opacity = 0;
  }, []);

  return (
    <div>
      <div className="my-10 flex w-full justify-around">
        <button
          onClick={() => setData(_.sortBy(data, (d) => d.words))}
          className="btn-outline btn-sm btn normal-case"
        >
          Ascending
        </button>
        <button
          onClick={() => setData(films)}
          className="btn-outline btn-sm btn normal-case"
        >
          Reset
        </button>
        <button
          onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
          className="btn-outline btn-sm btn normal-case"
        >
          Descending
        </button>
      </div>

      <svg width={width} height={height} ref={svgRef}>
        {/* {bars} */}
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
    </div>
  );
};

export default EpisodeWordsBarChart;
