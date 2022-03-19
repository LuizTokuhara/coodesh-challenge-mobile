# Mobile Challenge Coodesh - Ionic

## Apresentação

Vídeo desafio [YouTube](https://www.youtube.com/watch?v=ppZ7npzc47o)

## Abordagem

- Para realizar o desafio foi utilizado o framework Ionic (Angular) com Capacitor;
- Toda a UI foi dividida em componentes para uma melhora manutenção;
- A partir da Rest Api fornecida foram construídos interfaces para tipagem da resposta obtida na requisição;
- Na arquitetura utilizada foram separados os smart e dumb components, utilizando shared services que serão consumidos por toda aplicacação;
- Foram adicionados testes unitários para atestar a funcionalidade da aplicação.

## Extras

- Uso de skeleton loading;
- O input de filtragem possui busca por nome, sobrenome e país;
- Seletor de filtragem por gênero;
- Infinity loading com 50 resultados por requisição (limitado a 5);
- Ao carregar mais resultados é aplicado o filtro ativo;
- Alerta de erro nas requisições;
- Script para build e cópia de assets por plataforma.

## Executando a aplicação

Após baixar o repositório executar os seguintes comandos:

Instalar as dependências do projeto

```
npm install
```

Rodar o projeto no navegador

```
npm run start
```

Criar versão Android

```
npm run android:build
```

Rodar versão Android no device ou simulador

```
npm run android:device
```

Criar versão iOS

```
npm run ios:build
```

Rodar versão iOS no device ou simulador

```
npm run ios:device
```
