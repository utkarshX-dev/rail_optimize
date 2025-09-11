import { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("session-token");
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("session-token", token);
    } else {
      localStorage.removeItem("session-token");
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;