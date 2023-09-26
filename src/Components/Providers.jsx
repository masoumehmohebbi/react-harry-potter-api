import { AddedFavProvider } from "../context/AddedFavContext";
import { FavouriteProvider } from "../context/FavouritesContext";
import { PaginationProvider } from "../context/PaginationContext";
import { QueryProvider } from "../context/QueryContext";
import { SearchProvider } from "../context/SearchContext";

function Providers({ children }) {
  return (
    <QueryProvider>
      <PaginationProvider>
        <SearchProvider>
          <AddedFavProvider>
            <FavouriteProvider>{children}</FavouriteProvider>
          </AddedFavProvider>
        </SearchProvider>
      </PaginationProvider>
    </QueryProvider>
  );
}

export default Providers;
