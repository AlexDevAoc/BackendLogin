<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

#Ejecutar en desarrollo

1. Clonar Repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Renombrar ```.env.template``` a ```.env```

5. Levantar la DB con el siguiente comando docker
```
docker-compose up  -d
```
6.Levantar api
```
yarn start:dev
```
## Stack usado
*MongoDB 5
*Nest CLI 10.3.2
*Nest Core 10.3.3
*Node 20.11.1