'use server';

// 특정 태그에 연결된 데이터 재검증
import { revalidateTag } from 'next/cache';

// Type
import { ReviewActionType } from '@/types';

export async function deleteReviewAction({ _, formData }: ReviewActionType) {
	const reviewId = formData.get('reviewId')?.toString();
	const bookId = formData.get('bookId')?.toString();

	if (!reviewId) {
		return {
			status: false,
			error: '삭제할 리뷰가 없습니다.',
		};
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
			{
				method: 'DELETE',
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
			error: `리뷰 삭제에 실패했습니다. : ${err}`,
		};
	}
}
