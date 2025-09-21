/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";

/**
 * Type definition for the global context state.
 */
export type GlobalContextType = {
  currentModule: string;
  setCurrentModule: Dispatch<SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

/**
 * Global context provider component.
 */
export const GlobalProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [currentModule, setCurrentModule] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ currentModule, setCurrentModule }}>
      {children}
    </GlobalContext.Provider>
  );
};

/**
 * Custom hook to use the global context.
 */
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
