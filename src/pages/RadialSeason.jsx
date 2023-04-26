/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import data from "../utils/poanimaDataset.json";
import TitleWordsRadialSeason from "../components/TitleWordsRadial/TitleWordsRadialSeason";
import techniqueObj from "../utils/techniqueColors.json";
import Legend from "../components/Legend";
import LegendInteractiveSeason from "../components/LegendInteractiveSeason";

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

const RadialSeasonWrapper = () => {
  const filterData = (seasonNumber) => {
    return data.filter((item) => item.season === seasonNumber);
  };

  const [filteredData, setFilteredData] = useState(filterData(1));
  const [selectedSeason, setSelectedSeason] = useState(1);

  // Click handlers
  const handleSeasonClick = (seasonName) => {
    const foundSeason = seasonsObj.find((s) => s.name === seasonName);
    if (foundSeason && selectedSeason !== foundSeason.number) {
      setSelectedSeason(foundSeason.number);
      setFilteredData(filterData(foundSeason.number));
    } else {
      setSelectedSeason(null);
      setFilteredData(filteredData);
    }
  };

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-1 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest">
          Le Petit Monde
        </h2>
      </div>
      <div className="flex w-full justify-center">
        <div className="mt-20 hidden w-40 lg:block">
          <Legend obj={techniqueObj} />
        </div>
        <div className="">
          <TitleWordsRadialSeason data={filteredData} />
        </div>
        <div className="mt-20 w-40">
          <p className="w-28 rounded-lg border p-2 font-bold">Saisons :</p>
          <LegendInteractiveSeason
            obj={seasonsObj}
            onLegendClick={handleSeasonClick}
            selectedSeason={selectedSeason}
          />
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3 className="my-5 text-3xl">Un tour du monde saisonnier</h3>
        <p>
          Bienvenue dans "Le Petit Monde", une visualisation circulaire des
          épisodes de la série "En sortant de l'école" axée sur les saisons.
          Chaque segment du cercle représente un épisode, et la couleur de
          chaque segment correspond à la technique d'animation utilisée dans cet
          épisode. La particularité de cette visualisation est qu'elle permet de
          filtrer les épisodes en fonction de la saison sélectionnée, offrant
          ainsi une vue plus précise des techniques utilisées pour chaque poète.
        </p>
        <p>Pour explorer cette visualisation, suivez ces étapes :</p>
        <ol>
          <li>
            Sélectionnez une saison en cliquant sur le nom du poète dans la
            légende interactive située à droite de la visualisation. Le cercle
            se mettra à jour pour afficher uniquement les épisodes de la saison
            choisie.
          </li>
          <li>
            Passez le curseur de votre souris sur un segment pour obtenir des
            informations détaillées sur l'épisode, notamment le nombre de mots
            et la technique d'animation utilisée.
          </li>
          <li>
            Consultez la légende à gauche pour identifier les techniques
            d'animation représentées par les différentes couleurs.
          </li>
        </ol>
        <p>
          En explorant "Le Petit Monde", vous pouvez apprécier la variété des
          techniques d'animation et comprendre comment elles sont réparties
          entre les épisodes pour chaque poète. Les couleurs vives et distinctes
          facilitent l'identification des techniques utilisées et rendent la
          visualisation encore plus attrayante.
        </p>
      </div>
    </div>
  );
};

export default RadialSeasonWrapper;
