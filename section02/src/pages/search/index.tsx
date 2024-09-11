// Layout
import SearchableLayout from '@/components/layout/searchable-layout';

// Router
import { useRouter } from 'next/router';

// Type
import { ReactNode } from 'react';

// Component
import BookItem from '@/components/book/Book-Item';

// Type
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetchBooks';

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const { q } = context.query;
	const books = await fetchBooks(q as string);
	return {
		props: {
			books,
		},
	};
};

export default function Search({
	books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
