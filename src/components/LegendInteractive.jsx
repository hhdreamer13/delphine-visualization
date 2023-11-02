const originalTechniques = [
  { name: "Traditionnelle", color: "#1b0c41" },
  { name: "Numérique", color: "#721a6e" },
  { name: "Papiers découpés", color: "#c63d4d" },
  { name: "Volume", color: "#f8890c" },
  { name: "Variée", color: "#f1ef75" },
];

const LegendInteractive = ({ obj, objLabel, onLegendClick, selected }) => {
  return (
    <div className="mt-2 space-y-[1px]">
      {obj.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={item.color}
          onClick={() => {
            objLabel === "techniques"
              ? onLegendClick(
                  originalTechniques.find(
                    (originalTechnique) =>
                      item.color === originalTechnique.color
                  ).name
                )
              : onLegendClick(item.name);
          }}
          className="group cursor-pointer font-body drop-shadow-md"
        >
          <span
            className={
              "mr-2 inline-block h-3 w-3 rounded-xl group-hover:ring-2" +
              (selected === item.name ? " ring-2 ring-sky-600" : "")
            }
            style={{
              backgroundColor: item.color,
            }}
          ></span>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default LegendInteractive;
