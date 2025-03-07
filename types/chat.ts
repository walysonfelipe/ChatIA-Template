export interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    timestamp: string;
  }
  
  export interface Chat {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
    messages: Message[];
    starred?: boolean;
    archived?: boolean;
  }