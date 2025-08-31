import { createContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("session-token");
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("session-token", token);
    else localStorage.removeItem("session-token");
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
