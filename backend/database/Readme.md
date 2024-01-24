### to run mongo shell 
docker exec -it backend_mongodb_1 mongosh -u < MDB_ADMIN_NAME > -p < MDB_ADMIN_PWD >

### to init db
docker exec -it backend_mongodb_1 mongosh -u < MDB_ADMIN_NAME > -p < MDB_ADMIN_PWD > --eval "$(cat .\init.js)"



