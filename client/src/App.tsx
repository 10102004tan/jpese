import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import StudyPlanPage from "./pages/study-plan";
import LuyenTapPage from "./pages/luyen-tap";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<StudyPlanPage />} path="/study-plan" />
      <Route element={<LuyenTapPage />} path="/luyen-tap/:slug" />
    </Routes>
  );
}

export default App;
