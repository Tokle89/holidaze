const TruncateString = ({ title, length }) => {
  const maxLength = length || 17;
  let truncatedTitle = title;

  title.length < maxLength ? (truncatedTitle = title) : (truncatedTitle = title.substring(0, maxLength) + "...");

  return <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-100 h-[21px]">{truncatedTitle}</span>;
};

export default TruncateString;
