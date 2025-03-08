import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { useColorScheme } from '@/hooks/useColorScheme'

const SignInScreen = () => {
    const { userInfo, isLoading, promptAsync } = useGoogleAuth()
    const colorScheme = useColorScheme()
    const router = useRouter()
    const isDark = colorScheme === 'dark'

    const [pressedButton, setPressedButton] = useState(null)

    const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-100'
    const textColor = isDark ? 'text-white' : 'text-gray-800'
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white'
    const dividerColor = isDark ? 'bg-gray-700' : 'bg-gray-200'

    React.useEffect(() => {
        if (userInfo) {
            router.replace('/(app)')
        }
    }, [userInfo, router])

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text>Cargando...</Text>
            </SafeAreaView>
        )
    }

    const handleLogin = (method) => {
        console.log(`Iniciando sesión con ${method}`)
        if (method === 'google') {
            promptAsync()
        }
    }

    const handlePressIn = (button) => {
        setPressedButton(button)
    }

    const handlePressOut = () => {
        setPressedButton(null)
    }

    return (
        <SafeAreaView className={`flex-1 justify-center items-center px-6 ${bgColor}`}>
            <View className="items-center mb-10">
                <Ionicons name='logo-firebase' size={90} color="#FFA611" />
                <Text className={`text-3xl font-bold mt-6 ${textColor}`}>Welcome Back</Text>
                <Text className={`text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Choose your preferred sign-in method
                </Text>
            </View>

            <View className={`w-full max-w-sm ${cardBg} rounded-3xl p-8 shadow-xl`}>
                <Pressable
                    onPress={() => handleLogin('google')}
                    onPressIn={() => handlePressIn('google')}
                    onPressOut={handlePressOut}
                    className={`mb-5 overflow-hidden rounded-2xl ${pressedButton === 'google' ? 'opacity-80 scale-95' : ''}`}
                >
                    <View className="bg-black py-4 px-5 flex-row items-center justify-center">
                        <AntDesign name='google' size={22} color="white" />
                        <Text className="font-bold text-base ml-4 text-white">
                            Continue with Google
                        </Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => handleLogin('github')}
                    onPressIn={() => handlePressIn('github')}
                    onPressOut={handlePressOut}
                    className={`mb-5 overflow-hidden rounded-2xl ${pressedButton === 'github' ? 'opacity-80 scale-95' : ''}`}
                >
                    <View className="bg-black py-4 px-5 flex-row items-center justify-center">
                        <AntDesign name='github' size={22} color="white" />
                        <Text className="font-bold text-base ml-4 text-white">
                            Continue with GitHub
                        </Text>
                    </View>
                </Pressable>

                <View className="flex-row items-center my-5">
                    <View className={`flex-1 h-0.5 ${dividerColor}`}></View>
                    <Text className={`mx-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        or
                    </Text>
                    <View className={`flex-1 h-0.5 ${dividerColor}`}></View>
                </View>

                <Pressable
                    onPress={() => handleLogin('email')}
                    onPressIn={() => handlePressIn('email')}
                    onPressOut={handlePressOut}
                    className={`overflow-hidden rounded-2xl ${pressedButton === 'email' ? 'opacity-80 scale-95' : ''}`}
                >
                    <View className="bg-blue-500 py-4 px-5 flex-row items-center justify-center">
                        <Feather name='mail' size={22} color="white" />
                        <Text className="font-bold text-base ml-4 text-white">
                            Continue with Email
                        </Text>
                    </View>
                </Pressable>
            </View>

            <View className="mt-10">
                <Text className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Don't have an account?{' '}
                    <Text 
                        className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                        onPress={() => router.push('/(auth)/register')}
                    >
                        Sign up
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen