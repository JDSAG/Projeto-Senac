import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function CardapioCard({

  item,

  onAdicionar,

}) {

  return (

    <View style={styles.card}>

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

      <TouchableOpacity

        style={styles.botao}

        onPress={onAdicionar}

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