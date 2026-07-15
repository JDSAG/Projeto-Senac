import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import DelAndConcluirBtn from "./concluirEdeletarBtn";

const apiURL = process.env.EXPO_PUBLIC_BASE_URL;

const STATUS = {
  pendente: {
    cor: "#FFA500",
    label: "Pendente",
  },
  em_andamento: {
    cor: "#4CAF50",
    label: "Em andamento",
  },
};


export function OrderCards({
  item,
  onIniciar,
  onConcluir,
  onExcluir,
}) {
  const status = STATUS[item.status];

  return (
    <View
      style={[
        orderStyles.card,
        {
          borderLeftWidth: 5,
          borderLeftColor: status.cor,
        },
      ]}
    >
      <View style={orderStyles.header}>
        <Text style={orderStyles.nome}>
          {item.nome_cliente}
        </Text>

        <View
          style={[
            orderStyles.badge,
            {
              backgroundColor: status.cor,
            },
          ]}
        >
          <Text style={orderStyles.badgeTexto}>
            {status.label}
          </Text>
        </View>
      </View>

      <Text style={orderStyles.mesa}>
        Mesa: {item.mesa_id}
      </Text>

      {item.itens?.map((produto) => (
        <Text
          key={produto.id}
          style={orderStyles.itemTexto}
        >
          {produto.quantidade}x {produto.nome_produto} - R${" "}
          {Number(produto.subtotal).toFixed(2)}
        </Text>
      ))}

      <Text style={orderStyles.total}>
        Total: R$ {Number(item.total).toFixed(2)}
      </Text>

      <DelAndConcluirBtn
        status={item.status}
        onIniciar={() => onIniciar(item)}
        onConcluir={() => onConcluir(item)}
        onExcluir={() => onExcluir(item)}
      />
    </View>
  );
}


export function ReceiptCards({
  item,
  onImageChanged,
}) {
  const [uploading, setUploading] = useState(false);
  const [imageVersion, setImageVersion] = useState(Date.now());

  const imageUrl = useMemo(() => {
    if (!item.imagem) return null;

    return `${item.imagem}?t=${imageVersion}`;
  }, [item.imagem, imageVersion]);

  async function uploadImagem(foto) {
    const formData = new FormData();

    if (Platform.OS === "web") {
      const response = await fetch(foto.uri);
      const blob = await response.blob();

      formData.append("file", blob, `${item.id}.jpg`);
    } else {
      formData.append("file", {
        uri: foto.uri,
        name: `${item.id}.jpg`,
        type: "image/jpeg",
      });
    }

    const response = await fetch(
      `${apiURL}/cardapio/${item.id}/imagem`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  }

  async function trocarFoto() {
    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      return Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para trocar a foto."
      );
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

    if (resultado.canceled) return;

    try {
      setUploading(true);

      const data = await uploadImagem(resultado.assets[0]);

      setImageVersion(Date.now());

      onImageChanged?.(item.id, data.imagem);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível enviar a imagem."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={receiptStyles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={uploading}
        onPress={trocarFoto}
      >
        <View>
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../assets/placeholder.png")
            }
            style={receiptStyles.imagem}
          />

          {uploading && (
            <View style={receiptStyles.loading}>
              <ActivityIndicator
                color="#FFF"
                size="small"
              />
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={receiptStyles.info}>
        <Text style={receiptStyles.nome}>
          {item.nome}
        </Text>

        <Text
          style={receiptStyles.descricao}
          numberOfLines={2}
        >
          {item.descricao}
        </Text>

        <Text style={receiptStyles.preco}>
          R$ {Number(item.preco).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}


const orderStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  badgeTexto: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },

  mesa: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },

  itemTexto: {
    fontSize: 14,
    color: "#333",
  },

  total: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});


const receiptStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    gap: 12,
    elevation: 2,
  },

  imagem: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },

  loading: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  descricao: {
    marginTop: 2,
    fontSize: 13,
    color: "#666",
  },

  preco: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
});