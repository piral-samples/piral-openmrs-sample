#!/bin/bash

URL="https://feed.piral.cloud/api/v1/pilet/openmrs"
KEY="<the key here>"
cd esm-$1
node node_modules/.bin/pilet publish --fresh --api-key $KEY --url $URL
rm *.tgz
cd ..
