import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const time = new Date().toLocaleString();
	res.status(200).json({ time });
}
