import { BookData } from '@/types';

export default async function fetchOneBook(
	id: number,
): Promise<BookData | null> {
	const url = `https://onebite-books-server-main-red.vercel.app/book/${id}`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error();

		return response.json();
	} catch (reason) {
		console.error(reason);
		return null;
	}
}
