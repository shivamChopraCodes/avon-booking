import { createContext, useContext, useState } from 'react';

// const TravellersContext = createContext()
//  export default TravellersContext

const TravellersContext = createContext();

export function TravellersContextProvider({ children }) {
  const [travellersData, setTravellersData] = useState({
    travellers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    type: 'economy',
  });

  return (
    <TravellersContext.Provider value={[travellersData, setTravellersData]}>{children}</TravellersContext.Provider>
  );
}

export function useTravellersContext() {
  return useContext(TravellersContext);
}
