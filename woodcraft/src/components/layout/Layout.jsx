import { Outlet } from "react-router";

import AnnouncementBar from "./AnnouncementBar";
import FestivalOfferBar from "./FestivalOfferBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppButton from "./WhatsAppButton";
import PageReveal from "./PageReveal";

function Layout() {
  return (
    <div data-site-gsap>
      <ScrollToTop />

      <AnnouncementBar />
      <FestivalOfferBar />

      <Navbar />

      <main>
        <PageReveal>
          <Outlet />
        </PageReveal>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default Layout;
