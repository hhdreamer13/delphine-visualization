const Legend = ({ obj }) => {
  return (
    <div className="mt-4 space-y-[1px]">
      {obj.map((item) => (
        <div key={item.name} className="font-body drop-shadow-md">
          <span
            className={"mr-2 inline-block h-3 w-3 rounded-xl"}
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
