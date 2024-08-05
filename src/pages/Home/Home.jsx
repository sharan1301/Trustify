import Hero from "./components/Hero";
import Features from "./components/Features";
import Login from "./components/Login";

const Home = () => {
  return (
    <div className="pt-16 md:pt-24 pb-10">
      <Hero />
      <Features />
      <Login />
    </div>
  );
};

export default Home;
