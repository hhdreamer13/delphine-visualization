/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import data from "../utils/poanimaDataset.json";
import LegendInteractiveSeason from "../components/LegendInteractiveSeason";
import EpisodeWordsBarChart from "../components/EpisodeWordsBarChart/EpisodeWordsBarChart";
import { barSeasonTranslations as translations } from "../translations/barPages";
import { useLanguageContext } from "../utils/languageContext";

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
  const { language } = useLanguageContext();
  const t = translations[language];

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
      <div id="description" className="prose mb-20 w-full ">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          {t.title}
        </h2>
      </div>
      <div className="mx-auto flex w-full justify-center">
        <div className="m-10">
          <EpisodeWordsBarChart data={filteredData} width="600" />
        </div>
        <div className="ml-4 w-40">
          <p className="-ml-1 w-28 rounded-lg border p-2 font-bold">
            {t.seasonsLabel}
          </p>
          <LegendInteractiveSeason
            obj={seasonsObj}
            onLegendClick={handleSeasonClick}
            selectedSeason={selectedSeason}
          />
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3 className="my-4 text-3xl">{t.subtitle}</h3>
        <p>{t.description1}</p>
        <ul className="custom-bullet">
          <li>
            <span>{t.listItem1}</span>
          </li>
          <li>
            <span>{t.listItem2}</span>
          </li>
          <li>
            <span>{t.listItem3}</span>
          </li>
        </ul>
        <p>{t.instructions1}</p>
        <ol>
          {t.instructionList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BarSeasonWrapper;
