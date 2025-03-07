import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, Archive, Rocket } from "lucide-react";
import Image from "next/image";

interface WelcomeDialogProps {
    open: boolean; // Estado do Dialog (aberto ou fechado)
    onOpenChange: (open: boolean) => void; // Callback para mudança de estado
    onClose: () => void; // Callback para fechar o Dialog
    theme: any; // Tema do Dialog
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ open, onOpenChange, onClose, theme }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[600px] w-full max-w-[95%] animate-in fade-in-90 zoom-in-95 overflow-auto max-h-[90vh] p-6 rounded-lg shadow-lg 
  scrollbar scrollbar-thumb-[#16a249] scrollbar-track-gray-200 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-[#16a249]"
            >
                <DialogHeader>
                    <DialogTitle className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 text-center sm:text-left">

                        <Rocket className="mx-auto sm:mx-0  text-green-600" />
                        <span className="text-lg sm:text-xl font-semibold">
                        ChatIA Template - Chatbot Inteligente
                        </span>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="mt-4 space-y-6">
                            {/* Adicionando o iframe do YouTube */}
                            <div className="w-full aspect-video rounded-lg overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg"
                                />
                            </div>

                            {/* Lista de funcionalidades */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MessageSquare className="mt-1 h-6 w-6 text-blue-600" />
                                    <div>
                                        <span className="block font-medium">Conversas Inteligentes</span>
                                        <span className="block text-sm text-gray-600">
                                        Conversas inteligentes e intuitivas. Entende o que você diz.
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Star className="mt-1 h-6 w-6 text-yellow-500" />
                                    <div>
                                        <span className="block font-medium">Favorite Conversas</span>
                                        <span className="block text-sm text-gray-600">
                                            Marque conversas importantes para acesso rápido.
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Archive className="mt-1 h-6 w-6 text-gray-600" />
                                    <div>
                                        <span className="block font-medium">Organize seu Histórico</span>
                                        <span className="block text-sm text-gray-600">
                                            Arquive conversas antigas para manter tudo organizado.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose} className="w-full sm:w-auto bg-[#16a249] text-white">
                        Começar a Usar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WelcomeDialog;
