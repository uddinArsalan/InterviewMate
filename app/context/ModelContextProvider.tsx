"use client"
import React, { useState, createContext } from "react";
interface ContextType {
    showModel : boolean,
    setShowModel : React.Dispatch<React.SetStateAction<boolean>>
}
export const ModelContext = createContext<ContextType | undefined>(undefined);

const ModelContextProvider = ({ children }: React.PropsWithChildren) => {
  const [showModel, setShowModel] = useState(false);
  return (
    <ModelContext.Provider value={{ showModel, setShowModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
