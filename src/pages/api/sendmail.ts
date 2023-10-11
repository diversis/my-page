// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	type ZodString,
	z,
	ZodError,
	ZodObject,
} from "zod";
import 'dotenv/config'

import { logger } from "@/lib/utils/logger";
import { sendTeleMessage } from '@/lib/grammy';
import rateLimit from '@/lib/utils/rate-limit';

const nodemailer = require("nodemailer")


const emailLogger = logger.child({ origin: "API Email" });

const limiter = rateLimit({
	interval: 60 * 1000, // 60 seconds
	uniqueTokenPerInterval: 50, // Max 50 users per second
})


const schema = z.object({
	name: z
		.string()
		.min(3, "Name must include at least 3 characters")
		.max(50, "Name too long (50 characters max)"),
	email: z.string().email(),
	message: z
		.string()
		.min(3, "Message must include at least 3 characters")
		.max(1200, "Message too long (1200 characters max)"),
});


let transporter = nodemailer.createTransport({
	host: "smtp.yandex.ru",
	port: 465,
	secure: true,
	auth: {
		user: process.env.YAMAIL,
		pass: process.env.YAPASSWORD
	}
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			await limiter.check(res, 10, 'SEND_EMAIL')
			schema.parse(req.body)
			const { name, email, message } = req.body

			const botRes = sendTeleMessage({ message: `Received: \n ${message} \n from email: ${email}` })

			const info = await transporter.sendMail({
				from: process.env.YAMAIL, // sender address
				to: "angelnoxy@yandex.ru", // list of receivers
				subject: `My Page : ${email}`, // Subject line
				text: `${message} , from email: ${email}`, // plain text body
				html: `<div style='display:flex;flex-direction:column;gap:8px'><h1 style='font-size:1.3rem'>Received message</h1><span>from: ${email}</span><p style='margin-top:12px'>${message}</p></div>`, // html body
			});

			res.status(200).json(info)
		}
		catch (e: unknown) {
			if (e instanceof ZodError) {
				logger.info(e.errors);

				// logger.info([...Object.values(e.errors)]);
				res.status(400).json([...e.errors]);
			} else {
				logger.info(e);
				res.status(400).json(JSON.stringify(e));
			}

			return;
		}
	}
}
