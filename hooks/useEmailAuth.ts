import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

interface Props {
    email: string,
    password: string
}

export const useEmailAuth = ({ email, password }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleCreateCount = async () => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado correctamente");
            const user = userCredential.user;
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            console.log(user);
            router.replace('/(app)'); 
        } catch (error: any) {
            console.log(error);
            Alert.alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Sign In");
            const user = userCredential.user;
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            console.log(user);
            router.replace('/(app)'); 
        } catch (error: any) {
            console.log(error);
            Alert.alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleCreateCount,
        handleSignIn,
        isLoading
    };
};