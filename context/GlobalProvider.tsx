import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";


interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (r: boolean) => void;
  user: Models.Document | null;
  setUser: (b: Models.Document | null) => void;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => undefined,
  user: null,
  setUser: () => undefined,
  isLoading: false,
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    }
    run;
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
