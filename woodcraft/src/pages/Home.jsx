import Hero from "../components/home/Hero";
import ValueBar from "../components/home/ValueBar";
import RoomCategories from "../components/home/RoomCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanners from "../components/home/PromoBanners";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import BlogSection from "../components/home/BlogSection";

function Home() {
  return (
    <>
      <Hero />
      <ValueBar />
      <RoomCategories />
      <FeaturedProducts />
      <PromoBanners />
      <WhyChooseUs />
      <Testimonials />
      <BlogSection />
    </>
  );
}

export default Home;
