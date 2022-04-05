import React, { createContext, useState } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [info, setInfo] = useState({ title: "Rise Technology", count: 0 });
  return (
    <HeaderContext.Provider value={{ info, setInfo }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;
