// CSS
import BookItem from '@/components/book/Book-Item';
import styles from './index.module.css';

// Layout
import SearchableLayout from '@/components/layout/searchable-layout';

// Type
import { ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';

// API
import fetchBooks from '@/lib/fetchBooks';
import fetchRandomBooks from '@/lib/fetchRandomBooks';

export const getStaticProps = async () => {
	const [allBooks, recommendBooks] = await Promise.all([
		fetchBooks(),
		fetchRandomBooks(),
	]);

	return {
		props: {
			allBooks,
			recommendBooks,
		},
	};
};

export default function Home({
	allBooks,
	recommendBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className={styles.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				{recommendBooks.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				{allBooks.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
		</div>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
