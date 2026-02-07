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

// Debugging for Render
client.on('debug', info => console.log(`[DEBUG] ${info}`));
client.on('error', error => console.error(`[ERROR] ${error}`));

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'hi') {
        message.reply('hi');
    }
});

console.log('Attempting to log in...');
console.log(`Token check: ${process.env.DISCORD_TOKEN ? 'Token exists' : 'Token MISSING (Check Render Env Vars)'}`);

client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});
