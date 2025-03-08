import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const ButtonSignOut = ({ style, textStyle }) => {
    const router = useRouter()
    
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            await AsyncStorage.removeItem("@user")
            router.replace('/(auth)')
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
        }
    }
    
    return (
        <Pressable
            onPress={handleSignOut}
            style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed,
                style
            ]}
        >
            <Text style={[styles.text, textStyle]}>Sign Out</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#f44336',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default ButtonSignOut