'use server';

// 특정 태그에 연결된 데이터 재검증
import { revalidateTag } from 'next/cache';

// Type
import { ReviewActionType } from '@/types';

export async function createReviewAction({ _, formData }: ReviewActionType) {
	const bookId = formData.get('bookId')?.toString();
	const content = formData.get('content')?.toString();
	const author = formData.get('author')?.toString();

	if (!content || !author || !bookId) {
		return {
			status: false,
			error: '리뷰 내용과 작성자를 입력해주세요',
		};
	}

	// 도서 리뷰 추가 기능
	try {
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

		revalidateTag(`review-${bookId}`);

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
