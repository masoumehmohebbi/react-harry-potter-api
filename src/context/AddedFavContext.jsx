import { createContext, useContext, useState } from "react";

const AddedFavContext = createContext();

export function AddedFavProvider({ children }) {
  const [isAddToFavourite, setIsAddToFavourite] = useState(false);
  return (
    <AddedFavContext.Provider value={{ isAddToFavourite, setIsAddToFavourite }}>
      {children}
    </AddedFavContext.Provider>
  );
}

export function useAddedFav() {
  const context = useContext(AddedFavContext);

  if (context === undefined) {
    throw new Error(
      "AddedFavContext was used outSide of the AddedFavProvider."
    );
  }
  return context;
}
