import 'dotenv/config';
import { Bot } from './core/bot';

const bot: Bot = new Bot();

bot.login(process.env['TOKEN']!);
