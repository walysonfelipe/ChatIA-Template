import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Star, Archive, Trash2 } from "lucide-react";
import { toggleStar, toggleArchive, deleteChat } from '@/utils/chatUtils';
interface Chat {
  id: string;
  title: string;
  timestamp: string;
  starred: boolean;
  archived: boolean;
}

interface ChatCardProps {
  chat: any;
  selectedChat: any;
  setSelectedChat: (id: string) => void;
  handleToggleStar: (id: string) => void;
  handleToggleArchive: (id: string) => void;
  handleDeleteChat: (id: string) => void;
}


const ChatCard: React.FC<ChatCardProps> = ({
  chat,
  selectedChat,
  setSelectedChat,
  handleToggleStar,
  handleToggleArchive,
  handleDeleteChat,
}) => {
    
  return (
    <TooltipProvider key={chat.id}>
      <Card
        className={`group relative cursor-pointer transition-all hover:shadow-md ${
          selectedChat === chat.id
            ? "ring-2 ring-[#16a249] dark:[#16a249]"
            : "hover:bg-[#16a249]"
        }`}
        onClick={() => setSelectedChat(chat.id)}
      >
        <div className="w-full p-4">
          <div className="flex items-center justify-between">
            {/* Título e Horário */}
            <div className="flex flex-col gap-1">
              <p className="font-medium truncate">{chat.title}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{chat.timestamp}</span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(chat.id);
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        chat.starred ? "fill-yellow-500 text-yellow-500" : ""
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Favoritar</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleArchive(chat.id);
                    }}
                  >
                    <Archive
                      className={`h-4 w-4 ${
                        chat.archived ? "fill-blue-500 text-blue-500" : ""
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Arquivar</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Deletar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default ChatCard;
