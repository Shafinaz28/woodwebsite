import { Outlet } from "react-router";

import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppButton from "./WhatsAppButton";

function Layout() {
  return (
    <>
      <ScrollToTop />

      <AnnouncementBar />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Layout;
