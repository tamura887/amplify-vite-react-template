import React, { createContext, useState, ReactNode, useContext } from "react";

// すべてのプロパティをオプショナルにする型を定義
type EntryData = {
  [key: string]: any;
};

interface EntryDataContextProps {
  entryData: EntryData | null;
  setEntryData: (data: EntryData) => void;
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
  const [entryData, setEntryData] = useState<EntryData | null>(null);

  return (
    <EntryDataContext.Provider value={{ entryData, setEntryData }}>
      {children}
    </EntryDataContext.Provider>
  );
};