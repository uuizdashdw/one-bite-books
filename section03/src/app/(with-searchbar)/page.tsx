// CSS
import style from './page.module.css';

// Component
import BookItem from '@/components/book-item';

// Type
import { BookData } from '@/types';
import { Metadata } from 'next';

// 추천 도서 컴포넌트
async function RecoBooks() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
		{ next: { revalidate: 3 } },
	);

	if (!response.ok) return <div>오류가 발생했습니다...</div>;

	const recoBooks: BookData[] = await response.json();

	return (
		<div>
			{recoBooks.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

// 모든 도서 컴포넌트
async function AllBooks() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
		{ cache: 'force-cache' },
	);

	if (!response.ok) return <div>오류가 발생했습니다...</div>;

	const allBooks: BookData[] = await response.json();

	return (
		<div>
			{allBooks.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

export const metadata: Metadata = {
	title: '위즈의 한입 북스',
	description: '위즈의 한입 북스에 등록된 도서를 만나보세요!',
	openGraph: {
		title: '위즈의 한입 북스',
		description: '위즈의 한입 북스에 등록된 도서를 만나보세요!',
		images: ['/thumbnail.png'],
	},
};

export default function Home() {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				<RecoBooks />
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				<AllBooks />
			</section>
		</div>
	);
}
