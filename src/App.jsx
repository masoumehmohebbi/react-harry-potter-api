import { Route, Routes } from "react-router-dom";

import Layout from "./Components/Layout";
import CharacterList from "./pages/CharacterList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CharacterList />} />
      </Route>
    </Routes>
  );
}

export default App;
