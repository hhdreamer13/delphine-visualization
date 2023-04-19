import * as d3 from "d3";

const d3ColorExtractor = (colorFormat, number) => {
  const start = 0.11; // Adjust this value to change the starting point of the color range
  const end = 0.95; // Adjust this value to change the end point of the color range

  const colorScaleExtract = d3
    .scaleQuantize()
    .domain([0, number - 1])
    .range(d3.quantize((t) => colorFormat(start + t * (end - start)), number));

  const arrayColors = Array.from({ length: number }, (_, i) =>
    colorScaleExtract(i)
  );
  return arrayColors;
};

export default d3ColorExtractor;
