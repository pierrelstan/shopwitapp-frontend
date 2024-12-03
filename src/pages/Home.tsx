import React from "react";
// import MenuNavigation from "../components/MenuNavigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Hero from "../components/Hero";
// import PopularProducts from "../components/PopularProducts";
// import MostRated from "../components/MostRated";
// import NewArrivals from "../components/NewArrivals";
// import Services from "../components/Services";
// import NewsLetters from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Container maxWidth="xl">
        <Hero />
        {/* <MenuNavigation /> */}
        {/* <PopularProducts /> */}
      </Container>
      {/* <NewsLetters />
      <Container maxWidth='xl'>
        <MostRated />
      </Container>
      <Services />
      <NewArrivals /> */}
    </div>
  );
};

export default Home;
