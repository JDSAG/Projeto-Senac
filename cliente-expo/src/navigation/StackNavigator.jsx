import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import ScannerScreen from "../screens/ScannerScreen";
import CardapioScreen from "../screens/CardapioScreen";
import PedidoScreen from "../screens/PedidosScreen";
import { obterToken, removerToken } from "../storage/tokenStorage";

const Stack = createNativeStackNavigator();

export default function App() {
  // null = ainda checando, "Cardapio" ou "Scanner" = já sabe pra onde ir
  const [rotaInicial, setRotaInicial] = useState(null);

  useEffect(() => {
    verificarSessao();
  }, []);

  async function verificarSessao() {
  const token = await obterToken();

  if (!token) {
    setRotaInicial("Scanner");
    return;
  }

  try {
    const response = await fetch(`${apiURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    setRotaInicial("Cardapio");
  } catch (err) {
    await removerToken();
    setRotaInicial("Scanner");
  }
}

  if (!rotaInicial) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={rotaInicial}>
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Cardapio"
          component={CardapioScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Pedido"
          component={PedidoScreen}
          options={{ title: "Meu Pedido" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}