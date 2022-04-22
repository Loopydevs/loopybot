import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { buildPresence } from './presence.js'

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    activities: [
      {
        name: await buildPresence(),
      }
    ],
  })
});

const token = process.env.TOKEN;
client.login(token);
