import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

<<<<<<< HEAD
const apiURL = process.env.EXPO_PUBLIC_BASE_URL;
=======
import { useState } from "react";

export default function CardapioCard({
>>>>>>> 5731c6641a98e8eeb4161e87266c990a22fc798b

export default function CardapioCard({ item, onAdicionar }) {
  const imagemUrl = `${apiURL}/static/imagens/${item.id}.jpg`;

  const [quantidade, setQuantidade] = useState(1);

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  function aumentar() {
    setQuantidade(quantidade + 1);
  }

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imagemUrl }}
        style={styles.image}
        // se der 404 (item sem foto ainda), mostra um placeholder
        defaultSource={require("../assets/placeholder.png")}
      />

<<<<<<< HEAD
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>
=======
      {
        item.imagem && (

          <Image

            source={{ uri: item.imagem }}

            style={styles.image}

          />

        )
      }

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
          <Text style={styles.quantidadeTexto}>
            -
          </Text>
        </TouchableOpacity>

        <Text style={styles.quantidade}>
          {quantidade}
        </Text>

        <TouchableOpacity
          style={styles.quantidadeBotao}
          onPress={aumentar}
        >
          <Text style={styles.quantidadeTexto}>
            +
          </Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity

        style={styles.botao}

        onPress={() => onAdicionar(quantidade)}

      >

        <Text style={styles.textoBotao}>

          Adicionar

        </Text>
>>>>>>> 5731c6641a98e8eeb4161e87266c990a22fc798b

      <TouchableOpacity style={styles.botao} onPress={onAdicionar}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
<<<<<<< HEAD
}
=======

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFF",

    marginBottom: 15,

    padding: 15,

    borderRadius: 15,

    elevation: 2,

  },

  image: {

    width: "100%",

    height: 180,

    borderRadius: 10,

    marginBottom: 10,

  },

  nome: {

    fontWeight: "bold",

    fontSize: 20,

  },

  descricao: {

    color: "#666",

    marginVertical: 8,

  },

  preco: {

    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 15,

  },

  quantidadeContainer: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 15,

  },

  quantidadeBotao: {

    backgroundColor: "#111",

    width: 40,

    height: 40,

    borderRadius: 10,

    alignItems: "center",

    justifyContent: "center",

  },

  quantidadeTexto: {

    color: "#FFF",

    fontSize: 25,

    fontWeight: "bold",

  },

  quantidade: {

    fontSize: 20,

    fontWeight: "bold",

    marginHorizontal: 20,

  },

  botao: {

    backgroundColor: "#111",

    padding: 14,

    borderRadius: 10,

    alignItems: "center",

  },

  textoBotao: {

    color: "#FFF",

    fontWeight: "bold",

    fontSize: 16,

  },

});
>>>>>>> 5731c6641a98e8eeb4161e87266c990a22fc798b
