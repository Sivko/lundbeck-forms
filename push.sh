# SERVER_HOST=root@91.186.198.100
rsync -avz -e 'ssh -i ~/.ssh/id_rsa'  --exclude 'node_modules' ./ root@62.113.98.7:/root/
# rsync -avz -e 'ssh -i ~/.ssh/id_rsa' ./Dockerfile root@62.113.98.7:/root/Dockerfile
# rsync -avz -e 'ssh -i ~/.ssh/id_rsa' ./Dockerfile root@62.113.98.7:/root/Dockerfile



# ssh -i ~/.ssh/id_rsa $SERVER_HOST "chmod +x /app/bin/start.sh"
# rsync -avz -e 'ssh -i ~/.ssh/id_rsa' ./docker-compose.yml root@31.128.46.89:/root/docker-compose.yml
# rsync -avz -e 'ssh -i ~/.ssh/id_rsa' ./docker-compose.yml root@31.128.46.89:/root/docker-compose.yml
