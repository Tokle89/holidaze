import { Circles } from "react-loader-spinner";

/**
 * A loader component that displays a loading animation while the content is loading. It uses the Circles component from the react-loader-spinner library.
 * @returns {JSX.Element}
 * @example
 * <Loader />
 */

const Loader = () => (
  <div className="mx-auto w-[80px] mt-10">
    <Circles height="80" width="80" color="#1378D1" ariaLabel="circles-loading" wrapperStyle={{}} visible={true} />;
  </div>
);

export default Loader;
