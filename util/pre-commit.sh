#!/bin/sh

# Runs the pre-commit hook and stages files but does not commit
cd "${0%/*}"
cd ..
git add .
pre-commit run --all-files
git add Star_Knightess_Aura/data/*.json

# Sometimes don't want to commit these
git restore --staged Star_Knightess_Aura/data/MapInfos.json
git restore --staged Star_Knightess_Aura/data/System.json
git restore --staged Star_Knightess_Aura/game.rmmzproject
