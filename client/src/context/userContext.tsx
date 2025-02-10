import { createContext, useState, ReactNode } from "react";

type User = {
  id: string;
  token: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;  // Add logout function
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    return storedUserId && storedToken ? { id: storedUserId, token: storedToken } : null;
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext,UserProvider}