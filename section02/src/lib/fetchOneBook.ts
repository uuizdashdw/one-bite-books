import { BookData } from '@/types';

export default async function fetchOneBook(
	id: number,
): Promise<BookData | null> {
	const url = `http://localhost:12345/book/${id}`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error();

		return response.json();
	} catch (reason) {
		console.error(reason);
		return null;
	}
}
