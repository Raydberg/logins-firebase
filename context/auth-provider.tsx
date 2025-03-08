import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig';
import { router, useRootNavigationState, useSegments } from 'expo-router';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('@user');
        if (userJSON) {
          const userData = JSON.parse(userJSON);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user from AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          await AsyncStorage.setItem('@user', JSON.stringify(authUser));
          setUser(authUser);
        } catch (error) {
          console.error('Error saving user to AsyncStorage', error);
        }
      } else {
        try {
          await AsyncStorage.removeItem('@user');
          setUser(null);
        } catch (error) {
          console.error('Error removing user from AsyncStorage', error);
        }
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!navigationState?.key || isLoading) {
      console.log("Esperando a que la navegación esté lista o cargando...");
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';
    console.log("Estado de autenticación:", { 
      user: !!user, 
      inAuthGroup, 
      segment: segments[0] 
    });

    if (!user && !inAuthGroup) {
      console.log("Redirigiendo a autenticación");
      router.replace('/(auth)');
    } else if (user && inAuthGroup) {
      console.log("Redirigiendo a la app");
      router.replace('/(app)');
    }
  }, [user, segments, navigationState?.key, isLoading]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);