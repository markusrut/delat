import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation/_Navigation";
import { AuthProvider } from "./src/providers/AuthProvider";
import { ApolloProvider } from "./src/providers/ApolloProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ApolloProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ApolloProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
