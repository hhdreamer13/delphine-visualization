import * as d3 from "d3";

const schoolTooltip = (tooltipRef, svgRef, height) => {
  const updateTooltip = (event, d) => {
    const xOffset = 10;
    const yOffset = -height + 10;

    const [pointerX, pointerY] = d3.pointer(event, svgRef.current);

    const tooltipX = pointerX + xOffset;
    const tooltipY = pointerY + yOffset;

    tooltipRef.current.style.opacity = 1;
    tooltipRef.current.style.transform = `translate(${tooltipX}px, ${tooltipY}px)`;
    tooltipRef.current.textContent = `Titre: ${d.title}
        Réalisateur: ${d.director}
        Saison: ${d.season}, Episode: ${d.episode}
        École: ${d.school}`;
  };

  return updateTooltip;
};

export default schoolTooltip;
