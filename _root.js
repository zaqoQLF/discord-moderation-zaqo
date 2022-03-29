
//discord.js@12.5.3
Discord = require('discord.js');
_init = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
})
auth = require("./_auth.json");
require('dotenv').config();
_token = process.env._TOKEN;
_prefix = process.env._PREFIX;
con = console.log;
_init.login(_token);
snipes = new Discord.Collection()
_banRole = '951541108373061642'
whitelist = require('./whitelist.json');
fs = require('fs');
authorized = ["825109446832554005"]
require('discord-inline-reply')


_init.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    _init.commands.set(command.name, command);
}

_init.on('message', _commandCheck => {
    if(!_commandCheck.content.startsWith(_prefix) || _commandCheck.author.bot) return;
    const args = _commandCheck.content.slice(_prefix.length).trim().split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if(!_init.commands.has(command)) return;
    try{
        _init.commands.get(command).execute(_commandCheck, args);
    }catch(error){
        console.log(error);
    }
})


let id = []
id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)
function refreshBotIds() {
    id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)
}

let bl = []
bl = fs.readFileSync("./blacklist", "utf8").split(/[\n\r]+/)
function refreshBotBL() {
    bl = fs.readFileSync("./blacklist", "utf8").split(/[\n\r]+/)
}

_init.on('ready', () => {
    //_init.user.setActivity("@userzaqo", { type: 'STREAMING', url: 'https://twitch.tv/binkszaqo'}).catch(console.error);
    //_init.user.setUsername('[+] Binkszaqo'); 
    con(`${_init.user.tag} $ connected !`)
})

_init.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = auth.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})

_init.on("message", async function (_statusBot) {
    const args = _statusBot.content.split(/ +/);
    switch (args[0]) {
        case `${_prefix}status`:
            if (!args[1]) return _statusBot.channel.send("1st Args")
            _init.user.setActivity(args[1], { type: `STREAMING`, url: 'https://twitch.tv/binkszaqo' }).catch(console.error);
            break;
        case `${_prefix}username`:
            if (!args[1]) return _statusBot.channel.send("1st args")
            _init.user.setUsername(args[1]).catch(err => con(err))
            const usernameEmbed = new Discord.MessageEmbed()
                .setFooter(`Le pseudo du bot a été changé avec succès: ` + args[1])
                .setColor('#2f3136')
            _statusBot.lineReply(usernameEmbed)
    };

})
_init.on("message", async function (_removeRole) {
    const args = _removeRole.content.split(/ +/);
    const check = _init.emojis.cache.find(emoji => emoji.name === "check1");
    const successRemovedEmbed = new Discord.MessageEmbed()
        .setDescription(`Le rôle <@&${args[1]}> a été retiré avec succès a tout les utilisateurs. ${check}`)
        .setColor('#2f3136')
    const _specifiedEmbed = new Discord.MessageEmbed()
        .setFooter('Veuillez spécifier un identifiant valide. (Ex: 825109446832554005)')
        .setColor('#2f3136')
    const _invalidEmbed = new Discord.MessageEmbed()
        .setFooter("L'identifiant saisi est invalide ou introuvable (Ex: 825109446832554005)")
        .setColor('#2f3136')
    switch (args[0]) {
        case `${_prefix}remove`:
            if (!args[1]) return _removeRole.channel.send(_specifiedEmbed)
            if (!args[1].match(/[0-9]+/) || args[1].length != 18) return _removeRole.channel.send(_invalidEmbed).then(message => { message.delete({ timeout: 4000 }) })
            const _roleID = _removeRole.guild.roles.cache.get(args[1]);
            _roleID.members.forEach((member, i) => {
                setTimeout(() => {
                    member.roles.remove(_roleID).catch(err => console.log(err));
                }, i * 1000);
            });
            _removeRole.lineReply(successRemovedEmbed)
            break;
    }
})


