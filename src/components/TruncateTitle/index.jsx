/**
 *  TruncateString component is used to truncate the string based on if the string is longer than the length provided
 * @param {String} title The title of the string
 * @param {Number} length The length of the string
 * @returns  {JSX.Element}
 * @example
 * <TruncateString title="This is a long title" length={17} />
 */

const TruncateString = ({ title, length }) => {
  const maxLength = length || 17;
  let truncatedTitle = title;

  title.length < maxLength ? (truncatedTitle = title) : (truncatedTitle = title.substring(0, maxLength) + "...");

  return <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-100 h-[21px]">{truncatedTitle}</span>;
};

export default TruncateString;
