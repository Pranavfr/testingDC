require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Discord Bot is running!');
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
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
