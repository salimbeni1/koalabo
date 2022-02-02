echo "docker-compose script"

pwd

cd /home/ubuntu/koalabo/backend

export PYTHONPATH="/home/ubuntu/.local/lib/python3.8/site-packages"

/home/ubuntu/.local/bin/docker-compose up >> koalabobackend.log &