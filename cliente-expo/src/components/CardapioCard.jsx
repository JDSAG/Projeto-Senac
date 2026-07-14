import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function CardapioCard({ item, onAdicionar }) {
  const imagemUrl = `${apiURL}/static/imagens/${item.id}.jpg`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imagemUrl }}
        style={styles.image}
        // se der 404 (item sem foto ainda), mostra um placeholder
        defaultSource={require("../assets/placeholder.png")}
      />

      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>

      <TouchableOpacity style={styles.botao} onPress={onAdicionar}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}