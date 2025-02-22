import { createContext, useState, ReactNode } from "react";

type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
} | null;

type User = {
  id: string;
  details: UserDetails;
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
    const storedUserId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem('token');
    return storedUser && storedUserId && storedToken ? {id: storedUserId, details: JSON.parse(storedUser), token:storedToken } : null;
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext,UserProvider}