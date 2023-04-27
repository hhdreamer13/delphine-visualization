/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import FlowerAnimation from "../components/FlowerAnimation/FlowerAnimation";
import data from "../utils/poanimaDataset.json";
import flowerPetalPaths from "../utils/flowerPetalPaths.json";
import LegendFlower from "../components/FlowerAnimation/LegendFlower";

const seasonsObj = [
  { number: 1, name: "1. Prévert", color: "#FEC89A" }, // pastel apricot
  { number: 2, name: "2. Desnos", color: "#FFB3B3" }, // pastel red
  { number: 3, name: "3. Apollinaire", color: "#FDCFE8" }, // pastel pink
  { number: 4, name: "4. Éluard", color: "#FFC1F2" }, // pastel magenta
  { number: 5, name: "5. Roy", color: "#C5B7F7" }, // pastel lavender
  { number: 6, name: "6. Tardieu", color: "#9DE1FF" }, // pastel sky blue
  { number: 7, name: "7. Verlaine", color: "#A0F1F2" }, // pastel teal
  { number: 8, name: "8. Chedid", color: "#A7F3A0" }, // pastel green
  { number: 9, name: "9. Liberté", color: "#D6F89D" }, // pastel lime
  { number: 10, name: "10. Amitié", color: "#FFF9B0" }, // pastel gold
];

const legendData = [
  {
    id: 307,
    title: "Le repas",
    director: "Emilie Phuong",
    school: "Les Gobelins",
    technique: "Traditionnelle",
    palette: ["#705a42", "#dbd7a4", "#c2aa7a", "#453526", "#96835c"],
    words: 220,
    poet: "Guillaume Apollinaire",
    episode: 7,
    season: 3,
    year: 2016,
  },
  {
    id: 508,
    title: "Le jardin perdu",
    director: "Natalia Chernysheva",
    school: "La Poudrière",
    technique: "Numérique",
    palette: ["#385aa3", "#af0d13", "#2f2c1f", "#d3b45e", "#7e7939"],
    words: 121,
    poet: "Claude Roy",
    episode: 8,
    season: 5,
    year: 2018,
  },
  {
    id: 708,
    title: "Chanson d'automne",
    director: "Jean-Baptiste Marchand",
    school: "Estienne",
    technique: "Papiers découpés",
    palette: ["#534b8e", "#dc8b76", "#e6b7cd", "#d13843", "#312045"],
    words: 45,
    poet: "Paul Verlaine",
    episode: 8,
    season: 7,
    year: 2020,
  },
  {
    id: 910,
    title: "Soleil dérisoire",
    director: "Marie-Sarah Ouwe Missi Oukem",
    school: "EMCA",
    technique: "Volume",
    palette: ["#382317", "#d1ba90", "#9c865f", "#6b4a35", "#ae7213"],
    words: 87,
    poet: "Anne Hébert",
    episode: 10,
    season: 9,
    year: 2022,
  },
  {
    id: 802,
    title: "Destination Arbre",
    director: "Marie Deboissy",
    school: "Atelier de Sèvres",
    technique: "Variée",
    palette: ["#67512a", "#908d56", "#2f2a17", "#2d7d40", "#bcc093"],
    words: 133,
    poet: "Andrée Chedid",
    episode: 2,
    season: 8,
    year: 2021,
  },
];

const filmExample = {
  id: 902,
  title: "Le Hibou et l'hirondelle",
  director: "Gaspar Chabaud",
  school: "La Poudrière",
  technique: "Traditionnelle",
  palette: ["#27312e", "#9acbc8", "#6b9094", "#bf6d5c", "#4e585c"],
  words: 48,
  poet: "Claude Roy",
  episode: 2,
  season: 9,
  year: 2022,
};

