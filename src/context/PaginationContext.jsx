import { createContext, useContext, useState } from "react";
import { useQuery } from "./QueryContext";
import useFetch from "../hooks/useFetch";

const PaginationContext = createContext();

export function PaginationProvider({ children }) {
  const { query } = useQuery();
  const { allData } = useFetch(query);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allData.slice(firstIndex, lastIndex);

  const npage = Math.ceil(allData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <PaginationContext.Provider
      value={{
        records,
        currentPage,
        setCurrentPage,
        npage,
        numbers,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);

  if (context === undefined) {
    throw new Error(
      "PaginationContext was used outSide of the PaginationProvider."
    );
  }
  return context;
}
