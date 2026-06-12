import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CardapioScreen from "./screens/CardapioScreen";
import PedidosScreen from "./screens/PedidosScreen";
import { Image } from "react-native";


const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        
        <Tab.Screen name="Cardápio"
        component={CardapioScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/cardapio.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}/>
        <Tab.Screen name="Pedidos" 
        component={PedidosScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/pedidos.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
