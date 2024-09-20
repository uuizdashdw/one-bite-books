// Mock Data
import books from '@/mock/books.json';

// Component
import BookItem from '@/components/book-item';

export default function Page({
	searchParams,
}: {
	searchParams: {
		q?: string;
	};
}) {
	return (
		<div>
			{books.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}
