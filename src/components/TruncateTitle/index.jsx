const TruncateTitle = ({ title }) => {
  const words = title.split(" ");
  const truncatedTitle = words.slice(0, 2).join(" ");

  return <span className="block  whitespace-nowrap overflow-ellipsis"> {truncatedTitle}</span>;
};
export default TruncateTitle;
