import useFetch from "../../hooks/useFetch";
import CardLink from "../Card";
import CustomButton from "../Button";

const VenueSection = ({ url }) => {
  const { data, isLoading, isError } = useFetch(url);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (data.data) {
    let venues = data.data;
    content = venues.filter(({ name }) => !name.toLowerCase().includes("test")).map((venue) => <CardLink key={venue.id} data={venue} />);
  } else {
    content = <p>{isError ? "An error has occurred" : "No data"}</p>;
  }

  return (
    <section className=" px-2.5 max-w-7xl mx-auto my-12 ">
      <h2 className=" mb-5 text-primary font-mono ">Popular venues</h2>
      <div className="flex  mb-5">
        <CustomButton size="sm" className=" rounded-full">
          Latest
        </CustomButton>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 "> {content}</div>
    </section>
  );
};

export default VenueSection;
