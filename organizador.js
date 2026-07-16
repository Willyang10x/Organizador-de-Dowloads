const fs = require('fs');
const path = require('path');
const notifier = require('node-notifier');

// Importa as configurações do nosso arquivo JSON
const config = require('./config.json');

// 1. Define os caminhos base
const pastaUsuario = process.env.USERPROFILE || process.env.HOME;
const pastaDownloads = path.join(pastaUsuario, 'Downloads');
const pastaDestinoBase = path.join(pastaUsuario, 'Arquivos_Organizados');

// Garante que a pasta base de destino exista antes de começar
if (!fs.existsSync(pastaDestinoBase)) {
    fs.mkdirSync(pastaDestinoBase);
}

// 2. Carrega as categorias do arquivo de configuração
const categorias = config.categorias;

// Função para descobrir para qual pasta o arquivo deve ir
function descobrirDestino(extensao) {
    for (const [pasta, extensoes] of Object.entries(categorias)) {
        if (extensoes.includes(extensao.toLowerCase())) {
            return pasta;
        }
    }
    return 'Outros'; 
}

console.log(`👀 Monitorando a pasta: ${pastaDownloads}...`);
console.log(`📁 Os arquivos serão movidos para: ${pastaDestinoBase}`);

// 3. Fica "escutando" as mudanças na pasta
fs.watch(pastaDownloads, (evento, nomeArquivo) => {
    if (!nomeArquivo) return;

    const caminhoAntigo = path.join(pastaDownloads, nomeArquivo);

    // Aguarda um delay para garantir que o download terminou antes de mover
    setTimeout(() => {
        if (!fs.existsSync(caminhoAntigo)) return;

        const extensao = path.extname(nomeArquivo);
        if (!extensao) return; 

        const nomePastaDestino = descobrirDestino(extensao);
        const caminhoPastaDestino = path.join(pastaDestinoBase, nomePastaDestino);

        if (!fs.existsSync(caminhoPastaDestino)) {
            fs.mkdirSync(caminhoPastaDestino);
        }

        const caminhoNovo = path.join(caminhoPastaDestino, nomeArquivo);

        try {
            fs.renameSync(caminhoAntigo, caminhoNovo);
            console.log(`✅ Movido: ${nomeArquivo} -> ${nomePastaDestino}`);
            
            // 🔔 Dispara a notificação nativa no sistema operacional
            notifier.notify({
                title: 'Organizador de Downloads',
                message: `Arquivo movido para: ${nomePastaDestino}\n📁 ${nomeArquivo}`,
                sound: true, // Toca o som padrão de notificação do sistema
                wait: false  // Não pausa o código esperando você clicar na notificação
            });

        } catch (erro) {
            console.error(`❌ Erro ao mover ${nomeArquivo}:`, erro.message);
        }
    }, 1000);
});