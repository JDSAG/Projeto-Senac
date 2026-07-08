import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import ScannerScreen from "../screens/ScannerScreen";
import CardapioScreen from "../screens/CardapioScreen";
import PedidoScreen from "../screens/PedidosScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
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