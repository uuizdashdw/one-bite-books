// Component
import BookItem from '@/components/book-item';

// Type
import { BookData } from '@/types';

export default async function Page({
	searchParams,
}: {
	searchParams: {
		q?: string;
	};
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
		{ cache: 'force-cache' },
	);

	if (!response.ok) return <div>오류가 발생했습니다...</div>;

	const books: BookData[] = await response.json();

	return (
		<div>
			{books && books.map(book => <BookItem key={book.id} {...book} />)}
			{!books.length && (
				<p>
					<span style={{ fontWeight: 'bold' }}>{searchParams.q}</span> 에 대한
					검색 결과가 없습니다.
				</p>
			)}
		</div>
	);
}
