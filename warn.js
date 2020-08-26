const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
const fs = require('fs')
module.exports = {
  name: 'warn',
  description: 'Donner un avertissement à un membre',
  usage: '[@member raison]',
  aliases: [''],
  example: 'warn @member insultes',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // la commande commence ici
    message.delete();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))
    
    const member = message.mentions.members.first()
    
    if (!member) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Veuillez mentionner le membre à warn.'))
    
    if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Vous ne pouvez pas warn le propriétaire du serveur.'))
    
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Vous ne pouvez pas warn ce membre.'))
    
    const reason = args.slice(1).join(' ')
    
    if (!reason) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Veuillez indiquer une raison.'))
    
    if (!client.db.warns[member.id]) client.db.warns[member.id] = []
    client.db.warns[member.id].unshift({
    reason,
    date: Date.now(),
    mod: message.author.id})
    fs.writeFileSync('./db.json', JSON.stringify(client.db))
    message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription(`${member} a été warn pour ${reason} !`))



    // la commande finit ici
  },
};
