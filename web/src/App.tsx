import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Branches from "./components/Branches";
import Footer from "./components/Footer";
import Waves from "./components/Waves/Waves";

function App() {
  return (
    <>
      {" "}
      <Hero />
      <About />
      <Services />
      <Waves />
      <Branches />
      <Footer />
    </>
  );
}

export default App;
