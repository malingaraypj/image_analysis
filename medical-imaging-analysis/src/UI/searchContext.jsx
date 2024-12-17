import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchQuery: "",
  updateSearchQuery: () => {},
});

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const searchCtx = { searchQuery, updateSearchQuery };

  return (
    <SearchContext.Provider value={searchCtx}>
      {children}
    </SearchContext.Provider>
  );
};
