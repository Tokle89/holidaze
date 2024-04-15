import HeroSection from "../../components/HeroSection";
import RegisterOptionSection from "../../components/RegisterOptionSection";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
import CardLink from "../../components/Card";

const Home = () => {
  const { result, isLoading, isError } = useFetch(Urls.venuesUrl);

  let { data } = result;
  console.log(data, isLoading, isError);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Something went wrong</p>;
  } else if (data) {
    content = data.map((venue) => <CardLink data={venue} key={venue.id} />);
  }
  return (
    <main>
      <HeroSection />
      <RegisterOptionSection />
      <section>
        <h2>Popular venues</h2>
        <div> {content}</div>
      </section>
    </main>
  );
};

export default Home;
