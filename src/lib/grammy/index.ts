import { Bot } from "grammy";
import { logger } from "@/lib/utils/logger";
import 'dotenv/config'

const teleLogger = logger.child({ origin: "API Telegram" });

const bot = process.env.TELEBOT ? new Bot(process.env.TELEBOT) : null;

const receive = async () => {
    if (bot) {
        try {
            bot.start()
            // bot.command("start", async (ctx) => { teleLogger.info({ ctx }) });
            // bot.on("message", async (ctx) => {
            //     const message = ctx.message;
            //     teleLogger.info({ message })
            //     bot.api.sendMessage(ctx.chat.id, `Received: ${ctx.message.text}`) // the message object
            // });
        } catch (error) {
            teleLogger.error({ error })
        }
    }
}

receive()

export const sendTeleMessage = async ({ message }: { message: string }) => {
    if (!bot || !process.env.TELEUSER) return 'bot not initiated'
    teleLogger.info(typeof message)
    const res = await bot.api.sendMessage(process.env.TELEUSER, message)
}