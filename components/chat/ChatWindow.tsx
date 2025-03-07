import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, RocketIcon, User } from "lucide-react";

interface ChatWindowProps {
  messages: Array<any>;
  isTyping: boolean;
  temporaryChat?: any; // Adicione esta linha
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping, temporaryChat }) => (
  <ScrollArea className="flex-1 p-4">
    <div className="flex flex-col gap-4">
      {/* Mensagem inicial para chat temporário */}
      {temporaryChat && (
        <div className="group flex items-end gap-2 justify-start">
          <Avatar className="h-8 w-8">
            <RocketIcon className="h-5 w-5 text-green-600" />
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="relative rounded-lg px-4 py-2 bg-accent">
              <div>
                <strong>Olá! Seja muito bem-vindo!</strong> <br /><br />
                Sou seu assistente virtual, pronto para conversar sobre <strong>qualquer assunto que você desejar!</strong> ✨<br /><br />
                Posso te fornecer <strong>informações e insights</strong> sobre:<br />
                - Curiosidades e fatos interessantes<br />
                - Notícias e atualidades<br />
                - Dicas e sugestões<br />
                - E muito mais! <strong>Basta perguntar!</strong><br /><br />
                Estou aqui para tornar sua experiência <strong>informativa, divertida e cheia de descobertas!</strong> <br />
                Sempre disposto a te ajudar da melhor forma possível, então não hesite em perguntar!<br /><br />
                Vamos juntos explorar <strong>o mundo das conversas!</strong> <strong></strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renderizar mensagens do chat */}
      {messages.map((message) => (
        <div key={message.id} className={`group flex items-end gap-2 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8">
              <RocketIcon className="h-5 w-5 text-green-600" />
            </Avatar>
          )}
          <div className="flex flex-col gap-1">
            <div
              className={`relative rounded-lg px-4 py-2 ${message.role === "assistant"
                ? "bg-accent"
                : "bg-[#16a249] dark:bg-[#16a249] text-white"
                }`}
            >
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
            </div>
            <span className="text-xs text-muted-foreground">
              {message.timestamp}
            </span>
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://github.com/walysonfelipe.png"
                alt="Foto do usuário"
              />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}

      {/* Exibir pontinhos animados enquanto o assistente "digita" */}
      {isTyping && (
        <div className="flex items-end gap-2 justify-start">
          <Avatar className="h-8 w-8">
            <Building2 className="h-5 w-5" />
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="relative rounded-lg px-4 py-2 bg-accent">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </ScrollArea>
);

export default ChatWindow;