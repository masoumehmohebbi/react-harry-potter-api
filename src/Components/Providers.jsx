import { FavouriteProvider } from "../context/FavouritesContext";
import { QueryProvider } from "../context/QueryContext";

function Providers({ children }) {
  return (
    <FavouriteProvider>
      <QueryProvider>{children}</QueryProvider>
    </FavouriteProvider>
  );
}

export default Providers;
