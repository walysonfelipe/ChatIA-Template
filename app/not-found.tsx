import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Página não encontrada</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/">
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900">
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
}

