import { Link, Outlet } from "react-router-dom";
const navItems = [
  { name: "Intro", to: "/" },
  {
    name: "Ville",
    to: "/ville/petit",
    dropdownItems: [
      { name: "Petite", to: "/ville/petit" },
      { name: "Grande", to: "/ville/grand" },
    ],
  },
  {
    name: "Monde",
    to: "/monde/petit",
    dropdownItems: [
      { name: "Petit", to: "/monde/petit" },
      { name: "Grand", to: "/monde/grand" },
    ],
  },

  { name: "Matrice", to: "/matrice" },
  { name: "Galaxie", to: "/galaxie" },
  { name: "Fleure", to: "/fleure" },
];

const Navbar = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <nav className="relative rounded-b-2xl bg-neutral-200 p-4 shadow-[rgba(128,128,128,0.4)_0px_5px,rgba(192,192,192,0.3)_0px_10px,rgba(224,224,224,0.2)_0px_15px,rgba(240,240,240,0.1)_0px_20px,rgba(255,255,255,0.05)_0px_25px]">
          <div className=" mx-auto flex items-center justify-between">
            <div className="text-lg font-bold">
              {/* <Link to="/">
                <img
                  className="wind-animation absolute -bottom-5 left-[47%] h-8 w-8"
                  src="/flower.svg"
                  alt=""
                  // style={{ transform: "translate(-50%, 50%)" }}
                />
              </Link> */}
            </div>
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
                        <p>{item.name}</p>
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
                                <p>{dropdownItem.name}</p>
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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
