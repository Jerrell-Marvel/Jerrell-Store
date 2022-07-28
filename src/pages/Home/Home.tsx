import HomeBanner from "../../components/HomeBanner/HomeBanner";
import HeroCarousel from "../../components/Carousel/HeroCarousel/HeroCarousel";
import Service from "../../components/Service/Service";
import ProductsCarousel from "../../components/Carousel/ProductsCarousel/ProductsCarousel";

function Home() {
  return (
    <div id="home" className="pt-20">
      <HeroCarousel />
      <Service />
      {/* <div className="w-full h-[75vh] md:h-[100vh] bg-center bg-[url('https://source.unsplash.com/random/1100x1600')] bg-cover lg:bg-[url('https://source.unsplash.com/random/1600x1101')]"></div> */}

      <HomeBanner src="https://source.unsplash.com/random/1600x1099">Latest Drop</HomeBanner>
      <ProductsCarousel url="http://localhost:5000/api/v1/products" />

      <HomeBanner src="https://source.unsplash.com/random/1600x1101">Popular Items</HomeBanner>
      <ProductsCarousel url="http://localhost:5000/api/v1/products" />

      <HomeBanner src="https://source.unsplash.com/random/1600x1102">Discount Items</HomeBanner>
      <ProductsCarousel url="http://localhost:5000/api/v1/products" />

      <HomeBanner src="https://source.unsplash.com/random/1600x1098"></HomeBanner>
    </div>
  );
}

export default Home;
