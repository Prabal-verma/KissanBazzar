"use client"
import { createContext, useState, useContext } from 'react';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [contractData, setContractData] = useState(null);

  const setContract = (farmer) => {
    setContractData(farmer);
  };

  const clearContract = () => {
    setContractData(null);
  };

  return (
    <ContractContext.Provider value={{ contractData, setContract, clearContract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
