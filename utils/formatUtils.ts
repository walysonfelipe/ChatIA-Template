export const formatMessageContent = (content: string): string => {
    // Formatar **negrito** para <strong>
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Formatar *itálico* para <em>
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/_(.*?)_/g, '<em>$1</em>'); // Para itálico com underline
  
    // Formatar listas (não ordenadas e ordenadas)
    content = content.replace(/^\- (.*?)(?=\n|$)/gm, '<ul><li>$1</li></ul>');
    content = content.replace(/^\* (.*?)(?=\n|$)/gm, '<ul><li>$1</li></ul>'); // Asterisco como marcador
    content = content.replace(/^(\d+)\. (.*?)(?=\n|$)/gm, '<ol><li>$2</li></ol>');
  
    // Formatar citações (usando >)
    content = content.replace(/^> (.*?)(?=\n|$)/gm, '<blockquote>$1</blockquote>');
  
    // Detectar e formatar links do tipo [texto](url)
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
    // Formatar código inline com crase
    content = content.replace(/`(.*?)`/g, '<code>$1</code>');
  
    // Formatar blocos de código com três crases
    content = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
    // Formatar cabeçalhos com #
    content = content.replace(/^(#{1,6}) (.*?)$/gm, (match, p1, p2) => {
      const level = p1.length;
      return `<h${level}>${p2}</h${level}>`;
    });
  
    // Tabelas no formato Markdown
    content = content.replace(/\|.*\|/g, (match) => {
      const rows = match.split('\n').map(row => {
        return `<tr>${row.split('|').map(col => `<td>${col.trim()}</td>`).join('')}</tr>`;
      });
      return `<table>${rows.join('')}</table>`;
    });
  
    return content;
  };