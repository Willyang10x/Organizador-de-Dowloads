# 📂 Organizador de Downloads Automático

Um script leve e eficiente desenvolvido em **Node.js** para monitorar e organizar automaticamente sua pasta de Downloads. 

O sistema roda silenciosamente em segundo plano, detecta quando um novo arquivo é baixado e o move imediatamente para uma central de arquivos categorizada (ex: Imagens, Documentos, Instaladores), mantendo seu ambiente de trabalho limpo e organizado.

---

## ✨ Funcionalidades

* **Monitoramento em Tempo Real:** Utiliza o módulo nativo `fs.watch` para escutar mudanças na pasta de Downloads instantaneamente.
* **Categorização Inteligente:** Lê a extensão do arquivo e o destina para a pasta correta (ex: `.pdf` para Documentos, `.png` para Imagens).
* **Arquitetura Limpa:** Separa a pasta de entrada (Downloads) da pasta de saída (Arquivos_Organizados), evitando conflitos e loops de repetição.
* **Zero Dependências:** Construído 100% com módulos nativos do Node.js (`fs` e `path`), sem necessidade de instalar pacotes externos via npm.

---

## 🚀 Tecnologias Utilizadas

* **JavaScript (Node.js)**
* Módulo Nativo: `fs` (File System)
* Módulo Nativo: `path`

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
Você precisa ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

### Passo a Passo

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/Willyang10x/SEU_REPOSITORIO.git)
2. Clone este repositório:
   
    cd SEU_REPOSITORIO
   
4. Execute o script:

    node organizador.js

### 🔄 Rodando em Segundo Plano (Windows)

Para rodar o script de forma invisível e garantir que ele inicie junto com o Windows, utilizamos o **PM2** com seu módulo para Windows:

1. Instale o PM2 e o módulo de startup globalmente:
   ```bash
   npm install -g pm2 pm2-windows-startup

2. pm2-startup install

3. pm2 start organizador.js --name "organizador-downloads"

4. pm2 save

## 📦 Criando Executáveis Standalone (.exe e Linux)

Você pode compilar este projeto em um arquivo executável que roda nativamente em qualquer máquina, sem precisar do Node.js instalado.

1. Instale a ferramenta `pkg` globalmente:
   ```bash
   npm install -g pkg

2. pkg . --targets "node18-win-x64,node18-linux-x64" --out-path dist/

## 👨‍💻 Desenvolvido por **Willyan Gabriel**
