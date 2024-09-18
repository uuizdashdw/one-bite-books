// Type
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		await res.revalidate('/');
		return res.json({ revalidate: true });
	} catch (reason) {
		res.status(500).send('Revalidation Failed');
	}
}
