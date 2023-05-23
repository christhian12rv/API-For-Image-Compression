<h1 align="center">Api For Image Compression</h1>

<!-- Índice -->
<details>
  <summary>Índice</summary>
  <ol>
        <li><a href="#feito-com">Feito com</a></li>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
        <li><a href="#rodando-o-projeto">Rodando o projeto</a></li>
      </ul>
    </li>
    <li><a href="#explicação-do-projeto">Explicação do projeto</a></li>
  </ol>
</details>

### Feito com


-   [Typescript](https://www.typescriptlang.org)
-   [NodeJS v18.15.0](https://nodejs.org/en/download/releases/)
-   [NestJS](https://nestjs.com)
-   [Mongoose](https://mongoosejs.com)
-   [MongoDB](https://www.mongodb.com)

<!-- Começando -->

## Começando

### Pré requisitos

Primeiro, deve-se instalar todas as ferramentas necessárias para rodar o projeto. A primeira a ser instalada é o [NodeJS](https://nodejs.org/en/). <ins>**OBS: Lembre-se de instalar a versão v18.15.0, pois é mais garantida de o projeto funcionar**</ins>.

-   #### Instalação do Node no Windows

    Basta acessar o [site oficial do Node.js](https://nodejs.org/) e baixar o instalador.
    Além disso, certifique-se de ter o `git` disponível em seu PATH, `npm` pode precisar dele (você pode encontrar o git [aqui](https://git-scm.com/)).

-   ##### Instalação do Node no Ubuntu

    Você pode instalar o nodejs e o npm facilmente com o apt install, basta executar os seguintes comandos.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   ##### Outros sistemas operacionais
    Você pode encontrar mais informações sobre a instalação no [site oficial do Node.js](https://nodejs.org/) e no [site oficial do NPM](https://npmjs.org/).

    Se a instalação foi bem-sucedida, você poderá executar o seguinte comando.

        $ node --version
        v14.21.3
    
        $ npm --version
        9.6.3

    Se você precisar atualizar o `npm`, você pode fazê-lo usando o `npm`! Legal, certo? Após executar o seguinte comando,    basta abrir novamente a linha de comando e ser feliz.
    
        $ npm install npm -g



### Instalação

1. Clone o repositório
    ```sh
    $ git clone https://github.com/christhian12rv/API-For-Image-Compression.git
    ```
2. Vá à pasta do projeto e instale os pacotes npm
    ```sh
    $ npm install
    ```

### Rodando o projeto

Crie um arquivo .env na raíz do projeto. Em seguida, altere o arquivo .env

    PORT=PORTA_DO_SERVIDOR
    DATABASE_URL=mongodb://{USUARIO}:{SENHA}@{HOST}:{PORTA}/imageCompression?retryWrites=true&w=majority
    
    
Execute o seguinte comando para subir a aplicação

    $ npm start
    
Você pode usar o comando seguinte para fazer os testes

    $ npm run test
    

## Explicação do projeto
O projeto consiste em uma api para compressão de imagens

Através da URL POST "imageExif/compress" você deverá passar um json no body da seguinte forma:

    
    $ {
        "url": "URL_DA_IMAGEM",
        "compress": ENTRE 0 E 0.9
    }
    
Com isso, a api salvará no servidor da aplicação e também no banco de dados a imagem original e imagem comprimida com o fator de compressão enviado através do atributo "compress", e retornará como resposta o caminho para essas imagens e o metadata exif da imagem. A imagem comprimida terá no máximo 720px na sua maior dimensão e a dimensão menor será proporcional a esse valor.
    