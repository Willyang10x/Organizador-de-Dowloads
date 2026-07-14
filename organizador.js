const fs = require('fs');
const path = require('path');

// 1. Define os caminhos base
const pastaUsuario = process.env.USERPROFILE || process.env.HOME;
const pastaDownloads = path.join(pastaUsuario, 'Downloads');

// Define a nova pasta de destino fora do Downloads
const pastaDestinoBase = path.join(pastaUsuario, 'Arquivos_Organizados');

// Garante que a pasta base de destino exista antes de começar
if (!fs.existsSync(pastaDestinoBase)) {
    fs.mkdirSync(pastaDestinoBase);
}

// 2. Mapeia os tipos de arquivos para suas respectivas pastas
const categorias = {
    'Imagens': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
    'Documentos': ['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.csv'],
    'Instaladores': ['.exe', '.msi', '.dmg', '.pkg'],
    'Compactados': ['.zip', '.rar', '.7z', '.tar', '.gz'],
    'Desenvolvimento': ['.js', '.html', '.css', '.json', '.py']
};

// Função para descobrir para qual pasta o arquivo deve ir
function descobrirDestino(extensao) {
    for (const [pasta, extensoes] of Object.entries(categorias)) {
        if (extensoes.includes(extensao.toLowerCase())) {
            return pasta;
        }
    }
    return 'Outros'; // Pasta padrão para arquivos não mapeados
}

console.log(`Monitorando a pasta: ${pastaDownloads}...`);
console.log(`Os arquivos serão movidos para: ${pastaDestinoBase}`);

// 3. Fica "escutando" as mudanças na pasta
fs.watch(pastaDownloads, (evento, nomeArquivo) => {
    if (!nomeArquivo) return;

    const caminhoAntigo = path.join(pastaDownloads, nomeArquivo);

    // Aguarda um pequeno delay para garantir que o download terminou antes de mover
    setTimeout(() => {
        // Verifica se o arquivo ainda existe (pode ter sido um arquivo temporário deletado)
        if (!fs.existsSync(caminhoAntigo)) return;

        // Pega a extensão do arquivo
        const extensao = path.extname(nomeArquivo);
        if (!extensao) return; // Ignora pastas ou arquivos sem extensão

        const nomePastaDestino = descobrirDestino(extensao);
        
        // AGORA USA A NOVA PASTA BASE COMO DESTINO
        const caminhoPastaDestino = path.join(pastaDestinoBase, nomePastaDestino);

        // Cria a subpasta de destino se ela não existir
        if (!fs.existsSync(caminhoPastaDestino)) {
            fs.mkdirSync(caminhoPastaDestino);
        }

        const caminhoNovo = path.join(caminhoPastaDestino, nomeArquivo);

        // Move o arquivo
        try {
            fs.renameSync(caminhoAntigo, caminhoNovo);
            console.log(`Movido: ${nomeArquivo} -> ${nomePastaDestino}`);
        } catch (erro) {
            console.error(`Erro ao mover ${nomeArquivo}:`, erro.message);
        }
    }, 1000); // 1 segundo de delay
});