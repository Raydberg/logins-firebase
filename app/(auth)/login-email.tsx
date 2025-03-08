import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { useEmailAuth } from '@/hooks/useEmailAuth'

const LoginEmailScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { handleSignIn } = useEmailAuth({
        email: email,
        password: password
    })



    return (
        <View className=' mt-12 p-5'>
            <View className='flex flex-row justify-between'>
                <Text>LoginEmailScreen</Text>
                <Pressable
                    onPress={() => router.back()}
                    className='overflow-hidden rounded-2xl '
                >
                    <View className="bg-blue-500 py-4 px-5 flex-row items-center justify-center">
                        <Feather name='mail' size={22} color="white" />
                        <Text className="font-bold text-sm ml-4 text-white">
                            Atras
                        </Text>
                    </View>
                </Pressable>
            </View>

            <View className='mb-5'>
                <Text> E-Mail</Text>
                <TextInput placeholder='Ingresa tu email' onChangeText={(email) => setEmail(email)} />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput placeholder='Ingresa tu contraseña' onChangeText={(password) => setPassword(password)} />
            </View>
            <Pressable
                onPress={handleSignIn}
                className='overflow-hidden rounded-2xl '
            >
                <View className="bg-blue-500 py-4 px-5 flex-row items-center justify-center">
                    <Text className="font-bold text-sm ml-4 text-white">
                        Sign In
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

export default LoginEmailScreen