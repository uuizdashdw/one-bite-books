// Component
import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';

// Type
import { BookData } from '@/types';
import { Metadata } from 'next';

// Streaming
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
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

type Props = {
	searchParams: {
		q?: string;
	};
};

export function generateMetadata({ searchParams }: Props): Metadata {
	return {
		title: `${searchParams.q} : 위즈의 한입북스 검색 결과`,
		description: `${searchParams.q} 의 검색 결과입니다.`,
		openGraph: {
			title: `${searchParams.q} : 위즈의 한입북스 검색 결과`,
			description: `${searchParams.q} 의 검색 결과입니다.`,
			images: ['/thumbnail.png'],
		},
	};
}

export default function Page({ searchParams }: Props) {
	return (
		<Suspense
			fallback={<BookListSkeleton count={3} />}
			key={searchParams.q || ''}
		>
			<SearchResult q={searchParams.q || ''} />
		</Suspense>
	);
}
