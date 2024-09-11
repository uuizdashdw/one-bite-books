// Layout
import SearchableLayout from '@/components/layout/searchable-layout';

// Router
import { useRouter } from 'next/router';

// Type & Hooks
import { ReactNode, useEffect, useState } from 'react';
import { BookData } from '@/types';

// Component
import BookItem from '@/components/book/Book-Item';

// API
import fetchBooks from '@/lib/fetchBooks';

export default function Search() {
	const [books, setBooks] = useState<BookData[]>([]);

	const router = useRouter();
	const q = router.query.q;

	const fetchSearchResult = async () => {
		const result = await fetchBooks(q as string);
		setBooks(result);
	};

	useEffect(() => {
		if (q) fetchSearchResult();
	}, [q]);

	return (
		<div>
			{books.map(book => (
				<BookItem key={book.id} {...book} />
			))}
			{!books.length && (
				<p style={{ textAlign: 'center', marginTop: '100px' }}>
					검색 결과가 없습니다.
				</p>
			)}
		</div>
	);
}

Search.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
