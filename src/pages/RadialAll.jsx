/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import _ from "lodash";
import dataset from "../utils/poanimaDataset.json";
import TitleWordsRadialAll from "../components/TitleWordsRadial/TitleWordsRadialAll";
import Legend from "../components/Legend";
import techniqueColors from "../utils/techniqueColors.json";
import { radialAllTranslations as translations } from "../translations/radialPages";
import { useLanguageContext } from "../utils/languageContext";

const RadialAllWrapper = () => {
  const [data, setData] = useState(dataset);

  const { language } = useLanguageContext();
  const t = translations[language];

  return (
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-10 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          {t.title}
        </h2>
      </div>

      <div className="mx-auto flex w-full justify-center">
        <div className="mt-20 hidden w-40 lg:block">
          <Legend obj={techniqueColors[language]} />
        </div>

        <div id="chart-container">
          <div className="m-1">
            <TitleWordsRadialAll data={data} />
          </div>
        </div>
        <div id="buttons" className="mt-20 hidden w-40 justify-center lg:block">
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words))}
            className="btn-outline btn-sm btn my-2 w-28 font-normal normal-case"
          >
            {t.buttons.ascending}
          </button>
          <button
            onClick={() => setData(dataset)}
            className="btn-secondary btn-sm btn my-2 w-28 font-normal normal-case"
          >
            {t.buttons.reset}
          </button>
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
            className="btn-outline btn-sm btn my-2 w-28 font-normal normal-case"
          >
            {t.buttons.descending}
          </button>
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

export default RadialAllWrapper;
