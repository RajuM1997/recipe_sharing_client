import Banner from "../../components/banner/Banner";
import Counter from "../../components/counter/Counter";
import DevInfo from "../../components/devInfo/DevInfo";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Counter />
      <DevInfo />
    </div>
  );
};

export default Home;
