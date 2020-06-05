#!/bin/bash

cd app-shell
npm run build:emulator
cd ..
mkdir esm-$1
cd esm-$1
npm init pilet --source ../app-shell/dist/develop/openmrs-app-shell.tgz -y
cd ..
