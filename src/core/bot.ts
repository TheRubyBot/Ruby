import { PrismaClient } from '@prisma/client';
import { Client } from 'discord.js';

export class Bot {
    // Clients
    public client: Client = new Client({
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
    });
    public prisma: PrismaClient = new PrismaClient();

    constructor() {}

    public login(token: string): void {
        this.client.login(token);
    }
}
