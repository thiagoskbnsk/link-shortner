
import {  Routes, Route,  } from "react-router";
import { Home } from "./pages/Home";
import { Redirect } from "./pages/Redirect";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":linkId" element={<Redirect />} />
      <Route path="not-found" element={<NotFound />} />
    </Routes>
  )
}

export default App
