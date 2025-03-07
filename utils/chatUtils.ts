import { Chat } from '../types/chat';

export const filterChats = (chats: Chat[], filter: string, searchQuery: string): Chat[] => {
  return chats
    .filter(chat => {
      if (filter === 'starred') return chat.starred;
      if (filter === 'archived') return chat.archived;
      return !chat.archived; // 'all' shows non-archived chats
    })
    .filter(chat => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        chat.title.toLowerCase().includes(searchLower) ||
        chat.messages.some(msg => msg.content.toLowerCase().includes(searchLower))
      );
    });
};

export const toggleStar = (chats: Chat[], chatId: string): Chat[] => {
  return chats.map(chat => {
    if (chat.id === chatId) {
      return { ...chat, starred: !chat.starred };
    }
    return chat;
  });
};

export const toggleArchive = (chats: Chat[], chatId: string): Chat[] => {
  return chats.map(chat => {
    if (chat.id === chatId) {
      return { ...chat, archived: !chat.archived };
    }
    return chat;
  });
};

export const deleteChat = (chats: Chat[], chatId: string): Chat[] => {
  return chats.filter(chat => chat.id !== chatId);
};