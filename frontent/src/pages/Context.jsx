import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [emergency, setEmergency] = useState(
    localStorage.getItem("emergency") === "true"
  );
  const [Product, setProduct] = useState([]);

  const triggerRefresh = () => {
    setRefreshFlag(prev => prev + 1);
  };

  const handleEmerge = () => {
    setEmergency((e) => {
      localStorage.setItem("emergency", !e);
      return !e;
    });
  };

  // 🔄 Listen to emergency changes from *other* tabs
  useEffect(() => {
    const syncEmergency = (e) => {
      if (e.key === "emergency") {
        setEmergency(e.newValue === "true");
      }
    };
    window.addEventListener("storage", syncEmergency);
    return () => window.removeEventListener("storage", syncEmergency);
  }, []);

  return (
    <DataContext.Provider value={{ refreshFlag, triggerRefresh, emergency, handleEmerge, Product, handleProduct: setProduct }}>
      {children}
    </DataContext.Provider>
  );
};

