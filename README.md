
![Logo](https://i.ibb.co/2n8DV12/DISCORD-2.png)


# Discord Moderation

Un bot utilisant l'API `Discord.js` coder en `JavaScript`. Ce bot est optimisé pour les serveurs communautaires, ou a grande échelle permettant de gérer un traffic élevé de changement de permissions. Pour toutes questions n’hésitez pas a me dm sur **Discord** ou **Telegram**.





## Fonctionnalité disponible
* [x]  Commandes de modération basique (Ban, Kick, Mute,)
* [x]  Whitelist / Unwhitelist des commandes
* [x]  Blacklist / Unblacklist un utilisateur du serveur
* [x]  Attribution automatique d'un rôle (vérification avec réaction )
* [x]  Statistiques du serveur en temps réel (membre en vocal, totale d'utilisateur dans le serveur)
* [x]  Protection anti-raid (Uniquement les utilisateurs Whitelist pourront -> `Supprimer/créer des rôles | Supprimer/créer des rôles | Supprimer/créer des webhooks | Ajouter un bot` Si l'utilisateur n'est pas whitelist il se fera automatique ban du serveur.)
* [x]  Banwords (Supprime automatiquement les mots que vous choisirez) 
* [x]  BanLink (Supprime et ban l'utilisateur postant un lien de serveur)


###
![Logo](https://i.ibb.co/Pmnnfkr/installation.png)

## Installation

Afin de pouvoir faire fonctionner ce bot vous devrez installer les éléments suivants (Cliquez sur les liens ci-dessous pour être redirigé):
 - [NodeJS](https://nodejs.org/en/download/)
 - [Visual Studio Code (ou autre éditeur de code)](https://code.visualstudio.com/)


Une fois les prérequis installés vous allez devoir installer le dossier du Github.



- Exécuter cette commande dans votre terminal

```bash
git clone https://github.com/zaqoQLF/discord-moderation-zaqo.git
```

Une fois cela fait vous devrez vous rendre dans le dossier du bot. Vous y trouverez plusieurs fichiers tel que `.env`

Le fichier ressemble a peu près a ça:

- Fichier `.env`
```bash
_PREFIX=VOTRE PREFIX ICI
_TOKEN=VOTRE TOKEN ICI
_OWNERID=VOTRE ID ICI
_BANROLE=VOTRE ID ICI
```

Vous devrez ensuite le modifier avec vos propres coordonnées 
- Le prefix peut être n'importe quoi 
- Le token du bot s’obtient via votre developer portal (cliquez [ici](https://discord.com/developers/applications))
- Puis le OwnerID est l'identifiant du responsable du bot (la personne qui effectuera les modifications sur le bot)

Une fois ceci fait votre `.env` est maintenant configurer.

Pour la suite il vous faudra installer les modules. La commande est simple, il vous suffit d’exécuter ceci dans votre terminal:
```bash
npm i
````

Maintenant toute la configuration basique fonctionne. une fois cela fait il vous reste a setup les rôles des "staff" pour ban etc.
Pour faire bref le système de ban fonctionne comme ceci: Toute les personnes ayant la permission `ADMINISTRATEUR`peuvent utiliser la commande de Ban.
Et les staff aussi c'est pour ça que il vous faudra créer un rôle par exemple `Ban` que vous attriburez uniquement au personne que vous le souhaitez donc si vous voulez qu'uniquement les modérateurs puisse ban vous prennez l'id du 
rôle des modérateurs et ça permettera à toute les personnes possedant le rôle de pouvoir utiliser la commande de ban avec le bot.




###
![Logo](https://i.ibb.co/4WKKPsG/commands.png
)

## Commandes
Voici la liste entière des commandes disponibles (avec les descriptions).

``COMMANDES DE MODERATION :`` 

`ban` - Permets de ban un utilisateur du serveur \
`mute` - Permets de mute un utilisateur des salons textuels \
`kick` - Permet de kick un utilisateur du serveur \

``COMMANDES ADMINISTRATEUR :``

`purge` - Permet de supprimer un salon puis de le recréer instantanément\
`wl` - Permet de Whitelist un utilisateur (Uniquement le ownerID du bot peut le faire)\
`unwl` - Permet de remove un utilisateur de la Whitelist \
`bl` - Permet de blacklist un utilisateur du serveur \
`unbl` - Permet de remove un utilisateur de la blacklist \
`removeall [ROLE ID]` - Permet de retirer un rôle spécifié à tout les utilisateurs du serveur \
`addall [ROLE ID]` - Permet d'ajouter un rôle spécifique à tout les utilisateurs du serveur \
`lswl` - Permet d'afficher tout les utilisateurs whitelist \
`lsbl` - Permet d'afficher tout les utilisateurs blacklist \
`lsad` - Permet d'afficher tout les utilisateurs possédant la permission ADMINISTRATEUR \
`status` - Permet de changer le status du bot \
`stats` - Permet d'afficher les statistiques du serveur en temps réel (rafraîchissement toute les 10 sec)


``COMMANDES DIVERS :``

`snipe` - Permet d'afficher le dernier message supprimé \
`avatar` - Permet d'affichier l'avatar d'un utilisateur \

# Shield




## Support

Si vous avez des questions, n’hesitez pas, vous pouvez rejoindre mon Discord ci-dessous https://discord.gg/s42Equd97X .

