const LegendInteractive = ({ obj, onLegendClick, selected }) => {
  return (
    <div className="mt-2 space-y-[1px]">
      {obj.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={item.color}
          onClick={() => onLegendClick(item.name)}
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
