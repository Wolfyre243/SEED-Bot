//------------------------------Declare Variables------------------------------------
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits } = require('discord.js');

// const app = require('./app'); // Express server

const token = process.env.TOKEN;

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//---------------------------------Main Script----------------------------------------