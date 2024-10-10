// Component
import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';

// Type
import { BookData } from '@/types';

// Util
import { delay } from '@/util/delay';

// Streaming
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
	await delay(1500);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
		{ cache: 'force-cache' },
	);

	if (!response.ok) return <div>오류가 발생했습니다...</div>;

	const books: BookData[] = await response.json();

	return (
		<div>
			{books && books.map(book => <BookItem key={book.id} {...book} />)}
			{!books.length && (
				<p>
					<span style={{ fontWeight: 'bold' }}>{q}</span> 에 대한 검색 결과가
					없습니다.
				</p>
			)}
		</div>
	);
}

export default function Page({
	searchParams,
}: {
	searchParams: {
		q?: string;
	};
}) {
	return (
		<Suspense
			fallback={<BookListSkeleton count={3} />}
			key={searchParams.q || ''}
		>
			<SearchResult q={searchParams.q || ''} />
		</Suspense>
	);
}
