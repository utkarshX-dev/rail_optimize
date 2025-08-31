import { createContext } from "react";
import { useState } from "react";

type User = {
    name: string;
    email: string;
    age: number | null;
};

const userContext = createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
} | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        age: null
    });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;