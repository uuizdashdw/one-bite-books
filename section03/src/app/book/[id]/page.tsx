// CSS
import style from './page.module.css';

// Navigate
import { notFound } from 'next/navigation';

export function generateStaticParams() {
	return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// 도서 상세 정보
async function BookDetail({ bookId }: { bookId: string }) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
	);

	if (!response.ok) {
		if (response.status === 404) notFound();
		return <div>오류가 발생했습니다...</div>;
	}

	const book = await response.json();

	const { id, title, subTitle, description, author, publisher, coverImgUrl } =
		book;

	return (
		<section>
			<div
				className={style.cover_img_container}
				style={{ backgroundImage: `url('${coverImgUrl}')` }}
			>
				<img src={coverImgUrl} />
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

// 도시 리뷰 에디터
function ReviewEditor({ bookId }: { bookId: string }) {
	async function createReviewAction(formData: FormData) {
		'use server';

		const content = formData.get('content')?.toString();
		const author = formData.get('author')?.toString();

		if (!content || !author) return;

		// 도서 리뷰 추가 기능
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
				{
					method: 'POST',
					body: JSON.stringify({ content, author, bookId }),
				},
			);

			console.log(response.status);
		} catch (err) {
			console.error(err);
			return;
		}
	}

	return (
		<section>
			<form action={createReviewAction}>
				<input type="text" name="content" placeholder="리뷰 내용" required />
				<input type="text" name="author" placeholder="작성자" required />
				<button type="submit">작성하기</button>
			</form>
		</section>
	);
}

// 도서 상세 페이지
export default async function Page({ params }: { params: { id: string } }) {
	return (
		<div className={style.container}>
			<BookDetail bookId={params.id} />
			<ReviewEditor bookId={params.id} />
		</div>
	);
}
