const Legend = ({ obj }) => {
  return (
    <div className="mt-2">
      {obj.map((item) => (
        <div key={item.name}>
          <span
            className={"mr-1 inline-block h-3 w-3 rounded-xl"}
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

export default Legend;
