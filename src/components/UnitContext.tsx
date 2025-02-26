import React, { createContext, useContext, useState } from "react";

type Unit = "mm" | "in";

interface UnitContextType {
  unit: Unit;
  toggleUnit: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<Unit>("mm");

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "mm" ? "in" : "mm")); // ✅ Properly toggles unit
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = (): UnitContextType => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return context;
};
