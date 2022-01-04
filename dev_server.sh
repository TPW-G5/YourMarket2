#!/bin/bash

trap killall SIGINT

killall(){
  kill 0
}

cd api
sh run.sh &

cd ../frontend
sh run.sh &
wait