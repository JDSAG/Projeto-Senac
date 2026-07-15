import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function CardapioCard({ item, onAdicionar }) {
  const [quantidade, setQuantidade] = useState(1);

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade((q) => q - 1);
    }
  }

  function aumentar() {
    setQuantidade((q) => q + 1);
  }

  return (
    <View style={styles.card}>
      {item.imagem ? (
        <Image
          source={{ uri: item.imagem }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.semImagem}>
          <Text style={styles.semImagemTexto}>
            Sem imagem
          </Text>
        </View>
      )}

      <Text style={styles.nome}>
        {item.nome}
      </Text>

      <Text style={styles.descricao}>
        {item.descricao}
      </Text>

      <Text style={styles.preco}>
        R$ {Number(item.preco).toFixed(2)}
      </Text>

      <View style={styles.quantidadeContainer}>
        <TouchableOpacity
          style={styles.quantidadeBotao}
          onPress={diminuir}
        >
          <Text style={styles.quantidadeTexto}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantidade}>
          {quantidade}
        </Text>

        <TouchableOpacity
          style={styles.quantidadeBotao}
          onPress={aumentar}
        >
          <Text style={styles.quantidadeTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => onAdicionar(quantidade)}
      >
        <Text style={styles.textoBotao}>
          Adicionar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 190,
    borderRadius: 12,
    marginBottom: 12,
  },

  semImagem: {
    width: "100%",
    height: 190,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  semImagemTexto: {
    color: "#777",
    fontSize: 16,
  },

  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  descricao: {
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 10,
    fontSize: 14,
  },

  preco: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16A34A",
    marginBottom: 15,
  },

  quantidadeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  quantidadeBotao: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  quantidadeTexto: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  quantidade: {
    marginHorizontal: 22,
    fontSize: 20,
    fontWeight: "bold",
  },

  botao: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});