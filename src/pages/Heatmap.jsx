/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import SeasonEpisodeHeatmaps from "../components/SeasonEpisodeHeatmaps/SeasonEpisodeHeatmaps";
import data from "../utils/poanimaDataset.json";
import { heatmapTranslations as translations } from "../translations/heatmapPage";
import { useLanguageContext } from "../utils/languageContext";

const HeatmapWrapper = () => {
  const { language } = useLanguageContext();
  const t = translations[language];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose w-full">
        <h2 className="-ml-16 text-left text-3xl uppercase tracking-widest drop-shadow-md">
          {t.title}
        </h2>
      </div>
      <div className="m-10">
        <SeasonEpisodeHeatmaps data={data} language={language} />
      </div>
      <div className="prose -ml-16 text-justify text-lg">
        <h3 className="my-5 text-3xl">{t.subtitle}</h3>
        <p>{t.paragraph1}</p>
        <p>{t.paragraph2}</p>
        <ul className="custom-bullet">
          {t.bullets.map((bullet, i) => {
            return <li key={i}>{bullet}</li>;
          })}
        </ul>
        <p>{t.navigateTitle}</p>
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

export default HeatmapWrapper;
