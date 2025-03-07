import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter} from "lucide-react";

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: any) => void;
  startNewChat: () => void;
  children?: React.ReactNode; // Adicione esta linha
}

const Sidebar: React.FC<SidebarProps> = ({ searchQuery, setSearchQuery, setFilter, startNewChat, children }) => (
  <aside className="w-80 border-r bg-card">
    <div className="p-4 space-y-4">
      <Button
        className="w-full justify-start gap-2 bg-[#16a249] hover:bg-blue-700 dark:bg-[#16a249] dark:text-white dark:hover:bg-[#0d8038]"
        onClick={startNewChat}
      >
        <Plus className="h-4 w-4" />
        Nova Conversa
      </Button>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>Todas as Conversas</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("starred")}>Favoritas</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("archived")}>Arquivadas</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    {children} {/* Renderize os children aqui */}
  </aside>
);

export default Sidebar;

