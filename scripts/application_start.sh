#give permission for everything in the cwm-be directory
sudo chmod -R 777 /home/ubuntu/cwm-be
#navigate into our working directory where we have all our github files
cd /home/ubuntu/cwm-be
#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)
#install node modules
yarn install
#start our node app in the background
node ./src/server.js > app.out.log 2> app.err.log < /dev/null &