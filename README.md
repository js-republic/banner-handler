Email banner handler
---

### Comment démarrer ?

Tout d'abord, il vous faudra créer un fichier `.env` à la racine du projet. 
Ce fichier va contenir toutes les variables d'environement (secrètes pour certaines) de 
l'applicaiton. Ce fichier n'est donc pas commité.

Vous pouvez partir de ce template pour créer le fichier :

```
PORT=3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GOOGLE_ALLOWED_USERS={"userIds":[111]}
```

`PORT` représente le port sur lequel le serveur web va démarrer. La valeur des variables `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` et `GOOGLE_CALLBACK_URL`
sont à retrouver depuis la configuration de la console Google API (https://console.cloud.google.com/apis/credentials/oauthclient).
Ces valeurs sont nécessaires au fonctionement de l'authentification via un compte Google.
Bien qu'obligatoire, `GOOGLE_ALLOWED_USERS` n'est pour l'instant pas encore vraiment utilisé. 

Une fois ce fichier dûment créé et remplit, on poursuivra les étapes habituelles :
```
yarn
yarn start
```

L'application devrait alors être visible sur `http://localhost:{PORT}`, la valeur du `PORT` 
étant celui définit dans le fichier `.env`. 

### Comment s'authentifier en local avec l'OAuth Google

L'OAuth Google pour fonctionner renvoie sur une url publique (le fameux `GOOGLE_CALLBACK_URL`)
 accessible depuis les serveurs Google. Dés lors, il parait compliqué  de s'authentifier
depuis son poste local.

Pour autant, on peut utiliser un outil d'exposition DNS publique depuis sa machine de
développement, comme par exemple [Ngrok](https://ngrok.com/), [localtunnel](https://localtunnel.github.io/www/).

Si on choisit Ngrok, il suffit alors de lancer la commande qui suit dans un terminal séparé.

```
ngrok http {PORT}
```

![ngrok in action](../doc/ngrok.png)

Puis, ajouter les domaines autorisés sur la [console Google API](https://console.cloud.google.com/apis/credentials/oauthclient) pour autoriser l'url temporaire de Ngrok
(`https://42b1ca5d.ngrok.io` dans notre exemple).
Il faudra aussi mettre à jour la variable `GOOGLE_CALLBACK_URL` du fichier `.env` en conséquence.

Enfin, il ne reste plus qu'à ce rendre sur l'url Ngrok, `https://42b1ca5d.ngrok.io` dans notre exemple.
