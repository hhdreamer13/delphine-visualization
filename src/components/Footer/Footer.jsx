import { useLanguageContext } from "../../utils/languageContext";

const Footer = () => {
  const { language } = useLanguageContext();

  const footerTranslations = {
    fr: {
      createdWith: "Créé avec",
      by: "par Hooman",
      love: "d'amour",
    },
    en: {
      createdWith: "Created with",
      by: "by Hooman",
      love: "love",
    },
  };

  const t = footerTranslations[language];

  return (
    <footer className="group absolute bottom-0 mb-5 w-full p-4 font-titre text-2xl">
      <div className="flex items-center justify-center gap-4">
        <a href="/#" rel="noreferrer" target="_blanc">
          <span className="flex items-center justify-center drop-shadow-2xl">
            {t.createdWith}
            <span className="mx-2">
              <img
                src="/pixel.png"
                alt="heart"
                title={t.love}
                className="h-7 w-7 grayscale transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:grayscale-0 group-hover:saturate-150"
              />
            </span>
            {t.by}
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
