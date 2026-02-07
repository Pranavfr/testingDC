require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Use this confirmation to verify if Render is blocked or not.');
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'hi') {
        message.reply('hi');
    }
});

client.login(process.env.DISCORD_TOKEN);
