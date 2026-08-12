import { Outlet } from "react-router";

import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

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
    </>
  );
}

export default Layout;