/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import _ from "lodash";
import dataset from "../utils/poanimaDataset.json";
import EpisodeWordsBarChart from "../components/EpisodeWordsBarChart/EpisodeWordsBarChart";
import { barAllTranslations as translations } from "../translations/barPages";
import { useLanguageContext } from "../utils/languageContext";

const BarAllWrapper = () => {
  const { language } = useLanguageContext();

  const [data, setData] = useState(dataset);

  const t = translations[language];

  return (
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-10 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          {t.title}
        </h2>
      </div>
      <div className="mx-auto flex w-full flex-row-reverse justify-center">
        <div id="buttons" className="mt-20 hidden w-40 justify-center lg:block">
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words))}
            className="btn-outline btn-sm btn my-2 w-28 rounded-sm font-normal normal-case"
          >
            {t.buttons.ascending}
          </button>
          <button
            onClick={() => setData(dataset)}
            className="btn-secondary btn-sm btn my-2 w-28 rounded-sm font-normal normal-case"
          >
            {t.buttons.reset}
          </button>
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
            className="btn-outline btn-sm btn my-2 w-28 rounded-sm font-normal normal-case"
          >
            {t.buttons.descending}
          </button>
        </div>
        <div id="chart-container">
          <div className="m-10">
            <EpisodeWordsBarChart data={data} width="800" />
          </div>
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3 className="my-4 text-3xl">{t.subtitle}</h3>
        <p>{t.firstParagraph}</p>
        <p>{t.secondParagraph}</p>
        <ul className="custom-bullet">
          <li>{t.bulletPoints.first}</li>
          <li>{t.bulletPoints.second}</li>
          <li>{t.bulletPoints.third}</li>
        </ul>
        <p>{t.thirdParagraph}</p>
        <ol>
          {t.orderedList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
        <p>{t.fourthParagraph}</p>
      </div>
    </div>
  );
};

export default BarAllWrapper;