// WHITELIST COMMAND
_init.on('message', async function (_wlUser) {
    if (id.includes(_wlUser.author.id)) {
        const _argument = _wlUser.content.split(/ +/);
        if (_wlUser.content.startsWith(`${_prefix}stats`)) {
            const check = _init.emojis.cache.find(emoji => emoji.name === "check1");
            const voiceChannels = _wlUser.guild.channels.cache.filter(c => c.type === 'voice');
            let count = 0;
            for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
            const _statEmbed = new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setAuthor(`${_wlUser.guild.name} -  Statistiques`)
                .setDescription(`**Boost** ➔ ${_wlUser.guild.premiumSubscriptionCount} \n **Member(s)** ➔ ${_wlUser.guild.memberCount} \n **Vocal(s)** ➔ ${count} `)
            _wlUser.lineReply(_statEmbed)
        }
        const check = _init.emojis.cache.find(emoji => emoji.name === "check1");
        switch (_argument[0]) {
            case `${_prefix}bl`:
                const blacklistMissingEmbed = new Discord.MessageEmbed()
                    .setFooter('Veuillez saisir un identifiant. (Ex: 825109446832554005)')
                    .setColor('#2f3136')
                const blacklistNotMatching = new Discord.MessageEmbed()
                    .setFooter("L'identifiant saisi est introuvable. (Ex: 825109446832554005)")
                    .setColor('#2f3136')
                const blacklistIDAlready = new Discord.MessageEmbed()
                    .setFooter("L'utilisateur est déjà dans la blacklist")
                    .setColor('#2f3136')
                const impossibleToBan = new Discord.MessageEmbed()
                    .setFooter(`Impossible de blacklist cet utilisateur`)
                    .setColor('#2f3136')
                const notInGuild = new Discord.MessageEmbed()
                    .setFooter(`Cet utilisateur n'est pas dans le serveur`)
                    .setColor('#2f3136')
                if (_wlUser.channel.type != "text") return;
                if (!process.env._OWNERID.includes(_wlUser.author.id)) return;
                if (!_argument[1]) return _wlUser.lineReply(blacklistMissingEmbed)
                if (!_argument[1].match(/[0-9]+/) || _argument[1].length != 18) return _wlUser.lineReply(blacklistNotMatching).then(message => { message.delete({ timeout: 4000 }) })
                if (bl.includes(_argument[1])) return _wlUser.lineReply(blacklistIDAlready).then(message => { message.delete({ timeout: 4000 }) })
                let _userToBan = _wlUser.guild.members.cache.get(_argument[1])
                if (!_userToBan) return _wlUser.lineReply(notInGuild)
                if (_userToBan === _wlUser.member) return _wlUser.lineReply("YOURSELF")
                if (!_userToBan.bannable) return _wlUser.lineReply(impossibleToBan)
                try {
                    _userToBan.ban({ reason: 'Utilisateur Blacklist' }).catch(err => {
                        con('ERROR', err)
                    })
                    fs.appendFile('./blacklist', _argument[1] + '\n', function (err) {
                        if (err) throw err;
                        _wlUser.lineReply(`L'utilisateur <@${_argument[1]}> a été **blacklist** avec succès ${check}`)
                        refreshBotBL()
                    })
                } catch (e) {
                    return con(e.message)
                }
                break;
            case `${_prefix}unbl`:
                const unblNotMatching = new Discord.MessageEmbed()
                    .setFooter("L'identifiant saisi est introuvable. (Ex: 825109446832554005)")
                    .setColor('#2f3136')
                const unblMissingEmbed = new Discord.MessageEmbed()
                    .setFooter('Veuillez saisir un identifiant. (Ex: 825109446832554005)')
                    .setColor('#2f3136')
                const unblNotInBL = new Discord.MessageEmbed()
                    .setFooter("L'utilisateur n'est pas dans la blacklist")
                    .setColor('#2f3136')
                if (_wlUser.channel.type != "text") return;
                if (!process.env._OWNERID.includes(_wlUser.author.id)) return;
                if (!_argument[1]) return _wlUser.lineReply(unblMissingEmbed)
                if (!_argument[1].match(/[0-9]+/) || _argument[1].length != 18) return _wlUser.lineReply(unblNotMatching).then(message => { message.delete({ timeout: 4000 }) })
                if (!bl.includes(_argument[1])) return _wlUser.lineReply(unblNotInBL).then(message => { message.delete({ timeout: 4000 }) })
                try {
                    _wlUser.guild.members.unban(_argument[1]).then(() => _wlUser.channel.send('CHECK'))
                    fs.readFile('./blacklist', 'utf8', (err, data) => {
                        if (err) throw err;
                        const sansID = data.replace(_argument[1], '');
                        fs.writeFile('./blacklist', sansID, (err) => {
                            if (err) throw err;
                            const successID1 = new Discord.MessageEmbed()
                                .setDescription(`L'utilisateur <@${_argument[1]}> a été retiré de la **blacklist** avec succès ${check}`)
                                .setColor('#2f3136')
                            _wlUser.lineReply(successID1).then(message => { message.delete({ timeout: 5000 }) })
                            refreshBotBL()
                        });
                    });
                } catch (e) {
                    return con(e.message)
                }
                break;
            case `${_prefix}ls`:
                if (_wlUser.channel.type != "text") return;
                if (!authorized.includes(_wlUser.author.id)) return;
                if (!_argument[1]) return _wlUser.channel.send("SPEC 2")
                let _roleToDisplay = _wlUser.guild.members.cache.filter(member => {
                    return member.roles.cache.find(r => r.id === `${_argument[1]}`)
                }).map(member => {
                    return member.user.id;
                })
                const lsEmbed = new Discord.MessageEmbed()
                    .setAuthor(``)
                    .setDescription(`**Utilisateurs ayant le rôle <@&${_argument[1]}>**` + `\r\r` + _roleToDisplay.map(m => `\`${m}\`` + "・" + "<@" + m + ">").join('\n'))
                    .setFooter(_roleToDisplay.length + ` utilisateur(s) possèdent le rôles <@${_argument[1]}>.`)
                    .setColor('#2f3136')
                _wlUser.lineReply(lsEmbed)
                con(_argument[1])
                break;
            case `${_prefix}lswl`:
                id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)
                const wlembed = new Discord.MessageEmbed()
                    .setAuthor("Utilisateur(s) whitelist :")
                    .setDescription(id.map(m => `\`${m}\`` + "・" + "<@" + m + ">").join('\n'))
                    .setFooter(wl.size)
                    .setColor('#FFFFFF')
                _wlUser.channel.send(wlembed)
        }
    }
})

