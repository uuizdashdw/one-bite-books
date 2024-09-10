// CSS
import BookItem from '@/components/book/Book-Item';
import styles from './index.module.css';

// Layout
import SearchableLayout from '@/components/layout/searchable-layout';

// MockData
import books from '@/mock/books.json';

// Type
import { ReactNode } from 'react';

export default function Home() {
	return (
		<div className={styles.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				{books.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
			</section>
		</div>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
