# 🍽️ Restaurant Senac

Sistema de gerenciamento de pedidos para restaurantes desenvolvido como projeto acadêmico, composto por uma API REST em FastAPI e dois aplicativos mobile/web desenvolvidos em React Native (Expo): um destinado ao **Caixa** e outro à **Cozinha**.

O sistema utiliza QR Codes para identificar automaticamente as mesas, permitindo que os clientes realizem pedidos de forma rápida e organizada, enquanto a equipe acompanha todo o fluxo de atendimento em tempo real.

---

# 📱 Módulos do Sistema

## Cliente

* Leitura do QR Code da mesa
* Identificação automática da mesa
* Visualização do cardápio
* Adição de produtos ao pedido
* Acompanhamento do pedido em andamento

## Caixa

Responsável pelo gerenciamento do restaurante.

### Funcionalidades

* Gerenciamento das mesas
* Cadastro de produtos
* Edição do cardápio
* Controle de disponibilidade dos itens
* Visualização do status das mesas
* Geração e visualização dos QR Codes das mesas

## Cozinha

Responsável pelo gerenciamento dos pedidos recebidos.

### Funcionalidades

* Recebimento automático dos pedidos
* Lista de pedidos pendentes
* Alteração do status dos pedidos
* Finalização dos pedidos
* Atualização automática da tela para novos pedidos

---

# 📂 Estrutura do Projeto

```text
Projeto-Senac
│
├── cardapio backend/
│── cardapio-expo/
|
├── cliente-backend/
├── cliente-expo/
│
└── README.md
```

---

# 🔄 Fluxo do Sistema

1. O cliente escaneia o QR Code disponível na mesa.
2. O aplicativo identifica automaticamente a mesa.
3. O cardápio é carregado pela API.
4. O cliente monta e envia seu pedido.
5. O pedido é registrado no banco de dados.
6. O aplicativo da **Cozinha** recebe o novo pedido automaticamente.
7. Após o preparo, a cozinha conclui o pedido.
8. O sistema atualiza o status da mesa e do pedido em tempo real.
