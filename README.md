# koalabo

## dep

```
nodejs npm yarn
```

## run
run backend server
```
cd backend
docker-compose build
docker-compose up
```
run frontend app
```
cd web-app
yarn dev
```

## systemd for backend 
in : /etc/systemd/system/koalabo.service
```
[Unit]
Description="koalabo service with docker compose"
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
User=ubuntu
RemainAfterExit=true
WorkingDirectory=/home/ubuntu/koalabo/backend/
ExecStart=/bin/bash script.sh


[Install]
WantedBy=multi-user.target
```

```
systemctl start koalabo
```



## config files

backend/database/.env

```
KOALABODB_NAME=<>
KOALABODB_PWD=<>
```

backend/.env

```
MDB_ADMIN_PWD=<>
MDB_ADMIN_NAME=<>
KOALABODB_NAME=<>
KOALABODB_PWD=<>
```

backend/server/.env

```
KOALABODB_NAME=<>
KOALABODB_PWD=<>
```

backend/database/init.js

```
db = db.getSiblingDB('koalabodb');

db.createUser({
    user: < KOALABODB_NAME > ,
    pwd: < KOALABODB_PWD > ,
    roles: [{
        role: 'readWrite',
        db: 'koalabodb',
    }],
});
```

## TODO

- handle all .env files

- especially the backend/database/init.js user creation

- make a systemctl config file for the docker-compose file

