import Hero from "../components/home/Hero";
import ValueBar from "../components/home/ValueBar";
import RoomCategories from "../components/home/RoomCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanners from "../components/home/PromoBanners";
import NewArrivals from "../components/home/NewArrivals";
import LifestyleBanner from "../components/home/LifestyleBanner";
// import InspirationRow from "../components/home/InspirationRow";
import Craftsmanship from "../components/home/Craftsmanship";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import BlogSection from "../components/home/BlogSection";
import Benefits from "../components/home/Benefits";

function Home() {
  return (
    <>
      <Hero />
      <ValueBar />
      <RoomCategories />
      <FeaturedProducts />
      <PromoBanners />
      <NewArrivals />
      <LifestyleBanner />
      <div className="h-16 bg-[#f4f0e8] sm:h-24 md:h-32" aria-hidden />
      <Craftsmanship />
      <WhyChooseUs />
      <Testimonials />
      <BlogSection />
      <Benefits />
    </>
  );
}

export default Home;
