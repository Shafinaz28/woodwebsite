import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {

  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase
        .from("products")
        .select("*");
  
      console.log("DATA:", data);
      console.log("ERROR:", error);
    }
  
    testSupabase();
  }, []);

  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/product/:slug"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>

    </Routes>
  );
}

export default App;