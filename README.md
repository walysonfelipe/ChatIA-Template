# ChatbotIA Template com Next.js e Shadcn UI

[![Next.js](https://img.shields.io/badge/Next.js-14.1.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-0.6.0-blue?style=flat)](https://ui.shadcn.com/)

Template de chatbot inteligente e personalizável utilizando Groq e Llama 3. Interface moderna e responsiva para criação de assistentes virtuais em diversas áreas.

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone [URL_DO_SEU_REPOSITORIO]
```
2. **Instale as dependências**
```bash
npm install
```
3. **Configure a chave da API Groq**
Adicione sua Api Key no arquivo .env na raíz do projeto:
```bash
GROQ_API_KEY=sua_chave_aqui
```
## ⚙️ Configuração
Configure o contexto do agente em ***services/apiServices.ts:***

```bash
// services/apiServices.ts (linha 8 aproximadamente)
  messages: [
    {
      role: "system",
      content: `
      Você é um assistente virtual projetado para ajudar as pessoas a encontrar informações e 
      soluções para diversas questões. Seu objetivo é fornecer informações claras, precisas e 
      úteis sobre qualquer tema que o usuário desejar. Você é simpático, receptivo e sempre tenta 
      ajudar o usuário da melhor forma possível. Se o usuário perguntar sobre algo que você não 
      possa responder com precisão, informe que está aprendendo e redirecione a conversa para
      um tema que você possa ajudar.`
    },
    { role: "user", content: input },
  ]
```

**Personalize o conteúdo:**
Edite o texto dentro de **content:** para alterar:
- Personalidade do assistente
- Regras de interação
- Áreas de especialização
- Mensagens padrão

## ▶️ Uso
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse o chatbot em:
```bash
http://localhost:3000
```

## 📄 Licença
Este projeto está licenciado sob a [MIT License](https://github.com/walysonfelipe/ChatIA-Template/blob/main/LICENSE).

