#!/bin/bash
# 部署到 GitHub Pages
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:你的用户名/english-learning-app.git master:gh-pages
cd ..
