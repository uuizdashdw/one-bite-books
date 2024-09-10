// Layout
import SearchableLayout from '@/components/layout/searchable-layout';

// Router
import { useRouter } from 'next/router';

// Type
import { ReactNode } from 'react';

// Mock Data
import books from '@/mock/books.json';

// Component
import BookItem from '@/components/book/Book-Item';

export default function Search() {
	return (
		<div>
			{books.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

Search.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
