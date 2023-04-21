import { Link, Outlet } from "react-router-dom";

const navItems = [
  // { name: "Home", to: "/" },
  { name: "Fleure", to: "/fleure" },
  { name: "Galaxie", to: "/galaxie" },
  { name: "Matrice", to: "/matrice" },
  {
    name: "Monde",
    to: "/monde/petit",
    dropdownItems: [
      { name: "Petit", to: "/monde/petit" },
      { name: "Grand", to: "/monde/grand" },
    ],
  },
  {
    name: "Ville",
    to: "/ville/petit",
    dropdownItems: [
      { name: "Petite", to: "/ville/petit" },
      { name: "Grande", to: "/ville/grand" },
    ],
  },
];

const Navbar = () => {
  return (
    <>
      <nav className="bg-base-300 p-4">
        <div className=" mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">
            <Link to="/">
              <h2 className=" uppercase">PoAnimaViz</h2>
            </Link>
          </div>
          <div className="space-x-4 md:flex">
            {navItems.map((item, index) => (
              <div className="group relative" key={index}>
                <Link className="btn-ghost btn mx-2 normal-case" to={item.to}>
                  <p>{item.name}</p>
                </Link>
                {item.dropdownItems && (
                  <div className="absolute left-0 hidden space-y-2 rounded-md bg-base-200 p-2 text-base group-hover:block">
                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        className="block rounded-md px-2 py-1 hover:bg-base-100"
                        to={dropdownItem.to}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
