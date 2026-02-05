import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { register, login, verifyToken } from "../services/AuthService";
import Cookies from "../../node_modules/@types/js-cookie";

interface User {
  id?: string;
  username?: string;
  email: string;
  password: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: string[];
  signup: (user: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
  signin: (user: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => {
    try {
      const res = await register(userData);
      if (res && res.data) {
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      console.log(error.response?.data);
      setErrors(error.response?.data || ["Error desconocido"]);
    }
  };

  const signin = async (userData: { email: string; password: string }) => {
    try {
      const res = await login(userData);
      if (res && res.data) {
        console.log(res.data);
        setIsAuthenticated(true);
        console.log(res);
      }
    } catch (error: any) {
      setErrors(
        Array.isArray(error.response?.data)
          ? error.response.data
          : [error.response?.data || "Error desconocido"]
      );
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }
      try {
        const res = await verifyToken();
        if (!res || !res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, errors, signup, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
