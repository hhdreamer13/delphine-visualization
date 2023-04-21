/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import data from "../utils/poanimaDataset.json";
import LegendInteractiveSeason from "../components/LegendInteractiveSeason";
import EpisodeWordsBarChart from "../components/EpisodeWordsBarChart/EpisodeWordsBarChart";

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

const BarSeasonWrapper = () => {
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
      <div id="description" className="prose mb-20 w-full ">
        <h2 className="text-center text-3xl uppercase tracking-widest">
          La Petite Ville
        </h2>
      </div>
      <div className="mx-auto flex w-full justify-center">
        <div className="m-10">
          <EpisodeWordsBarChart data={filteredData} width="600" />
        </div>
        <div className="ml-4 w-40">
          <p className="w-28 rounded-lg border p-2 font-bold">Saisons :</p>

          <LegendInteractiveSeason
            obj={seasonsObj}
            onLegendClick={handleSeasonClick}
            selectedSeason={selectedSeason}
          />
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3>Une petite ville pour chaque saison</h3>

        <p>
          La visualisation "Le Petit Monde" présente un graphique à barres
          similaire à "La Grande Ville", mais avec une fonctionnalité
          supplémentaire : la sélection des saisons. Vous pouvez désormais
          explorer les épisodes d'une saison spécifique en choisissant le nom du
          poète correspondant dans la légende interactive.
        </p>
        <p>Pour profiter de cette visualisation, suivez ces étapes :</p>
        <ol>
          <li>
            Sélectionnez un poète dans la légende interactive pour afficher les
            épisodes de la saison correspondante.
          </li>
          <li>
            Passez le curseur de votre souris sur une barre pour obtenir des
            informations supplémentaires sur l'épisode, notamment le nombre de
            mots et les techniques d'animation employées.
          </li>
        </ol>
        <p>
          "Le Petit Monde" permet de se concentrer sur les épisodes d'une saison
          en particulier, offrant ainsi une perspective plus approfondie sur les
          variations narratives et artistiques à l'intérieur d'une saison. Les
          couleurs des barres représentent toujours l'augmentation du nombre de
          mots dans l'épisode, permettant de visualiser la densité narrative des
          adaptations pour chaque saison individuellement.
        </p>
      </div>
    </div>
  );
};

export default BarSeasonWrapper;
