
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { User } from "../types";
import { toast } from "../components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  registeredUsers: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  registerUser: (user: User) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedUsers = localStorage.getItem('registeredUsers');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = registeredUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast({
        title: "Login successful!",
        description: "Welcome back to GameShop.",
      });
      return true;
    }

    toast({
      title: "Login failed",
      description: "Invalid email or password.",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const registerUser = (newUser: User) => {
    if (registeredUsers.some(u => u.email === newUser.email)) {
      toast({
        title: "Registration failed",
        description: "Email already registered!",
        variant: "destructive",
      });
      return false;
    }

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Registration successful!",
      description: "Please login to access your account.",
    });
    return true;
  };

  const value = {
    user,
    registeredUsers,
    login,
    logout,
    registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
