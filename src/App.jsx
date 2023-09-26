import { Route, Routes } from "react-router-dom";
// import Layout from "./Components/Layout";
import CharacterList from "./pages/CharacterList";
import { QueryProvider } from "./context/QueryContext";
import CharacterDetails from "./pages/CharacterDetails";
import { useState } from "react";

function App() {
  const [Favourites, setFavourites] = useState([]);
  console.log(Favourites);
  return (
    <QueryProvider>
      <Routes>
        <Route
          path="/"
          element={
            <CharacterList
              Favourites={Favourites}
              setFavourites={setFavourites}
            />
          }
        />
        <Route
          path="character/:id"
          element={
            <CharacterDetails
              Favourites={Favourites}
              setFavourites={setFavourites}
            />
          }
        />
      </Routes>
    </QueryProvider>
  );
}

export default App;
