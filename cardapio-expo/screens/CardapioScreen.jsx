import { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,ActivityIndicator} from "react-native";
import { ReceiptCards } from "../components/adminCards";
import DisponivelBtn from "../components/disponivelBtn";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function CardapioScreen() {
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disponivel, setDisponivel] = useState({});

  const carregarCardapio = () => {
    fetch(`${apiURL}/cardapio`)
      .then((res) => res.json())
      .then((data) => {
        setCardapio(data);

        const estados = Object.fromEntries(
          data.map((item) => [item.id, item.ativo])
        );

        setDisponivel(estados);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarCardapio();

    const intervalo = setInterval(() => {
      carregarCardapio();
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  function toggleDisponivel(id) {
    setDisponivel((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text>Carregando cardápio...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🍔 Gerenciamento do Cardápio</Text>

      <FlatList
        data={cardapio}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum item cadastrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View
              style={{
                opacity: disponivel[item.id] ? 1 : 0.45,
              }}
            >
              <ReceiptCards item={item} />
            </View>

            <View style={styles.btnArea}>
              <DisponivelBtn
                itemId={item.id}
                ativo={disponivel[item.id]}
                onToggle={() => toggleDisponivel(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
    alignSelf: "center",
  },

  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  btnArea: {
    marginTop: 10,
    alignItems: "flex-end",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 18,
  },
});
