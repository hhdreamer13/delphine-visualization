/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import SchoolForce from "../components/SchoolForce/SchoolForce";
import data from "../utils/poanimaDataset.json";
import Lottie from "lottie-react";
import draggable from "../assets/91007-pinview.json";
import { forceTranslations as translations } from "../translations/forcePage";
import { useLanguageContext } from "../utils/languageContext";

const ForceWrapper = () => {
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
      <div className="relative m-10">
        <SchoolForce data={data} language={language} />
        <div
          className="absolute -bottom-10 right-[77px] hidden w-28 rotate-180 flex-col items-center justify-center p-0 -hue-rotate-90 saturate-150 lg:flex"
          title="Les nœuds sont déplaçables"
        >
          <Lottie animationData={draggable} loop autoplay speed={0.1} />
          {/* <p className="animate-pulse">déplaçable</p> */}
        </div>
      </div>
      <div className="prose -ml-16 text-justify text-lg">
        <h3 className="my-5 text-3xl">{t.subtitle}</h3>
        <p>{t.paragraph1}</p>
        <ul className="custom-bullet">
          {t.bullets.map((bullet, i) => {
            return <li key={i}>{bullet}</li>;
          })}
        </ul>
        <p>{t.navigateTitle}</p>
        <ol className="">
          {t.steps.map((step, i) => {
            return <li key={i}>{step}</li>;
          })}
        </ol>
        <p>{t.paragraph2}</p>
      </div>
    </div>
  );
};

export default ForceWrapper;
