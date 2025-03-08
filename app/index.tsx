import React from 'react';
import { Redirect } from 'expo-router';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAuth } from '@/context/auth-provider';

const Index = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return user ? <Redirect href="/(app)" /> : <Redirect href="/(auth)" />;
};

export default Index;