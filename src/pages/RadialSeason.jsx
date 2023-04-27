/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-1 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
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
          <p className="-m-1 w-28 rounded-lg border p-2 font-bold">Saisons :</p>
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
          "Le Petit Monde" est une visualisation circulaire unique qui met en
          lumière les différentes saisons de la série "En sortant de l'école".
          En explorant cet univers artistique, les épisodes sont présentés selon
          les techniques d'animation et les poètes.
        </p>
        <p>
          Dans cette visualisation, les couleurs vives et variées illustrent les
          techniques d'animation utilisées dans chaque épisode, offrant un
          spectacle visuel époustouflant :
        </p>
        <ul className="custom-bullet">
          <li>
            Traditionnelle : l'art délicat de l'animation dessinée à la main
          </li>
          <li>
            Numérique : la modernité et la précision de l'animation assistée par
            ordinateur
          </li>
          <li>
            Papiers découpés : l'ingéniosité de l'animation à partir d'éléments
            de papier découpé
          </li>
          <li>
            Volume : l'authenticité de l'animation en trois dimensions avec des
            objets réels ou des maquettes
          </li>
          <li>
            Variée : l'audace de la combinaison de différentes techniques
            d'animation
          </li>
        </ul>
        <p>
          Pour explorer les épisodes en fonction des saisons et des poètes, et
          découvrir comment les techniques d'animation sont mises en œuvre pour
          rendre hommage à leur art, suivez ces étapes :
        </p>
        <ol>
          <li>
            Sélectionnez une saison en cliquant sur le nom du poète dans la
            légende interactive à droite de la visualisation.
          </li>
          <li>
            Admirez le cercle se transformer pour ne montrer que les épisodes de
            la saison choisie.
          </li>
          <li>
            Survolez un segment pour obtenir un aperçu de l'épisode, y compris
            le nombre de mots et la technique d'animation employée.
          </li>
        </ol>
        <p>
          Avec "Le Petit Monde", vous pourrez vous immerger dans la richesse des
          techniques d'animation et apprécier la manière dont elles sont
          utilisées pour donner vie aux œuvres de chaque poète. La variété des
          couleurs et des styles d'animation crée un tableau vivant et dynamique
          qui célèbre l'art et la poésie. Laissez-vous envoûter par cette
          expérience artistique unique et explorez les multiples facettes de
          l'univers de la série "En sortant de l'école".
        </p>
      </div>
    </div>
  );
};

export default RadialSeasonWrapper;
