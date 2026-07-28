import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema do Restaurante</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Caixa")}
      >
        <Image
          source={require("../assets/caixa.png")} style={styles.icone}/>
        <Text style={styles.textoBotao}>Caixa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Cozinha")}
      >
        <Image
          source={require("../assets/chefe.png")} style={styles.icone}/>
        <Text style={styles.textoBotao}>Cozinha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 60,
  },

  botao: {
    width: "80%",
    height: 160,
    backgroundColor: "#2E7D32",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    elevation: 5,
  },

  icone: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});