// ADMINISTRATOR COMMAND => HAUT STAFF 
_init.on("message", async function(_adminCMD) {
    if(_adminCMD.member.hasPermission('ADMINISTRATOR')){
        const _argument = _adminCMD.content.split(/ +/);
        switch(_argument[0]){
            case `${_prefix}lsad`:
            let membersWithRole = _adminCMD.guild.members.cache.filter(member => {
                return member.hasPermission('ADMINISTRATOR')
            }).map(member => {
                return member.user.id;
            })
            const lsadEmbed = new Discord.MessageEmbed()
                .setAuthor('Utilisateurs ayant la permission administrateurs')
                .setDescription(membersWithRole.map(m => `\`${m}\`` + "・" + "<@" + m + ">").join('\n'))
                .setFooter(membersWithRole.length + ` utilisateur(s) possèdent la permission administrateur.`)
                .setColor('#2f3136')
            _adminCMD.lineReply(lsadEmbed)
            break;
            case `${_prefix}celar`:
        }
    }
})

_init.on("guildMemberAdd", member => {
    if (bl.includes(member.id)) {
        con('YES')
    }
})

_init.on("message", async function (message) {
    const check = _init.emojis.cache.find(emoji => emoji.name === "check1");
    const validID = new Discord.MessageEmbed()
        .setFooter('Veuillez saisir un identifiant valide. (Ex: 825109446832554005)')
        .setColor('#2f3136')
    const alreadyID = new Discord.MessageEmbed()
        .setFooter("L'identifiant saisi est déjà dans la whitelist !")
        .setColor('#2f3136')
    const args = message.content.split(/ +/);
    switch (args[0]) {
        case `${_prefix}wl`:
            if (message.channel.type != "text") return;
            if (!authorized.includes(message.author.id)) return;
            if (!args[1]) return message.lineReply(validID).then(message => { message.delete({ timeout: 4000 }) })
            if (!args[1].match(/[0-9]+/) || args[1].length != 18) return message.lineReply(validID).then(message => { message.delete({ timeout: 4000 }) })
            if (id.includes(args[1])) return message.lineReply(alreadyID).then(message => { message.delete({ timeout: 4000 }) })
            fs.appendFile('./ids', args[1] + '\n', function (err) {
                const successID = new Discord.MessageEmbed()
                    .setDescription(`L'utilisateur <@${args[1]}> a été ajouté à la **whitelist** avec succès ${check}`)
                    .setColor('#2f3136')
                if (err) throw err;
                message.lineReply(successID).then(message => { message.delete({ timeout: 5000 }) })
                con('[INFO] - New ID added to the whitelist')
                refreshBotIds()
            });
            break;
        case `${_prefix}unwl`:
            const check = _init.emojis.cache.find(emoji => emoji.name === "check1");
            const validID1 = new Discord.MessageEmbed()
                .setFooter('Veuillez saisir un identifiant valide. (Ex: 825109446832554005)')
                .setColor('#2f3136')
            const alreadyID1 = new Discord.MessageEmbed()
                .setFooter("L'identifiant saisi est déjà dans la whitelist !")
                .setColor('#2f3136')
            if (message.channel.type != "text") return;
            if (!authorized.includes(message.author.id)) return;
            if (!args[1]) return message.lineReply(validID1).then(message => { message.delete({ timeout: 4000 }) })
            if (!args[1].match(/[0-9]+/) || args[1].length != 18) return message.lineReply(validID).then(message => { message.delete({ timeout: 4000 }) })
            if (id.includes(args[1])) return message.lineReply(alreadyID1).then(message => { message.delete({ timeout: 4000 }) })
            fs.readFile('./ids', 'utf8', (err, data) => {
                if (err) throw err;
                const sansID = data.replace(args[1], '');
                fs.writeFile('./ids', sansID, (err) => {
                    if (err) throw err;
                    const successID1 = new Discord.MessageEmbed()
                        .setDescription(`L'utilisateur <@${args[1]}> a été ajouté à la **whitelist** avec succès ${check}`)
                        .setColor('#2f3136')
                    message.lineReply(successID1).then(message => { message.delete({ timeout: 5000 }) })
                    refreshBotIds()
                });
            });
            break;
    }
});

