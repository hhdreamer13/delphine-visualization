const Footer = () => {
  return (
    <footer className="group absolute bottom-0 mb-5 w-full p-4 font-titre text-2xl">
      <div className="flex items-center justify-center gap-4">
        <a href="/" rel="noreferrer" target="_blanc">
          <span className="flex items-center justify-center drop-shadow-2xl">
            Créé avec
            <span className="mx-2">
              <img
                src="/pixel.png"
                alt="heart"
                title="d'amour"
                className="h-7 w-7 grayscale transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:grayscale-0 group-hover:saturate-150"
              />
            </span>
            par Hooman
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
