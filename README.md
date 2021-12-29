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
codker-compose up
```
run frontend app
```
cd web-app
yarn dev
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

handle all .env files

especially the backend/database/init.js user creation
