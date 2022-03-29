module.exports = {
    name: 'ping',
    description: 'Ping Commande',
    execute(_PingStatus, args) {

        const loadingEmbed = new Discord.MessageEmbed()
            .setFooter('Chargement des données...')
            .setColor('#2f3137')
        _PingStatus.channel.send(loadingEmbed).then(async (msg) => {
            msg.delete()
            const LatencyEmbed = new Discord.MessageEmbed()
                .setFooter(`La latence du bot est actuellement de ${msg.createdTimestamp - _PingStatus.createdTimestamp}ms`)
                .setColor('#2f3137')
            _PingStatus.channel.send(LatencyEmbed)
        })
    }
}