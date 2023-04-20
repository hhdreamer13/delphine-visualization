import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="relative mx-auto mt-20 flex w-fit flex-col items-center justify-center p-2 text-lg">
      <h3 className="text-2xl">Delphine Visualisation</h3>
      <Link to="/services">
        <button className="btn mt-20 w-52 tracking-widest shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] hover:text-slate-200 hover:shadow-none">
          Démarrer
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
