const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
module.exports = {
  name: 'ban',
  description: 'Bannir un membre',
  usage: '[@member raison]',
  aliases: [''],
  example: 'ban @member raison',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // la commande commence ici
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setDescription("Vous n\'avez pas la permission d\'utiliser cette commande."))
    
    const member = message.mentions.members.first()
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setDescription("Veuillez mentionner le membre à bannir."))

    
    
    if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setDescription("Vous ne pouvez pas bannir le propiétaire du serveur."))

    
    
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setDescription("Vous ne pouvez pas bannir ce membre."))

    
    
    if (!member.bannable) return message.channel.send(new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setDescription("Le bot peux pas bannir ce membre."))

    
    const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
    member.ban({reason})
    message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription(`${member.user.tag} a été banni !`))

    // la commande finit ici
  },
};
