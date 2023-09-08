# Aprendendo a trabalhar com o docker

## Iniciando

Acessa todas as instacias abertas e ou finalizadas

```
docker ps -a
```


Roda o terminal dentro do container
```
docker run -it node
```

Inicia o docker ubuntu com o nome(--name) de amanda-ubuntu e ele remove automaticamente dos acessos depois de finalizado (--rm)
Alem de rodar tudo isso em segundo plano com a flag (-d)

```
docker run -d --rm --name amanda-ubuntu ubuntu
```

Para entrar no bach sentro do terminal do container node
```
docker run -it --rm --name amanda-node node bash
```
---
## Conceito de volume

### Volume tradicional
O container vai acessar a aplicação atravez de um 'tuneo' para acessar a pasta onde a nossa aplicação esta sendo inicializada

para passar essas informações para o conteiner usamos esse comando
```
-v "${PWD}:/usr/src/app"
```
Onde -v significa Volume

O que diz que o meu arquivo esta na pasta atual que estamos acessando(${PWD}:...) e vai acessar essa pasta dentro do nosso arquivo (...:/usr/src/app)

Ficando dessa forma no final
```
docker run -it --rm --name amanda-node -v "${PWD}:/usr/src/app" node
```

Agora para informar no terminal que quero abrir o bash diretamente na nossa pasta de trabalho do container podemos passar o seguinte comando
```
-w "/usr/src/app"
```
Onde -w significa workdir que seria diretorio de trabalho

Ficando dessa forma no final
```
docker run -it --rm --name amanda-node -v "${PWD}:/usr/src/app" -w "/usr/src/app" node bash
```
Existe a flag 
```
 -c "node index"
```
Onde -c executa um comando automaticamente no bash do node logo depois de inicializar o container e depois o container morre

Ficando assim 
```
docker run -it --rm --name amanda-node -v "${PWD}:/usr/src/app" -w "/usr/src/app" node bash -c "node index"
```

## Mapeamento de portas

Precisamos fazer uma mapeamento em qual porta do meu container vai ouvir a porta do meu computador

Utilizamos a flag -p para informar a porta que vai ser ouvida no nosso pc e a porta q esta informando no container
```
-p "3000:3000"
```
Ficando dessa forma
```
docker run -it --rm --name amanda-node -v "${PWD}:/usr/src/app" -w "/usr/src/app" -p "3000:3000" node bash -c "npm install && node index"
```
Nesse comando tambem estamos instalando o npm para conseguirmos acessar o express da nossa aplicação

## Trabalhando com imagem MYSQL

Para executar o bash no mysql
```
docker exec -it amanda-mysql bash
```
Para criar o container do mysql nos passamos esse parametro
```
docker run -d --rm --name amanda-mysql ROOT_PASSWORD=suasenha mysql
```

Depois de criado precisamos entrar dentro do MYSQL dessa forma:
```
mysql -uroot -p
```
Ele vai solicitar a senha no terminal

Depois disso você vai começar a inserir comando SQL para fazer sua base de dados

## Conceito de volume em banco de dados
### Volume nomeados
O docker vai salvar na sua maquina automaticamente sem você precisar apontar para a pasta que foi salva

Para criar o volume:

```
docker volume create volume-mysql
```

Dessa forma as suas informações do banco de dados que você criou e inseriu vai continuar existindo mesmo que você reinicie sua maquina

O docker cria um backup da sua base de dados

Agora para iniciar o banco de dados com esse backup é dessa forma:
```
docker run -d --name amanda-mysql -v "volume-mysql:/var/lib/mysql" -e MYSQL_ROOT_PASSWORD=suasenha mysql
```
Agora acessar o bash do mysql
```
docker exec -it amanda-mysql bash
```
Agora mesmo que paramos o conteiner todo o conteudo vai estar salvo em um volume gerenciado pelo docker facilitando nossa vida
