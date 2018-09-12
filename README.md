# Projeto My Poopy Ionic

Versão do projeto My Poopy em Ionic. 

## Antes de baixar o projeto você deve fazer o seguinte:

1 - **Configuração do ambiente:**
```
Tenha certeza de que o JAVA está instalado na sua máquina caso queira rodar para android no emulador.
Segue o link para o download do java:
> http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
```

Logo após fazer o download do JAVA, você pode baixar o Android Studio para configurar o SDK do Android
e para ter o emulador virtual.
```
Segue o link para o download do Android Studio:
> https://developer.android.com/studio/

Caso não saiba como criar o emulador virtual, segue o link abaixo do tutorial completo:
> https://www.concrete.com.br/2017/03/10/novo-projeto-e-emulador-no-android-studio-tutorial-android-2/

```

2 - **Variáveis de Ambiente:**

**Certifique-se de que as váriaveis de ambientes estejam devidamente configuradas na sua máquina, caso contrário,
o projeto não irá buildar para ANDROID.**
```
As variáveis de ambiente que precisam estar configuradas são:

> JAVA_HOME
    Apontando para o JDK
> ANDROID_HOME
    Apontando para o SDK
```
3 - **Configuração do Node e NPM:**

```
Como o Ionic é um framework Javascript, você vai precisar do nodejs e do npm instalados na sua máquina.
Para fazer o download do nodejs entre no link abaixo e escolha a versão LTS:
> https://nodejs.org/en/
```

Logo após a instalação, entre no seu terminal e digite o comando: 

> **node -v**.
```
Se aparecer a versão do node é porquê a instalação foi feita com sucesso! 
No momento da escrita deste README a versão do node é 8.12.0.
```

O npm é instalado junto com o node, então para verificar se o npm foi instalado, entre no seu terminal e digite
o comando: 
> **npm -v**.
```
Se aparecer a versão do npm é porquê a instalação foi feita com sucesso.
No momento da escrita deste README a versão do npm é 6.4.1.

Caso tenha dado algum problema, volte para o passo 3.
```

## Instalando o Ionic e o Cordova

Para fazer instalar o Ionic e do Cordova basta digitar o seguinte comando no seu terminal:
> **npm install -g ionic cordova**

**Obs: Como existe o comando -g (instalação global), você deve abrir o seu terminal como administrador ou
usar o sudo, caso esteja no MAC ou Linux.**

```
Ao digitar o comando ele fará as instalações das dependencias necessárias para rodar o projeto.
```
Para verificar se o Ionic foi instalado com sucesso, basta digitar o seguinte comando no seu terminal:
> **ionic -v**

O seguinte resultado deve ser gerado:
```
  _             _
 (_) ___  _ __ (_) ___
 | |/ _ \| '_ \| |/ __|
 | | (_) | | | | | (__
 |_|\___/|_| |_|_|\___|  CLI 4.1.2


 Usage:

   $ ionic <command> [<args>] [--help] [--verbose] [--quiet] [--no-interactive] [--no-color] [--confirm] [options]

 Global Commands:

   config <subcommand> ...... Manage CLI and project config values (subcommands: get, set, unset)
   docs ..................... Open the Ionic documentation website
   info ..................... Print project, system, and environment information
   login .................... Login to Ionic Pro
   logout ................... Logout of Ionic Pro
   signup ................... Create an account for Ionic Pro
   ssh <subcommand> ......... Commands for configuring SSH keys (subcommands: add, delete, generate, list, setup, use)
   start .................... Create a new project

 Project Commands:

   You are not in a project directory.
```
E para verificar se o Cordova foi instaldo com sucesso, basta digitar o seguinte comando no seu terminal:
> **cordova -v**

Ele fará uma pergunta se você deseja reportar anonimamente dados estatísticos e deve gerar
o seguinte resultado:
```
? May Cordova anonymously report usage statistics to improve the tool over time? Yes

Thanks for opting into telemetry to help us improve cordova.
8.0.0
```


## Como baixar o projeto:

Digite os seguintes comando para clonar o projeto:
```
1. git clone https://github.com/ThePoopyTeam/my-poopy-ionic.git mypoopy
2. cd mypoopy
3. npm install
```

## Rodando o projeto:
Após fazer todos os passos anteriores, você já está pronto para rodar o projeto **My Poopy**.

#### Rodando no Browser:
```
Para rodar o projeto no seu navegador, basta digitar o seguinta comando no terminal:
```
> **ionic serve**

```
Se tudo estiver certo, ele deve abrir a página inicial do app no navegador. Caso tenha gerado algum erro,
verifique os passos anteriores ou se o seu browser suporta o Ionic.

Segue a documentação:
https://ionicframework.com/docs/intro/browser-support/
```

#### Rodando no Android (no dispositivo):
```
Conecte o seu dispositivo (já configurado em modo desenvolvedor e com o debug por usb habilitado) via usb
no computador e rode o seguinte comando no seu terminal:
```
> **ionic cordova run android**

```
Ele vai gerar o um apk chamado app-debug.apk e irá instalar no seu dispositivo.
Isso pode levar uns minutos...
```

**OBS: Caso não saiba como habilitar o modo desenvolvedor no seu aparelho, segue o link para a pesquisa:**

[Como habilitar o modo desenvolvedor no android](https://www.google.com.br/search?ei=gh-ZW8K-DISiwgT3or6gBA&q=habilitar+modo+desenvolvedor+android&oq=habilidmodo+desenvolvedor+android&gs_l=psy-ab.3.0.0i13k1j0i13i30k1l8j0i13i5i30k1.7233.8375.0.10250.7.7.0.0.0.0.187.747.0j5.5.0....0...1c.1.64.psy-ab..2.5.746...0i7i30k1.0.xTeqYx3yLiQ)

#### Rodando no Android (no emulador):
```
Abra o seu Android Studio e ligue o seu emulador. Logo após, vá para o seu terminal e digite o seguinte 
comando:
```
> **ionic cordova run android**

```
Aqui acontece o mesmo processo de quando roda direto no dispositivo.
```

**Parabén! Você está rodando o projeto MyPoopy na sua máquina.**
