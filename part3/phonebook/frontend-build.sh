#!/bin/bash

rm -rf build/
cd ../../part2/
yarn build
cp -r build ../part3/phonebook/build
