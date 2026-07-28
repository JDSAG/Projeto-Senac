import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PedidosScreen from "../screens/PedidosScreen";

const Tab = createBottomTabNavigator();

export default function CozinhaNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#001eff",
        tabBarInactiveTintColor: "#888",
      }}>
      <Tab.Screen
        name="Pedidos"
        component={PedidosScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../assets/pedidos.png")}
              style={{ width: size, height: size, tintColor: color,}}/>
              ),
              }}/>
    </Tab.Navigator>
  );
}