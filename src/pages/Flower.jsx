/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import FlowerAnimation from "../components/FlowerAnimation/FlowerAnimation";
import data from "../utils/poanimaDataset.json";

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

const FlowerWrapper = () => {
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
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="" className="prose w-full">
        <h2 className="mb-4 text-center text-3xl uppercase tracking-widest">
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
          className="ml-2 rounded-md border px-2 py-1 shadow-xl outline-none"
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
        <h3>
          Poésie florale, inspirée des techniques d'animation, le nombre de mots
          des poèmes et des palettes de couleurs de films
        </h3>
        <p>
          Inspirée par le travail de Shirley Wu et son projet "Film Flowers",
          cette visualisation présente un affichage floral unique pour
          représenter les poèmes adaptés en film. Chaque fleur symbolise un
          épisode, avec des pétales et des couleurs reflétant les techniques
          d'animation et les palettes de couleurs spécifiques de chaque film.
        </p>
        <p className="text-black">Pétales</p>
        <p>
          Chaque pétale représente une technique d'animation spécifique utilisée
          dans l'épisode. La combinaison unique des pétales forme un motif de
          fleur distinct pour chaque épisode, mettant en évidence la diversité
          des techniques d'animation.
        </p>

        <p className="text-black">Nombre de pétales</p>
        <p>
          Le nombre total de pétales dans chaque fleur reflète le nombre de mots
          des poèmes adaptés. Plus il y a de pétales, plus le poème est long et
          riche en contenu.
        </p>

        <p className="text-black">Les couleurs derrière les fleurs</p>
        <p>
          Les couleurs derrière chaque fleur sont choisies pour mettre en valeur
          les pétales et faciliter la distinction entre les différentes
          techniques d'animation. Les couleurs vives et contrastées permettent
          de mieux apprécier la richesse visuelle de chaque épisode.
        </p>

        <p>Comment explorer cette visualisation :</p>
        <ol>
          <li>
            Sélectionnez une saison en utilisant le menu déroulant "Filtrer par
            saison" situé au-dessus de la visualisation. Les fleurs affichées se
            mettront à jour pour représenter uniquement les épisodes de la
            saison sélectionnée.
          </li>
          <li>
            Observez les fleurs et leurs pétales pour apprécier la variété des
            techniques d'animation utilisées dans chaque épisode. Les pétales de
            différentes couleurs symbolisent les différentes techniques
            d'animation.
          </li>
          <li>
            Immergez-vous dans cette visualisation dynamique et colorée pour
            découvrir comment les créateurs ont utilisé différentes techniques
            d'animation pour donner vie à la poésie de chaque saison. Portez une
            attention particulière aux motifs floraux uniques de chaque épisode
            pour apprécier la créativité et l'innovation derrière chaque
            animation.
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
