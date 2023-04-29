#!/bin/sh
#
# Run all five major browser modes in sequence
#

echo "Chrome Desktop"
env BROWSER="chrome" MOBILE_WEB="false" HEADLESS="false" npx mocha tests

echo "Chrome Mobile - Pixel 5"
env BROWSER="chrome" MOBILE_WEB="true" HEADLESS="false" npx mocha tests

echo "Safari Desktop"
env BROWSER="safari" MOBILE_WEB="false" HEADLESS="false" npx mocha tests

echo "Chrome Desktop - Headless"
env BROWSER="chrome" MOBILE_WEB="false" HEADLESS="true" npx mocha tests

echo "Chrome Mobile - Headless"
env BROWSER="chrome" MOBILE_WEB="true" HEADLESS="true" npx mocha tests


