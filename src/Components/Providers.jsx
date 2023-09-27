import { FavouriteProvider } from "../context/FavouritesContext";
import { PaginationProvider } from "../context/PaginationContext";
import { QueryProvider } from "../context/QueryContext";
import { SearchProvider } from "../context/SearchContext";

function Providers({ children }) {
  return (
    <QueryProvider>
      <PaginationProvider>
        <SearchProvider>
          <FavouriteProvider>{children}</FavouriteProvider>
        </SearchProvider>
      </PaginationProvider>
    </QueryProvider>
  );
}

export default Providers;
