export const getColor = (tag: string) => {
  if (tag === "friend") return "lightgreen";
  if (tag === "family") return "orange";
  if (tag === "work") return "blue";
  if (tag === "network") return "red";
  else return "black";
};

const TagSelectedBox = ({ tag }: { tag: string }) => {
  return (
    <div
      className="my-1 rounded border px-2 text-left text-xs"
      style={{ borderColor: getColor(tag) }}
    >
      <p>{tag}</p>
    </div>
  );
};

export default TagSelectedBox;
