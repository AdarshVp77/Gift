import { Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";
import Valentine from "./pages/Valentine";
import Celebration from "./pages/Celebration";

function App() {
  return (
    <MusicProvider>
      <Routes>
        <Route path="/Gift/" element={<Valentine />} />
        <Route path="/Gift/yes" element={<Celebration />} />
        <Route path="/" element={<Valentine />} />
        <Route path="/yes" element={<Celebration />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;
