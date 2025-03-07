import React, { useEffect, useState } from 'react';

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Sun, Moon, Monitor, LogOut, Rocket } from "lucide-react";

interface HeaderProps {
  theme: any; // Tema atual
  setTheme: (theme: "dark" | "light" | "system") => void; // Função para alterar o tema
  user: {
    name: string;
    role: string;
    avatarUrl?: string;
  }; // Dados do usuário
  onLogout: () => void; // Função para logout
}


const Header: React.FC<HeaderProps> = ({ theme, setTheme, user, onLogout }) => {
  return (
    <header className="flex flex-col border-b bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
        <Rocket className="mx-auto sm:mx-0  text-green-600" />
        <p>Chat<b className='text-green-600'>IA</b></p>
        </div>

        {/* User Dropdown Section */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-accent/50"
                aria-label="Abrir menu do usuário"
              >
                <Avatar className="h-7 w-7 border-2 border-[#16a249] dark:[#16a249]">
                  <AvatarImage src={user.avatarUrl} alt={`Foto de ${user.name}`} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <span className="block text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun className="mr-2 h-4 w-4" />
                  Tema
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      Escuro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Monitor className="mr-2 h-4 w-4" />
                      Sistema
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-red-600 dark:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
