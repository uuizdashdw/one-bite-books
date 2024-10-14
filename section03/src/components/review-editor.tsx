'use client';

// CSS
import styles from './review-editor.module.css';

// Server Action
import { createReviewAction } from '@/actions/create-review.action';

import { useActionState } from 'react';

// 도시 리뷰 에디터
export function ReviewEditor({ bookId }: { bookId: string }) {
	const [state, formAction, isPending] = useActionState(
		createReviewAction,
		null,
	);
	return (
		<section>
			<form action={formAction} className={styles.form_container}>
				<input name="bookId" defaultValue={bookId} hidden />
				<textarea
					disabled={isPending}
					name="content"
					placeholder="리뷰 내용"
					required
				/>
				<div className={styles.submit_container}>
					<input
						disabled={isPending}
						type="text"
						name="author"
						placeholder="작성자"
						required
					/>
					<button disabled={isPending} type="submit">
						{isPending ? '제출중' : '작성하기'}
					</button>
				</div>
			</form>
		</section>
	);
}
