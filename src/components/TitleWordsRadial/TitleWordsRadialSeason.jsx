import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import d3ColorExtractor from "../../utils/d3ColorExtractor";
import drawTitleWordsRadialSeason from "./drawTitleWordsRadialSeason";
import radialTooltip from "./radialTooltip";

const margin = { top: 5, right: 5, bottom: 20, left: 35 };
const width = 750 - margin.left - margin.right;
const height = 750 - margin.top - margin.bottom;
const innerRadius = 90;
const outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border
const techniques = [
  "Traditionnelle",
  "Numérique",
  "Papiers découpés",
  "Volume",
  "Variée",
];

const TitleWordsRadialSeason = ({ data: filteredData }) => {
  const svgRef = useRef(null);
  const radialBarRef = useRef(null);
  const tooltipRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // Force an initial update
    setUpdate((prevUpdate) => !prevUpdate);
  }, []);

  // Color array based on techniques
  const colorRange = d3ColorExtractor(d3.interpolateInferno, 5);

  const techniColor = techniques.map((technique, i) => {
    return {
      technique: technique,
      color: colorRange[i],
    };
  });

  // Create Domains
  const titles = filteredData.map((d) => d.title);
  const words = filteredData.map((d) => d.words);
  const wordsExtent = [0, Math.max(...words) + 50];

  // Create Scales
  const xScale = d3
    .scaleBand()
    .align(0)
    .domain(titles)
    .range([0, 2 * Math.PI]); // X axis goes from 0 to 2pi = all around the circle

  const yScale = d3
    .scaleLinear()
    .domain(wordsExtent)
    .range([innerRadius, outerRadius]);

  // Tooltip
  const updateTooltip = radialTooltip(
    tooltipRef,
    radialBarRef,
    width / 2,
    -height / 2
  );

  // const throttledUpdateTooltip = throttle(updateTooltip, 1000);

  const handleMouseOver = useCallback(
    (event, d) => {
      tooltipRef.current.style.display = "inline-block";
      d3.select(event.target).style("scale", "0.97");
      d3.select(event.target).style("opacity", "0.9");
      // .style("stroke-width", "2")

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
    d3.select(event.target).style("scale", "1");
    d3.select(event.target).style("opacity", "1");

    // .style("stroke", "none")
    // .style("stroke-width", "0");

    // tooltipRef.current.style.opacity = 0;
    tooltipRef.current.style.display = "none";
  }, []);

  useEffect(
    () =>
      drawTitleWordsRadialSeason(
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
      ),

    [
      tooltipRef,
      handleMouseOver,
      handleMouseMove,
      handleMouseLeave,
      filteredData,
      xScale,
      yScale,
      techniColor,
    ]
  );

  return (
    <div className="flex">
      <svg ref={svgRef} width={width} height={height}>
        <g
          ref={radialBarRef}
          transform={`translate(${width / 2},${height / 2})`}
        />
      </svg>
      <div
        ref={tooltipRef}
        className="absolute z-10 w-40 whitespace-pre-line rounded-md border border-slate-900 bg-white p-1 text-xs opacity-0 shadow-lg"
      ></div>
    </div>
  );
};

export default TitleWordsRadialSeason;
