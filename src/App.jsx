import { Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";
import Valentine from "./pages/Valentine";
import Celebration from "./pages/Celebration";

function App() {
  return (
    <MusicProvider>
      <Routes>
        <Route path="/" element={<Valentine />} />
        <Route path="/yes" element={<Celebration />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;
