import { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export function FiltersContextProvider({ children }) {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departDate: '',
    details: {
      travellers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      type: 'Economy Class',
    },
    data: {},
  });

  return <FiltersContext.Provider value={[filters, setFilters]}>{children}</FiltersContext.Provider>;
}

export function useFiltersContext() {
  return useContext(FiltersContext);
}
