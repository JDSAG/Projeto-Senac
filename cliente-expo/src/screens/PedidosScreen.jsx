import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import PedidoCard from "../components/PedidoCard";

import {
  buscarPedido,
  removerItem,
  finalizarPedido,
} from "../services/pedidoService";

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function PedidoScreen({ navigation }) {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [finalizando, setFinalizando] = useState(false);

  // Evita mostrar o loading de tela cheia toda vez que a tela ganha foco
  // de novo (ex: voltando do Cardápio) -- só na primeira carga.
  const primeiraCarga = useRef(true);

  useFocusEffect(
    useCallback(() => {
      carregarPedido();
    }, [])
  );

  async function carregarPedido() {
    try {
      if (primeiraCarga.current) {
        setLoading(true);
      }

      setErro(false);

      const data = await buscarPedido();

      setPedido(data);
    } catch (error) {
      console.log(error);
      setErro(true);
    } finally {
      setLoading(false);
      primeiraCarga.current = false;
    }
  }

  function confirmarRemocao(item) {
    Alert.alert(
      "Remover item",
      `Remover "${item.nome_produto}" do pedido?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => excluirItem(item.id),
        },
      ]
    );
  }

  async function excluirItem(itemId) {
    try {
      await removerItem(itemId);
      carregarPedido();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível remover o item.");
    }
  }

  function concluirPedido() {
    Alert.alert(
      "Finalizar Pedido",
      "Deseja enviar seu pedido para a cozinha?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Enviar",
          onPress: async () => {
            if (finalizando) return;

            try {
              setFinalizando(true);

              await finalizarPedido();

              Alert.alert("Sucesso", "Pedido enviado!");

              navigation.goBack();
            } catch (error) {
              Alert.alert(
                "Erro",
                error.message || "Não foi possível finalizar o pedido."
              );
            } finally {
              setFinalizando(false);
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          Não foi possível carregar seu pedido.
        </Text>

        <TouchableOpacity style={styles.retryBotao} onPress={carregarPedido}>
          <Text style={styles.retryTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!pedido || pedido.itens.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Nenhum item no pedido.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.lista}
        data={pedido.itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PedidoCard item={item} onRemove={() => confirmarRemocao(item)} />
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValor}>{formatarMoeda(pedido.total)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.botao, finalizando && styles.botaoDesabilitado]}
        onPress={concluirPedido}
        disabled={finalizando}
      >
        {finalizando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 15,
  },

  lista: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginBottom: 15,
  },

  retryBotao: {
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  retryTexto: {
    color: "#FFF",
    fontWeight: "bold",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
  },

  totalText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  totalValor: {
    fontWeight: "bold",
    fontSize: 20,
  },

  botao: {
    marginTop: 15,
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },

  botaoDesabilitado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});