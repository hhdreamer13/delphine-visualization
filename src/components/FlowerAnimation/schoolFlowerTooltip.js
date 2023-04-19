import * as d3 from "d3";

const schoolFlowerTooltip = (tooltipRef, svgRef, width, height) => {
  const updateTooltip = (event, d) => {
    const xOffset = width + 20;
    const yOffset = -height + 20;

    const [pointerX, pointerY] = d3.pointer(event, svgRef.current);

    const tooltipX = pointerX + xOffset;
    const tooltipY = pointerY + yOffset;

    tooltipRef.current.style.opacity = 1;
    tooltipRef.current.style.transform = `translate(${tooltipX}px, ${tooltipY}px)`;
    tooltipRef.current.innerHTML = `<span style="font-family: 'Kaushan Script';">${d.title}</span>
    ${d.director}`;
  };

  return updateTooltip;
};

export default schoolFlowerTooltip;
