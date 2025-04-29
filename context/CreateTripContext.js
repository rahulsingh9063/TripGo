import React, { createContext, useState } from 'react';

export const CreateTripContext = createContext();

export const CreateTripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    locationInfo: null,
    startDate: null,
    endDate: null,
    totalDays: 0,
    traveler: null,
    budget: null,
  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </CreateTripContext.Provider>
  );
};
