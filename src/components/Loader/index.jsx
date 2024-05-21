import { Circles } from "react-loader-spinner";

const Loader = () => (
  <div className="mx-auto w-[80px] mt-10">
    <Circles height="80" width="80" color="#1378D1" ariaLabel="circles-loading" wrapperStyle={{}} visible={true} />;
  </div>
);

export default Loader;
