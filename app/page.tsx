"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import { Chat, Message } from '@/types/chat';
import { filterChats, toggleStar, toggleArchive, deleteChat } from '@/utils/chatUtils';
import { formatMessageContent } from '@/utils/formatUtils';
import { sendMessage } from '@/services/apiService';
import WelcomeDialog from '@/components/welcome/welcomeDialog'
import Header from "@/components/layout/headerComponent";
import Sidebar from "@/components/chat/SidebarChat";
import ChatCard from "@/components/chat/ChatCard";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [temporaryChat, setTemporaryChat] = useState<Chat | null>();
  const [showWelcome, setShowWelcome] = useState(true);
  const [filter, setFilter] = useState<'all' | 'starred' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const user = {
    name: "Walyson",
    role: "Administrador",
    avatarUrl: "https://github.com/walysonfelipe.png",
  };
  useEffect(() => {
    const welcomed = localStorage.getItem('welcomed');
    if (welcomed) {
      setShowWelcome(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ou um placeholder
  }

  // Filtra os chats com base no filtro e na consulta de pesquisa
  const filteredChats = filterChats(chats, filter, searchQuery);

  // Funções para manipular os chats
  const handleToggleStar = (chatId: string) => {
    setChats((prevChats) => toggleStar(prevChats, chatId));
  };

  const handleToggleArchive = (chatId: string) => {
    setChats((prevChats) => toggleArchive(prevChats, chatId));
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((prevChats) => deleteChat(prevChats, chatId));
    if (selectedChat === chatId) {
      setSelectedChat(null); // Limpa o chat selecionado se ele foi deletado
    }
  };

  const handleWelcomeClose = () => {
    localStorage.setItem('welcomed', 'true');
    setShowWelcome(false);
  };

  const startNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "Novo Chat",
      lastMessage: "Conversa iniciada",
      timestamp: "Agora",
      starred: false,
      archived: false,
      messages: []
    };

    setTemporaryChat(newChat);
    setSelectedChat(newChat.id);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    let currentChatId = selectedChat;

    if (!currentChatId) {
      const newChat = startNewChat();
      currentChatId = newChat?.id;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (temporaryChat) {
      setChats((prevChats) => [
        {
          ...temporaryChat,
          messages: [newMessage],
          lastMessage: input,
          timestamp: "Agora",
        },
        ...prevChats,
      ]);
      setTemporaryChat(null);
    } else {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: input,
              timestamp: "Agora",
            };
          }
          return chat;
        })
      );
    }

    setInput("");
    setIsTyping(true);

    try {
      const assistantMessageContent = await sendMessage(input);
      const formattedContent = formatMessageContent(assistantMessageContent);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: formattedContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === currentChatId) {
            if (chat.messages.length === 1) {
              chat.title = formattedContent.length > 20
                ? formattedContent.substring(0, 20) + "..."
                : formattedContent;
            }
            return {
              ...chat,
              messages: [...chat.messages, assistantMessage],
              lastMessage: assistantMessage.content,
              timestamp: "Agora",
            };
          }
          return chat;
        })
      );
    } catch (error) {
      console.error("Erro ao chamar a API:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, errorMessage],
              lastMessage: errorMessage.content,
              timestamp: "Agora",
            };
          }
          return chat;
        })
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleLogout = () => {
    // Lógica para logout
    console.log("Usuário deslogado");
  };

  return (
    <div className="flex h-screen flex-col bg-background">

      <WelcomeDialog
        open={showWelcome}
        onOpenChange={setShowWelcome}
        onClose={handleWelcomeClose}
        theme={theme}
      />

      <Header
        theme={theme}
        setTheme={setTheme}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          searchQuery={searchQuery}
          setFilter={setFilter}
          setSearchQuery={setSearchQuery}
          startNewChat={startNewChat}
        >
          <Separator />
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-2 p-2">
              {filteredChats.map((chat) => (

                <ChatCard
                  chat={chat}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                  handleDeleteChat={handleDeleteChat}
                  handleToggleArchive={handleToggleArchive}
                  handleToggleStar={handleToggleStar}
                />
              ))}
            </div>
          </ScrollArea>

        </Sidebar>
        {/* Main Chat Area */}
        <main className="flex flex-1 flex-col bg-background">
          {selectedChat || temporaryChat ? (
            <>
              <div className="border-b bg-card px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setSelectedChat(null)}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h2 className="text-lg font-semibold">
                      {temporaryChat ? "Bem-vindo ao ChatIA" : chats.find(c => c.id === selectedChat)?.title}
                    </h2>
                  </div>
                </div>
              </div>
              <ChatWindow
                messages={temporaryChat ? [] : chats.find(c => c.id === selectedChat)?.messages || []}
                isTyping={isTyping}
                temporaryChat={temporaryChat} // Passe a prop temporaryChat
              />
              <div className="border-t bg-card p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="bg-[#16a249] hover:bg-[#0d8038] dark:bg-[#16a249] dark:text-white dark:hover:bg-[#0d8038]">
                    Enviar
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum chat selecionado</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selecione um chat para ver as mensagens
                </p>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}


