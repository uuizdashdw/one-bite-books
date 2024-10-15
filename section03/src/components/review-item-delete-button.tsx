'use client';

// 서버 액션
import { deleteReviewAction } from '@/actions/delete-reivew.action';

// Hook
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
	reviewId,
	bookId,
}: {
	reviewId: number;
	bookId: number;
}) {
	const formRef = useRef<HTMLFormElement>(null);

	const [state, formAction, isPending] = useActionState(
		deleteReviewAction,
		null,
	);

	const deleteRiview = () => {
		if (confirm('정말 삭제하시겠습니까?')) {
			formRef.current?.requestSubmit();
		}
	};

	useEffect(() => {
		if (state && !state.status) {
			alert(state.error);
		}
	}, [state]);

	return (
		<form ref={formRef} action={formAction}>
			<input name="reviewId" defaultValue={reviewId} hidden />
			<input name="bookId" defaultValue={bookId} hidden />
			{isPending ? <div>...</div> : <div onClick={deleteRiview}>삭제하기</div>}
		</form>
	);
}
