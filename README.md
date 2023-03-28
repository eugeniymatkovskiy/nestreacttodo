# Incredibly ToDo app ever

<p>Powered by NestJS framework and React UI Lib with Docker</p>
<img src="https://skills.thijs.gg/icons?i=docker,react,nest&theme=light" width="500"/>

## Run app with Docker
1. Build images by running the following command in root folder: **docker-compose build**
1. Run app in Docker by: **docker-compose up**
1. Enjoy!

## Running app on the host machinne
1. In ./apprealbe/.env file please change value for *MYSQL_HOST* to **localhost**
1. In ./frontend/package.json file change *proxy* domain to **localhost**
1. Run **npm install** in **./apprealbe** and **./frontend** folders
1. Run **npm start** in **./apprealbe** and **./frontend** folders
1. Don't forget to run **MySQL** on your host machine

## Swagger
Open in browser the following url: http://localhost:4000/api

## TODO
1. Write tests
2. Add support for gRPC API
3. Improve validation
4. To configure eslint for frontend
