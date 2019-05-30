#!/bin/bash
set -x
IFS=$'\n\t'

# Requires Node.js version 4.x
# Do not run as root

## BUILD
meteor npm install
meteor npm run postinstall

set +e
meteor add rocketchat:lib
set -e

meteor build --server-only --directory ../../docker/chat/deploy

cd ../../docker/chat/deploy

tar -zcvf ../rocket.chat.tar.gz bundle
