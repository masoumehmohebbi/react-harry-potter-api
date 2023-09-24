import { createContext, useContext, useState } from "react";

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);

  if (context === undefined) {
    throw new Error("QueryContext was used outSide of the QueryProvider.");
  }
  return context;
}
