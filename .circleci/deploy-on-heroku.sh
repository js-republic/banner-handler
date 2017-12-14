 #!/bin/bash

mkdir _site
cp -R package.json _site
cp -R dist _site
cp -R server _site

#change to whichever directory this lives in
cd _site

#create new git repository and add everything
git init
git remote add heroku git@heroku.com:banner-handler.git
git add .
git commit -m "deployment ..."
git push --force heroku master
heroku open
rm -fr .git

#go back to wherever we started.
cd -
