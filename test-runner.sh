#!/bin/sh
#
# Run all three major browser modes in sequence
#

echo "Chrome Desktop"
env BROWSER="chrome" MOBILE_WEB="false" HEADLESS="false" npx mocha tests

echo "Chrome Mobile - Pixel 5"
env BROWSER="chrome" MOBILE_WEB="true" HEADLESS="false" npx mocha tests

echo "Safari Desktop"
env BROWSER="safari" MOBILE_WEB="false" HEADLESS="false" npx mocha tests

