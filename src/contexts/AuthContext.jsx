import { createContext, useContext, useState, useEffect } from "react";
import Supabase from "../supabase-client";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Session state (user info, sign-in status)

  const [session, setSession] = useState(null);

  useEffect(() => {
    //1) Check on 1st render for a session (getSession())
    //1) Vérifier la session au premier rendu (getSession())
    const getInitialSession = async () => {
      const { data, error } = await Supabase.auth.getSession();
      try {
        if (error) throw error;
        //success
        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error("Error getting initial session:", error);
      }
    };
    getInitialSession();

    //2) Listen for changes in auth state
    //2) Écouter les changements dans l'état d'authentification
    Supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    });
  }, []);

  //Auth functions (signin, signup, logout)
  //Sign in (success, data, error)

  const signInUser = async (email, password) => {
    //supabase method
    try {
      const { data, error } = await Supabase.auth.signInWithPassword({
        email: email.toLocaleLowerCase(),
        password: password,
      });

      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      //Unexpected error
      console.error("Unexpected error during sign-in:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
