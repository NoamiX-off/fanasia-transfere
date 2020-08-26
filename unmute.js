const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
module.exports = {
  name: 'unmute',
  description: 'Unmute un membre',
  usage: '[@member]',
  aliases: [''],
  example: 'unmute @member',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // la commande commence ici
    message.delete();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription(':x: Erreur, vous n\'avez pas la permission d\'unmute cet utilisateur'))
  

    const member = message.mentions.members.first()
    
    if (!member) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Veuillez mentionner le membre à unmute.'))
    if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription(':x: Erreur, vous ne pouvez pas unmute le priopriétaire du serveur'))
   

    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Vous ne pouvez pas unmute ce membre.'))

    if (!member.manageable) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Le bot ne peut pas unmute ce membre.'))
    
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Il n\'y a pas de muterole.'))
    else {
    member.roles.remove(muteRole)
    
    message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription(`${member} a été unmute !`))
    }


    // la commande finit ici
  },
};
