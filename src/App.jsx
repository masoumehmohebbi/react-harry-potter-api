import { Route, Routes } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import Providers from "./Components/Providers";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="character/:id" element={<CharacterDetails />} />
      </Routes>
    </Providers>
  );
}

export default App;
