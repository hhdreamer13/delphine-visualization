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
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          La Petite Ville
        </h2>
      </div>
      <div className="mx-auto flex w-full justify-center">
        <div className="m-10">
          <EpisodeWordsBarChart data={filteredData} width="600" />
        </div>
        <div className="ml-4 w-40">
          <p className="-ml-1 w-28 rounded-lg border p-2 font-bold">
            Saisons :
          </p>

          <LegendInteractiveSeason
            obj={seasonsObj}
            onLegendClick={handleSeasonClick}
            selectedSeason={selectedSeason}
          />
        </div>
      </div>
      {/* <img className="mb-4 w-[710px] rotate-180" src="/Spectral.png" alt="" /> */}
      <div className="prose text-justify text-lg">
        <h3 className="my-4 text-3xl">
          Une charmante petite ville pour chaque saison
        </h3>

        <p>
          Bienvenue dans "La Petite Ville", une visualisation artistique sous
          forme de graphique en barres, où chaque épisode de la série "En
          sortant de l'école" se transforme en un bâtiment pittoresque d'une
          ville animée par les saisons.
        </p>
        <ul className="custom-bullet">
          <li>
            <span>chaque barre :</span> une histoire poétique animée
          </li>
          <li>
            <span>hauteur des barres :</span> nombre de mots du poème adapté
          </li>
          <li>
            <span>couleurs :</span> du bleu au rouge, reflétant l'évolution du
            nombre de mots
          </li>
        </ul>
        <p>
          Sélectionnez un poète (un thème) dans la légende interactive pour vous
          aventurer dans les épisodes d'une saison dédiée et percevoir les
          variations narratives et artistiques qui la caractérisent.
        </p>
        <ol>
          <li>Choisissez un poète dans la légende enchanteresse</li>
          <li>Contemplez les épisodes de la saison en question</li>
          <li>
            Baladez le curseur sur une barre pour dévoiler les secrets de
            l'épisode
          </li>
        </ol>
        <p>
          "Le Petit Monde" permet de se concentrer sur les épisodes d'une saison
          en particulier, offrant ainsi une perspective plus approfondie sur les
          variations narratives et artistiques à l'intérieur d'une saison. Les
          couleurs des barres représentent l'augmentation du nombre de mots dans
          l'épisode, permettant de visualiser la densité narrative des
          adaptations pour chaque saison individuellement.
        </p>
      </div>
    </div>
  );
};

export default BarSeasonWrapper;
