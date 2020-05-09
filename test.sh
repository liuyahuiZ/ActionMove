# 安装sshpass
# curl -O -L http://downloads.sourceforge.net/project/sshpass/sshpass/1.05/sshpass-1.05.tar.gz && tar xvzf sshpass-1.05.tar.gz && cd sshpass-1.05 && ./configure && make && sudo make install

#!/bin/bash

if which sshpass 2>/dev/null; then
  echo "sshpass exists!"
else
  echo "nope, no sshpass installed."
  echo '--install sshpass--'
  curl -O -L http://downloads.sourceforge.net/project/sshpass/sshpass/1.05/sshpass-1.05.tar.gz && tar xvzf sshpass-1.05.tar.gz && cd sshpass-1.05 && ./configure && make && sudo make install
  echo '--installed--'
fi

SSH_KEY="myssh"
BUILD_PATH="dist/"
TARGET_PATH="/usr/local/nginx/html/babyDay"
PASS_WORD="LYHlyh123"
USERNAME="root"
IP="47.88.2.72"

#echo $USER
# sshpass -p LYHlyh123 ssh root@47.88.2.72
echo '--build--'
npm run build
echo '--build done--'

echo '--uploading--'
sshpass -p $PASS_WORD scp -r $BUILD_PATH $USERNAME@$IP:$TARGET_PATH
echo '--end--'
# sshpass -p LYHlyh123 scp -r dist/ root@47.88.2.72:/usr/local/nginx/html/babyDay