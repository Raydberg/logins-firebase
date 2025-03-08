import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { auth } from '@/firebaseConfig'

WebBrowser.maybeCompleteAuthSession()

export function useGoogleAuth() {
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_TOKEN_IOS,
        androidClientId: process.env.EXPO_PUBLIC_TOKEN_ANDROID
    })

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
        }
    }, [response])

    const getLocalUser = async () => {
        try {
            setIsLoading(true)
            const userJSON = await AsyncStorage.getItem("@user")
            const userData = userJSON ? JSON.parse(userJSON) : null
            setUserInfo(userData)
        } catch (error) {
            console.error(error, "Error al traer el local storage")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getLocalUser()
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await AsyncStorage.setItem("@user", JSON.stringify(user))
                setUserInfo(user)
            } else {
                console.log("Usuario no autenticado")
            }
        })
        
        return () => unsubscribe()
    }, [])

    return {
        userInfo,
        isLoading,
        request,
        response,
        promptAsync
    }
}