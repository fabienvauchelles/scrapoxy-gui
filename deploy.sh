#!/bin/bash

GULP=`which gulp`

TARGET="../scrapoxy/server/proxies/commander/public"

rm -Rf .tmp dist

$GULP build

rm -Rf ${TARGET}
cp -a ./dist ${TARGET}
