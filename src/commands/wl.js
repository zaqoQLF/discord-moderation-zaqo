require('discord-inline-reply')

module.exports = {
    name: 'wl2',
    description: 'Whitelist un utilisateur',
    execute(_whitelistUser, args) {
        const check = _init.emojis.cache.find(emoji => emoji.name === "check1");

        const validID = new Discord.MessageEmbed()
            .setFooter('Veuillez saisir un identifiant valide. (Ex: 825109446832554005)')
            .setColor('#2f3136')
        let id = []
        id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)
        function refreshWLIds() {
            id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)
        }
        if (id.includes(_whitelistUser.author.id)) {
            const alreadyID = new Discord.MessageEmbed()
                .setFooter("L'identifiant saisi est déjà dans la whitelist !")
                .setColor('#2f3136')
            if (_whitelistUser.channel.type != 'text') return;
            if (!args[0]) return _whitelistUser.lineReply(validID)
            if (!args[0].match(/[0-9]+/) || args[0].length != 18) return _whitelistUser.lineReply(validID)
            if (id.includes(args[0])) return _whitelistUser.lineReply(alreadyID)
            fs.appendFile('./ids', args[0] + '\n', function (err) {
                const successID = new Discord.MessageEmbed()
                    .setDescription(`L'utilisateur <@${args[0]}> a été ajouté à la **whitelist** avec succès ${check}`)
                    .setColor('#2f3136')
                if (err) throw err;
                _whitelistUser.lineReply(successID).then(message => { message.delete({ timeout: 5000 }) })
                con('[INFO] - New ID added to the whitelist')
                refreshWLIds()
            });
        }
    }
}