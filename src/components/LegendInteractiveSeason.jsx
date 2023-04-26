const LegendInteractive = ({ obj, onLegendClick, selectedSeason }) => {
  return (
    <div className="mt-4 space-y-2">
      {obj.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={item.color}
          onClick={() => onLegendClick(item.name)}
          className="group cursor-pointer font-body drop-shadow-md"
        >
          <span
            className={
              "mr-2 inline-block h-3 w-3 rounded-xl group-hover:ring-2 group-hover:ring-rose-300" +
              (selectedSeason === item.number ? " ring-2 ring-rose-400" : "")
            }
            style={{
              // backgroundColor: item.color,
              backgroundColor: "#ccc",
            }}
          ></span>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default LegendInteractive;
