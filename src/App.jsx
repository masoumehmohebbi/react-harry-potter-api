import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import CharacterList from "./pages/CharacterList";
import { QueryProvider } from "./context/QueryContext";

function App() {
  return (
    <QueryProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CharacterList />} />
        </Route>
      </Routes>
    </QueryProvider>
  );
}

export default App;
