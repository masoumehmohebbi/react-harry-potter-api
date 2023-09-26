import { createContext, useContext, useState } from "react";

const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const [Favourites, setFavourites] = useState([]);
  return (
    <FavouriteContext.Provider value={{ Favourites, setFavourites }}>
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourite() {
  const context = useContext(FavouriteContext);

  if (context === undefined) {
    throw new Error("FavouriteContext was used outSide of the QueryProvider.");
  }
  return context;
}
