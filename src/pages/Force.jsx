import SchoolForce from "../components/SchoolForce/SchoolForce";
import data from "../utils/poanimaDataset.json";

const ForceWrapper = () => {
  return (
    <div>
      <h1>Force Chart</h1>
      <div>
        <SchoolForce data={data} />
      </div>
    </div>
  );
};

export default ForceWrapper;
