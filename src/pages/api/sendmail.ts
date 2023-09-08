// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	type ZodString,
	z,
	ZodError,
	ZodObject,
} from "zod";
import 'dotenv/config'
const nodemailer = require("nodemailer")

import { pino } from "@/lib/utils/logger";
const emailLogger = pino.child({ origin: "API Email" });

const schema = z.object({
	name: z
		.string()
		.min(
			3,
			"Поле 'Имя' должно содержать от 3 до 40 символов"
		)
		.max(
			40,
			"Поле 'Имя' должно содержать от 3 до 40 символов"
		),
	email: z
		.string()
		.email("Неверный Email адрес")
		.nonempty("Поле 'Email' обязательно к заполнению"),
});


type Data = {
  name: string
}

let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.YAMAIL,
    pass: process.env.YAPASSWORD
  }
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
