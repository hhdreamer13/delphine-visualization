import * as d3 from "d3";

const episodeTooltip = (tooltipRef, svgRef, height) => {
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
        Mots: ${d.words}`;
  };

  return updateTooltip;
};

export default episodeTooltip;
