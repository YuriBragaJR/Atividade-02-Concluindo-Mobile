# ReUse!

O **ReUse!** é um aplicativo mobile focado em sustentabilidade e troca comunitária. O objetivo do projeto é facilitar o processo de doação, troca e reaproveitamento de itens através de uma interface intuitiva, gamificada e fluida, promovendo o consumo consciente.

Este projeto foi desenvolvido como entrega acadêmica, com foco em usabilidade (UI/UX), armazenamento local de dados e integração com hardware nativo (câmera).

---

## Telas e Funcionalidades

O aplicativo é composto por interfaces projetadas com foco na redução da carga cognitiva e na melhoria da jornada do usuário (User Flow):

* **Home (Main):** Tela de exploração contendo busca inteligente e um carrossel dinâmico e otimizado para navegação horizontal de itens recomendados e anúncios recentes.
* **Perfil:** Painel do usuário utilizando organização por ocultamento progressivo (Acordeões expansíveis), além de exibir o saldo de *ReCoins* (moeda de troca do app).
* **Scanner QR Code:** Integração com a câmera nativa do dispositivo para leitura de QR Codes de objetos do mundo físico, facilitando o cadastro rápido no ecossistema do app.

---

## Tecnologias e Requisitos Atendidos

O projeto foi construído utilizando o ecossistema **React Native** com **Expo**.

### Aprimoramentos de UI/UX
* **Grouped Actions:** Agrupamento lógico de ícones e funções no cabeçalho (Sino com *Notification Badge* e Foto de Perfil circular).
* **Feedback Visual:** Uso de elevação (sombras/shadows) para destacar cartões clicáveis e paginação interativa (estilo pílula) no carrossel.
* **Viewfinder Personalizado:** Máscara de foco (Overlay) implementada na câmera para guiar a atenção do usuário diretamente para a leitura do QR Code.

### Persistência de Dados (Async Storage)
Utilizado para armazenar informações cruciais sem necessidade de banco de dados externo neste escopo inicial:

1.  **Buscas Recentes (Smart Recall):** Salva o último termo pesquisado na barra de buscas da Home.

### Hardware Nativo (Câmera)
* Utilização da biblioteca `expo-camera` como um scanner funcional de QR Code.
* Tratamento de permissões de acesso do usuário (Graceful Degradation).

---

## Como executar o projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Expo CLI](https://docs.expo.dev/) instalados na sua máquina.
