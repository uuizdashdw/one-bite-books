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

// Head Module for Meta
import Head from 'next/head';

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
		<>
			<Head>
				<title>위즈의 한입북스</title>
				<meta property="og:image" content="/thumbnail.png" />
				<meta property="og:title" content="위즈의 한입북스" />
				<meta
					property="og:description"
					content="위즈의 한입 북스에 등록된 도서들을 만나보세요"
				/>
			</Head>
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
		</>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
