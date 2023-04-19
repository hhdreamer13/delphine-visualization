import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

const width = 800;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const SeasonSchoolRecords = ({ data }) => {
  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>
        {/* {bars} */}
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
    </div>
  );
};

export default SeasonSchoolRecords;
