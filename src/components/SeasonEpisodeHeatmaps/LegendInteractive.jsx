const LegendInteractive = ({ obj, onLegendClick }) => {
  return (
    <div className="mt-2">
      {obj.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={item.color}
          onClick={() => onLegendClick(item.name)}
          className="group cursor-pointer"
        >
          <span
            className={
              "mr-1 inline-block h-3 w-3 rounded-xl group-hover:ring-2 "
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
