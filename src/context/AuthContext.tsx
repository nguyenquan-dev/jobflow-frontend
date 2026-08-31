import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getToken, removeToken, saveToken } from "../utils/auth";
import { getCurrentUser } from "../services/authService";
import type   { User } from "../types/auth";

interface AuthContextType{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps{
  children: ReactNode;
}

export function AuthProvider({children}:AuthProviderProps){
  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function restoreSession() {

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {

        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      } catch {

        removeToken();
        setToken(null);
        setUser(null);

      } finally {

        setIsLoading(false);
      }
    }

    restoreSession();

  } , [token]);

  function login(newToken: string, newUser: User){
    saveToken(newToken);
    setToken(newToken);
    setUser(newUser);
  }

  function logout(){
    removeToken();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  
  const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}