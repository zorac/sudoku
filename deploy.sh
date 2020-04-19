#!/bin/sh

set -ev

yarn build
git checkout gh-pages
rm -f precache-manifest.*.js static/css/*.css* static/js/*.js*
rsync -av build/ .
git add .
git commit -m 'Build for GitHub Pages'
git push
git checkout master
