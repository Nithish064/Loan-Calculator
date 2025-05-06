import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

type Currency = {
  code: string;
  name: string;
  rate: number;
};

type CurrencyContextType = {
  baseCurrency: string;
  exchangeRates: Record<string, number>;
  currencies: Currency[];
  isLoading: boolean;
  error: string | null;
  setBaseCurrency: (code: string) => void;
  convertAmount: (amount: number, toCurrency: string) => number;
};

const CurrencyContext = createContext<CurrencyContextType>({
  baseCurrency: 'USD',
  exchangeRates: {},
  currencies: [],
  isLoading: false,
  error: null,
  setBaseCurrency: () => {},
  convertAmount: () => 0,
});

export const useCurrency = () => useContext(CurrencyContext);


const API_KEY = 'f4c2770ef0cb2fb44e0f4845';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

type CurrencyProviderProps = {
  children: ReactNode;
};

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRates = async (base: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock data for demonstration as we don't have a real API key
      // In a real application, you would use the actual API call:
      // const response = await axios.get(`${API_URL}${base}`);
      
      // For demo purposes, we'll simulate a response with mock data
      const mockExchangeRates = {
        USD: 1,
        EUR: 0.91,
        GBP: 0.77,
        JPY: 149.75,
        CAD: 1.35,
        AUD: 1.51,
        INR: 83.24,
        CNY: 7.19,
      };
      
      const currencyNames: Record<string, string> = {
        USD: 'US Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
        JPY: 'Japanese Yen',
        CAD: 'Canadian Dollar',
        AUD: 'Australian Dollar',
        INR: 'Indian Rupee',
        CNY: 'Chinese Yuan',
      };
      
      setExchangeRates(mockExchangeRates);
      
      const currencyList = Object.keys(mockExchangeRates).map(code => ({
        code,
        name: currencyNames[code] || code,
        rate: mockExchangeRates[code]
      }));
      
      setCurrencies(currencyList);
      
      // In a real application, you would parse the actual API response:
      // setExchangeRates(response.data.conversion_rates);
      // 
      // const currencyList = Object.keys(response.data.conversion_rates).map(code => ({
      //   code,
      //   name: code, // You might want to have a mapping for full currency names
      //   rate: response.data.conversion_rates[code]
      // }));
      // setCurrencies(currencyList);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates(baseCurrency);
  }, [baseCurrency]);

  const handleSetBaseCurrency = (code: string) => {
    setBaseCurrency(code);
  };

  const convertAmount = (amount: number, toCurrency: string): number => {
    if (!exchangeRates[toCurrency]) return amount;
    return amount * exchangeRates[toCurrency];
  };

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        exchangeRates,
        currencies,
        isLoading,
        error,
        setBaseCurrency: handleSetBaseCurrency,
        convertAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};