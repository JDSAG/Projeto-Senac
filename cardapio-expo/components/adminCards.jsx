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
  Modal,
  TextInput,
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
  concluido: {
    cor: "#2196F3",
    label: "Concluído",
  },
};

export function AddCardapioModal({ visible, onClose, onSubmit }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [enviando, setEnviando] = useState(false);

  function limparCampos() {
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoria("");
  }

  async function handleSubmit() {
    if (!nome.trim() || !descricao.trim() || !preco || !categoria.trim()) {
      return Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos antes de continuar."
      );
    }

    const precoNumerico = Number(preco.replace(",", "."));

    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      return Alert.alert("Preço inválido", "Informe um preço válido.");
    }

    try {
      setEnviando(true);

      await onSubmit({
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: precoNumerico,
        categoria: categoria.trim(),
      });

      limparCampos();
    } finally {
      setEnviando(false);
    }
  }

  function handleClose() {
    if (enviando) return;
    limparCampos();
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.card}>
          <Text style={modalStyles.titulo}>Novo Item do Cardápio</Text>

          <TextInput
            style={modalStyles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={[modalStyles.input, modalStyles.textArea]}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TextInput
            style={modalStyles.input}
            placeholder="Preço (ex: 19.90)"
            value={preco}
            onChangeText={setPreco}
            keyboardType="decimal-pad"
          />

          <TextInput
            style={modalStyles.input}
            placeholder="Categoria"
            value={categoria}
            onChangeText={setCategoria}
          />

          <View style={modalStyles.botoes}>
            <TouchableOpacity
              style={[modalStyles.botao, modalStyles.cancelar]}
              onPress={handleClose}
              disabled={enviando}
            >
              <Text style={modalStyles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[modalStyles.botao, modalStyles.confirmar]}
              onPress={handleSubmit}
              disabled={enviando}
            >
              {enviando ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={modalStyles.botaoTexto}>Adicionar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 20,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
  },

  textArea: {
    height: 70,
    textAlignVertical: "top",
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },

  botao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelar: {
    backgroundColor: "#ff0000",
  },

  confirmar: {
    backgroundColor: "#2E7D32",
  },

  botaoTexto: {
    color: "#FFF",
    fontWeight: "600",
  },
});

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