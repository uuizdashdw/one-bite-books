'use server';

import { revalidatePath } from 'next/cache';
import { delay } from '@/util/delay';

export async function createReviewAction(_: any, formData: FormData) {
	const bookId = formData.get('bookId')?.toString();
	const content = formData.get('content')?.toString();
	const author = formData.get('author')?.toString();

	console.log(bookId, content, author);
	if (!content || !author || !bookId) {
		return {
			status: false,
			error: '리뷰 내용과 작성자를 입력해주세요',
		};
	}

	// 도서 리뷰 추가 기능
	try {
		await delay(2000);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
			{
				method: 'POST',
				body: JSON.stringify({ content, author, bookId }),
			},
		);

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		revalidatePath(`review-${bookId}`);

		return {
			status: true,
			error: '',
		};
	} catch (err) {
		return {
			status: false,
			error: `리뷰 저장에 실패했습니다. :: ${err}`,
		};
	}
}
