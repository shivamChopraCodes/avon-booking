import { createContext, useContext, useState } from 'react';

const FligthsContext = createContext();

export function FlightsContextProvider({ children }) {
  const [flightData, setFlightData] = useState(null);

  return <FligthsContext.Provider value={[flightData, setFlightData]}>{children}</FligthsContext.Provider>;
}

export function useFlightsContext() {
  return useContext(FligthsContext);
}
