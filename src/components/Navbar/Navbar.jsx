import { Link, Outlet } from "react-router-dom";
import Modal from "../Modal";
import { useModalContext } from "../ModalContext";
import { useLanguageContext } from "../../utils/languageContext";

const navItems = [
  { name: { fr: "Intro", en: "Intro" }, to: "/" },
  {
    name: { fr: "Ville", en: "City" },
    to: "/ville/petite",
    dropdownItems: [
      { name: { fr: "Petite", en: "Little" }, to: "/ville/petite" },
      { name: { fr: "Grande", en: "Big" }, to: "/ville/grande" },
    ],
  },
  {
    name: { fr: "Monde", en: "World" },
    to: "/monde/petit",
    dropdownItems: [
      { name: { fr: "Petit", en: "Little" }, to: "/monde/petit" },
      { name: { fr: "Grand", en: "Big" }, to: "/monde/grand" },
    ],
  },
  { name: { fr: "Matrice", en: "Matrix" }, to: "/matrice" },
  { name: { fr: "Galaxie", en: "Galaxy" }, to: "/galaxie" },
  { name: { fr: "Fleur", en: "Flower" }, to: "/fleur" },
];

const Navbar = () => {
  const { showModal, setShowModal } = useModalContext();
  const { language, setLanguage } = useLanguageContext();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <nav className="relative rounded-b-2xl bg-neutral-200 p-4 shadow-[rgba(128,128,128,0.4)_0px_5px,rgba(192,192,192,0.3)_0px_10px,rgba(224,224,224,0.2)_0px_15px,rgba(240,240,240,0.1)_0px_20px,rgba(255,255,255,0.05)_0px_25px]">
          <div className=" mx-auto flex items-center justify-between">
            {/* Lang select */}
            <div className="absolute -right-10 top-3.5">
              <div className="group relative">
                {/* Button for the language */}
                <button className="flex w-7 items-center justify-center transition-all duration-300">
                  {language === "en" ? (
                    <img
                      src="/en.svg"
                      alt="English"
                      className=""
                      title="English"
                    />
                  ) : (
                    <img
                      src="/fr.svg"
                      alt="Français"
                      className=""
                      title="Français"
                    />
                  )}
                </button>

                {/* Dropdown */}
                <div className="absolute left-0 hidden space-y-2 rounded-md bg-base-200 p-2 text-base shadow-xl group-hover:block">
                  {/* English Option */}
                  <button
                    className="block w-8 rounded-md py-1 text-sm duration-300 hover:drop-shadow-sm"
                    onClick={() => setLanguage("en")}
                  >
                    <img
                      src="/en.svg"
                      alt="English"
                      className="w-6"
                      title="English"
                    />
                  </button>

                  {/* French Option */}
                  <button
                    className="block w-8 rounded-md py-1 text-sm duration-300 hover:drop-shadow-sm"
                    onClick={() => setLanguage("fr")}
                  >
                    <img
                      src="/fr.svg"
                      alt="Français"
                      className="w-6"
                      title="Français"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="text-lg font-bold"></div>
            <div className="mx-6 flex space-x-8">
              {navItems.map((item, index) => (
                <div className="relative" key={index}>
                  <div className="group">
                    <Link className="mx-2 py-2" to={item.to}>
                      <button
                        className={`transition-all duration-300 ${
                          !item.dropdownItems &&
                          "hover:text-rose-500 hover:drop-shadow-xl"
                        }`}
                      >
                        <p>{item.name[language]}</p>
                      </button>
                    </Link>
                    <div className="">
                      {item.dropdownItems && (
                        <div className="absolute left-0 mt-1 hidden space-y-2 rounded-md bg-base-200 p-2 text-base shadow-xl group-hover:block ">
                          {item.dropdownItems.map(
                            (dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                className="block rounded-md px-2 py-1 text-sm duration-300 hover:text-rose-500 hover:drop-shadow-xl"
                                to={dropdownItem.to}
                              >
                                <p>{dropdownItem.name[language]}</p>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
        <div className="">
          <Modal showModal={showModal} setShowModal={setShowModal} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