const FlowerWrapper = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const filterData = (seasonNumber) => {
    return data.filter((item) => item.season === seasonNumber);
  };

  const [filteredData, setFilteredData] = useState(filterData(1));
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleSeasonChange = (event) => {
    const seasonNumber = parseInt(event.target.value, 10);
    setSelectedSeason(seasonNumber);
    setFilteredData(filterData(seasonNumber));
  };

  return (
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="" className="prose w-full">
        <h2 className="mb-4 text-center text-3xl uppercase tracking-widest drop-shadow-md">
          Les Fleures
        </h2>
      </div>
      <div className="flex w-full justify-center text-center">
        <label htmlFor="season-select" className="py-1">
          <p>Choisissez une saison :</p>
        </label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="ml-2 rounded-md border-[0.5px] px-2 py-1 shadow-md outline-none"
        >
          {seasonsObj.map((season) => (
            <option key={season.number} value={season.number}>
              {season.name}
            </option>
          ))}
        </select>
      </div>
      <div className="m-10">
        <FlowerAnimation data={filteredData} />
      </div>
      <div className="prose text-justify text-lg">
        <h3 className="mb-5 text-3xl">
          Poésie florale des techniques, poèmes et palettes
        </h3>
        <p>
          Inspirée par le travail de Shirley Wu et son projet "Film Flowers",
          cette visualisation présente un affichage floral unique pour
          représenter les poèmes adaptés en film d'animation. Chaque fleur
          symbolise un épisode, avec des pétales et des couleurs reflétant les
          techniques d'animation et les palettes de couleurs spécifiques de
          chaque film.
        </p>
        <p className="text-slate-950 drop-shadow-md">Pétales</p>
        <p>
          Chaque pétale représente une technique d'animation spécifique utilisée
          dans l'épisode.La forme des pétales indique la technique utilisée. La
          combinaison unique des pétales forme un motif de fleur distinct pour
          chaque épisode, mettant en évidence la diversité des techniques
          d'animation.
        </p>
        <div id="flower-petal-container" className="flex gap-2">
          {flowerPetalPaths.map((petal, index) => (
            <div
              key={index}
              className="flex h-48 w-32 flex-col items-center justify-center gap-10 text-sm"
            >
              <svg
                className="h-16 w-16"
                viewBox="0 0 110 110"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                stroke="black"
                strokeWidth="3"
                transform="rotate(228)"
              >
                <path d={petal.path} />
              </svg>
              <p className="mt-0">{petal.technique}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-950 drop-shadow-md">Nombre de pétales</p>
        <p>
          Le nombre total de pétales dans chaque fleur reflète le nombre de mots
          des poèmes adaptés. Plus il y a de pétales, plus le poème est long et
          riche en contenu. Le nombre de pétales est calculé à l'aide d'une
          échelle quantitative basée sur l'étendue du nombre de mots dans les
          poèmes, avec une plage allant de 5 à 13 pétales.
        </p>
        <div className="-ml-20 h-48">
          <LegendFlower data={legendData} />
        </div>
        <p className="mt-14 text-slate-950 drop-shadow-md">
          Les couleurs derrière les fleurs
        </p>
        <p>
          Chaque fleur est dessinée sur cinq cercles colorés qui représentent la
          palette des couleurs du film. Les couleurs choisies ajoutent une
          dimension intéressante à la visualisation.
        </p>
        <div id="color-palette-circles" className="flex">
          {filmExample.palette.map((color, index) => (
            <div key={index} className="h-32 w-32 text-center text-sm">
              <svg viewBox="0 0 100 100">
                <defs>
                  <filter
                    id={`blurAndSaturation-${index}`}
                    x="-0.5"
                    y="-0.5"
                    width="1.9"
                    height="1.9"
                  >
                    <feGaussianBlur stdDeviation="5" />
                    <feColorMatrix type="saturate" values="1.2" />
                  </filter>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill={color}
                  filter={`url(#blurAndSaturation-${index})`}
                />
              </svg>
              <p className="mt-0">La couleur {index + 1}</p>
            </div>
          ))}
        </div>
        <p className="mt-20">Pour explorer ce jardin enchanteur :</p>
        <ol>
          <li>
            Utilisez le menu déroulant "Choisissez une saison" situé au-dessus
            de la visualisation. Les fleurs affichées représenteront uniquement
            les épisodes de la saison sélectionnée.
          </li>

          <li>
            Observez les fleurs et leurs pétales pour apprécier la variété des
            techniques d'animation utilisées dans chaque épisode. Les teintes
            chatoyantes qui entourent chaque fleur illustrent les palettes de
            couleurs utilisées dans les épisodes.
          </li>
          <li>
            En survolant chaque fleur avec la souris, vous verrez apparaître une
            fenêtre contextuelle qui dévoile le nom de l'épisode ainsi que le
            nom du réalisateur ou de la réalisatrice. Vous pourrez ainsi mieux
            connaître les artistes talentueux à l'origine de ces œuvres d'art
            animées.
          </li>
        </ol>
        <p>
          En explorant les "Film Flowers", vous pouvez apprécier la richesse des
          techniques d'animation et comprendre comment elles sont réparties
          entre les épisodes pour chaque saison. Les couleurs vives et
          distinctes des pétales et de l'arrière-plan facilitent
          l'identification des techniques utilisées et rendent la visualisation
          encore plus attrayante.
        </p>
      </div>
    </div>
  );
};

export default FlowerWrapper;
