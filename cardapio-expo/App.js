import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CardapioScreen from "./screens/CardapioScreen";
import PedidosScreen from "./screens/PedidosScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Cardápio" component={CardapioScreen} />
        <Tab.Screen name="Pedidos" component={PedidosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
