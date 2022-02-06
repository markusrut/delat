import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation/_Navigation";
import { AuthProvider } from "./src/providers/AuthProvider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ApolloProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