_init.on('messageDelete', message => {
    snipes.set(message.channel.id, message)
})

_init.on('message', async (_adminCMD) => {
    if (id.includes(_adminCMD.author.id)) {
        // SNIPE COMMMAND
        if (_adminCMD.content.startsWith(`${_prefix}snipe`)) {
            let snipe = snipes.get(_adminCMD.channel.id)
            if (!snipe) { return; }
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${snipe.author.tag}`, snipe.author.displayAvatarURL())
                .setDescription(snipe.content)
                .setFooter(`${_prefix}snipe`)
                .setTimestamp()
                .setColor('FFFFFF')
            _adminCMD.lineReply(embed);
        }
        // PURGE CHANNEL COMMANDE (RECREATE)
        if (_adminCMD.content.startsWith(`${_prefix}purge`)) {
            const check = _init.emojis.cache.find(emoji => emoji.name === "check1");
            _adminCMD.channel.clone().then
                ((ch) => {
                    ch.setParent(_adminCMD.channel.parent);
                    ch.setPosition(_adminCMD.channel.position);
                    _adminCMD.channel.delete().catch(err => console.log(err));
                    ch.send(`Le salon ${ch} a été recrée avec **succès** ${check}`)
                });
        }

        if (_adminCMD.content.startsWith(`${_prefix}unban`)){
            let userID = args[0]
            _adminCMD.guild.fetchBans().then(bans => {
            if (bans.size == 0) return
            let bUser = bans.find(b = b.user.id == userID)
            if (!bUser) return
            _adminCMD.guild.members.unban(bUser.user)
        })
        } 
    }
})

_init.on('message', async (_staffCMD) => {
    if (_staffCMD.member.roles.cache.some(role => role.id === `${_banRole}`)) {
        if (!_staffCMD.guild) return;
        if (_staffCMD.content.startsWith(`${_prefix}ban`)) {
            let args = _staffCMD.content.trim().split(/ +/g)

            let User = await _staffCMD.mentions.members.first() || _staffCMD.guild.members.cache.get(args[0]) || _staffCMD.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || _staffCMD.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || _staffCMD.member;
            let banReason = args.join(" ").slice(23)
            if (!banReason) {
                banReason = 'Aucune raison.'
            }

            if (!User) return _staffCMD.channel.send('provide a valid user')
            User.ban(banReason).catch(e => {
                console.log(e)
                _staffCMD.channel.send("Une erreur.")
            })

            await _staffCMD.channel.send(User.user.username + " successfully banned | **" + banReason).catch(e => {
                console.log(e)
                _staffCMD.channel.send("There was an unexpected error: ```\n" + e + "\n```")
            })
        }
    }
})

_init.on('message', (_verification) => {
    if (!process.env._OWNERID.includes(_verification.author.id)) return;
    if (_verification.content.startsWith(`${_prefix}verif`)) {
        let _verifEmbed = new Discord.MessageEmbed()
            .setFooter(`${_banRole}`)
        _verification.channel.send(_verifEmbed);
    }
})

