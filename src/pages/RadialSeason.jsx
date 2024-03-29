/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import data from "../utils/poanimaDataset.json";
import TitleWordsRadialSeason from "../components/TitleWordsRadial/TitleWordsRadialSeason";
import techniqueObj from "../utils/techniqueColors.json";
import Legend from "../components/Legend";
import LegendInteractiveSeason from "../components/LegendInteractiveSeason";
import { radialSeasonTranslations as translations } from "../translations/radialPages";
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

const RadialSeasonWrapper = () => {
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
      <div id="description" className="prose mb-1 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          {t.title}
        </h2>
      </div>
      <div className="flex w-full justify-center">
        <div className="mt-20 hidden w-40 lg:block">
          <Legend obj={techniqueObj[language]} language={language} />
        </div>
        <div className="">
          <TitleWordsRadialSeason data={filteredData} />
        </div>
        <div className="mt-20 w-40">
          <p className="-m-1 w-28 rounded-lg border p-2 font-bold">
            {t.legendTitle}
          </p>
          <LegendInteractiveSeason
            obj={seasonsObj}
            onLegendClick={handleSeasonClick}
            selectedSeason={selectedSeason}
          />
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3 className="my-5 text-3xl">{t.subtitle}</h3>
        <p>{t.paragraph1}</p>
        <p>{t.paragraph2}</p>
        <ul className="custom-bullet">
          {t.bullets.map((bullet, i) => {
            return <li key={i}>{bullet}</li>;
          })}
        </ul>
        <p>{t.stepsTitle}</p>
        <ol>
          {t.steps.map((step, i) => {
            return <li key={i}>{step}</li>;
          })}
        </ol>
        <p>{t.paragraph3}</p>
      </div>
    </div>
  );
};

export default RadialSeasonWrapper;
