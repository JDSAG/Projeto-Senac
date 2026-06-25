import React, { useEffect, useState } from "react";
import {Text,StyleSheet,View,FlatList,Alert,ActivityIndicator,} from "react-native";
import MesaCard from "../components/mesasCards";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function MesasScreen() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    buscarMesas();
    const intervalo = setInterval(() => {
      buscarMesas();
    }, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const buscarMesas = async () => {
    try {
      const response = await fetch(`${apiURL}/mesa`);
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setMesas(data);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar as mesas."
      );
    }finally {
      setLoading(false);
    }};

  const abrirMesa = (mesa) => {
    Alert.alert(
      `Mesa ${mesa.numero}`,
      `Status: ${mesa.status}`
    );
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
    />
);}
return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Controle de Mesas
      </Text>
      <FlatList
        data={mesas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MesaCard
            mesa={item}
            onPress={abrirMesa}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f0f0f0",
},
titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
},
});