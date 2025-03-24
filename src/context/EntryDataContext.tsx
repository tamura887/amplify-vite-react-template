import React, { createContext, useState, ReactNode, useContext } from "react";
import type { Schema } from "../../amplify/data/resource";

interface EntryDataContextProps {
  entryData: Schema["Entrydata"]["type"] | null;
  setEntryData: (data: Schema["Entrydata"]["type"]) => void;
}

export const EntryDataContext = createContext<EntryDataContextProps | undefined>(undefined);

export const useEntryDataContext = () => {
  const context = useContext(EntryDataContext);
  if (!context) {
    throw new Error("useEntryDataContext must be used within an EntryDataProvider");
  }
  return context;
};

export const EntryDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entryData, setEntryData] = useState<Schema["Entrydata"]["type"] | null>(null);

  return (
    <EntryDataContext.Provider value={{ entryData, setEntryData }}>
      {children}
    </EntryDataContext.Provider>
  );
};