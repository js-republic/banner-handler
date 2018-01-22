Email banner handler
---

[![CircleCI](https://circleci.com/gh/js-republic/banner-handler.svg?style=svg)](https://circleci.com/gh/js-republic/banner-handler)

### Intégration dans Gmail

En tant qu'administrateur du domaine Google, pour intégrer les images gérer par 
l'outil, il faut faire appel à l'url :
[http://banner-handler-prod.eu-central-1.elasticbeanstalk.com/banner/random]

> A noter que cette url renvoie une redirection vers la vraie url de l'image. Ainsi, les proxy
d'entreprise sont capables de garder en cache l'image une fois le choix aléatoire éffectué.
 
Cette url, retourne de façon aléatoire une des images téléchargées sur l'outil. Il faut
cependant que l'image soit disponible de façon permanente ou que ses dates de mise à
disposition correspondent à la date d'aujourd'hui.

> L'outil privilégira d'abort les images qui ont une dates de début et fin définies, et
seulement si il n'en trouve pas, il prendra une des images disponibles tout le temps.


Si on veut filtrer par société, il suffit de rajouter le paramètre `company` dans l'url.
Ainsi, si l'on veut ne récupérer que les images autorisées à ce moment là et venant de JS-Republic
par exemple, on fera appel à l'url :
[http://banner-handler-prod.eu-central-1.elasticbeanstalk.com/banner/random?company=js]

Pour UX-Republic :
[http://banner-handler-prod.eu-central-1.elasticbeanstalk.com/banner/random?company=ux]

Pour IoT-Republic :
[http://banner-handler-prod.eu-central-1.elasticbeanstalk.com/banner/random?company=iot]

### Comment démarrer ?

Tout d'abord, il vous faudra créer un fichier `.env` à la racine du projet. 
Ce fichier va contenir toutes les variables d'environement (secrètes pour certaines) de 
l'applicaiton. Ce fichier n'est donc pas à commiter.

Vous pouvez partir de ce template pour créer le fichier :

```properties
PORT=3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GOOGLE_ALLOWED_MAILS={ "mails": ["mathieu.breton@js-republic.com"]}
COOKIE_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

`PORT` représente le port sur lequel le serveur web va démarrer. La valeur des variables `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` et `GOOGLE_CALLBACK_URL`
sont à retrouver depuis la configuration de la console Google API (https://console.cloud.google.com/apis/credentials/oauthclient).
Ces valeurs sont nécessaires au fonctionement de l'authentification via un compte Google.

`GOOGLE_ALLOWED_MAILS` est un objet JSON avec une propriété *mails* qui contient la liste des emails autorisés à se connecter.
`COOKIE_SECRET` est une chaine de caracète secrète utilisée pour chiffrer le cookie.
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` sont les paramètres d'authorisation pour se connecter au compte AWS. 
`AWS_S3_BUCKET` est le nom du bucket S3 où les bannières seront stockées.
 

Une fois ce fichier dûment créé et remplit, on poursuivra les étapes habituelles :
```
yarn
yarn start
```

L'application devrait alors être visible sur `http://localhost:{PORT}`, la valeur du `PORT` 
étant celui définit dans le fichier `.env`. 

### Comment s'authentifier en local avec l'OAuth Google

L'OAuth Google pour fonctionner, renvoie sur une url publique (le fameux `GOOGLE_CALLBACK_URL`)
 accessible depuis les serveurs Google. Dés lors, il parait compliqué  de s'authentifier
depuis son poste local.

Pour autant, on peut utiliser un outil d'exposition DNS publique depuis sa machine de
développement, comme par exemple [Ngrok](https://ngrok.com/), [localtunnel](https://localtunnel.github.io/www/).

Si on choisit Ngrok, il suffit alors de lancer la commande qui suit dans un terminal séparé.

```
ngrok http {PORT}
```

![ngrok in action](/doc/ngrok.png)

Puis, ajouter les domaines autorisés sur la [console Google API](https://console.cloud.google.com/apis/credentials/oauthclient) pour autoriser l'url temporaire de Ngrok
(`https://42b1ca5d.ngrok.io` dans notre exemple).
Il faudra aussi mettre à jour la variable `GOOGLE_CALLBACK_URL` du fichier `.env` en conséquence.

Enfin, il ne reste plus qu'à ce rendre sur l'url Ngrok, `https://42b1ca5d.ngrok.io` dans notre exemple.

