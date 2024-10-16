// CSS
import style from './page.module.css';

// Navigate
import { notFound } from 'next/navigation';

// Components
import { ReviewEditor } from '@/components/review-editor';

// Types
import { BookData, ReviewData, Params, BookId } from '@/types';
import { Metadata } from 'next';

// Component
import ReviewItem from '@/components/review-item';

import Image from 'next/image';

export async function generateStaticParams() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const books: BookData[] = await response.json();

	return books.map(book => ({
		id: book.id.toString(),
	}));
}

// 도서 상세 정보
async function BookDetail({ bookId }: BookId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
		{ cache: 'force-cache' },
	);

	if (!response.ok) {
		if (response.status === 404) notFound();
		return <div>오류가 발생했습니다...</div>;
	}

	const book: BookData = await response.json();

	const { id, title, subTitle, description, author, publisher, coverImgUrl } =
		book;

	return (
		<section>
			<div
				className={style.cover_img_container}
				style={{ backgroundImage: `url('${coverImgUrl}')` }}
			>
				<Image
					src={coverImgUrl}
					width={240}
					height={300}
					alt={`도서 ${title}의 표지 이미지`}
				/>
			</div>
			<div className={style.title}>{title}</div>
			<div className={style.subTitle}>{subTitle}</div>
			<div className={style.author}>
				{author} | {publisher}
			</div>
			<div className={style.description}>{description}</div>
		</section>
	);
}

// 도서 리뷰 리스트
async function ReviewList({ bookId }: BookId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
		{ next: { tags: [`review-${bookId}`] } },
	);

	if (!response.ok) {
		throw new Error(`Review Fetch Failed : ${response.statusText}`);
	}

	const reviews: ReviewData[] = await response.json();

	return (
		<section>
			{reviews.map(review => (
				<ReviewItem key={`review-item-${review.id}`} {...review} />
			))}
		</section>
	);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`,
		{ cache: 'force-cache' },
	);

	if (!response.ok) throw new Error(response.statusText);

	const book: BookData = await response.json();

	return {
		title: `${book.title} - 위즈의 한입북스`,
		description: `${book.description}`,
		openGraph: {
			title: `${book.title} - 위즈의 한입북스`,
			description: `${book.description}`,
			images: [book.coverImgUrl],
		},
	};
}

// 도서 상세 페이지
export default async function Page({ params }: Params) {
	return (
		<div className={style.container}>
			<BookDetail bookId={params.id} />
			<ReviewEditor bookId={params.id} />
			<ReviewList bookId={params.id} />
		</div>
	);
}
