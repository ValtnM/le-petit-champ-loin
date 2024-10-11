'use client';
import { useState, createContext } from "react";

export const StateContext = createContext();

const ContextProvider = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <StateContext.Provider value={{ isConnected, setIsConnected }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default ContextProvider;