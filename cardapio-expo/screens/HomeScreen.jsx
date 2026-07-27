import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MesasScreen from "../screens/MesasScreen";
import CardapioScreen from "../screens/CardapioScreen";
import PedidosScreen from "../screens/PedidosScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#001eff",
        tabBarInactiveTintColor: "#888",
      }}>
      <Tab.Screen
        name="Mesas"
        component={MesasScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../assets/mesa.png")}
              style={{width: size, height: size, tintColor: color,}}/>
          ),}}/>
      <Tab.Screen
        name="Cardápio"
        component={CardapioScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../assets/cardapio.png")}
              style={{width: size, height: size, tintColor: color,}}/>
          ),}}/>
          <Tab.Screen
        name="Pedidos"
        component={PedidosScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../assets/pedidos.png")}
              style={{width: size, height: size, tintColor: color,}}/>
          ),}}/>
    </Tab.Navigator>
  );
}