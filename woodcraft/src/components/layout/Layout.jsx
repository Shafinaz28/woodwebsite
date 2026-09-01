import { Outlet } from "react-router";

import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppButton from "./WhatsAppButton";
import PageReveal from "./PageReveal";

function Layout() {
  return (
    <>
      <ScrollToTop />

      <AnnouncementBar />

      <Navbar />

      <main>
        <PageReveal>
          <Outlet />
        </PageReveal>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Layout;
