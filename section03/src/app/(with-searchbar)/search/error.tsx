'use client';

// Navaigation
import { useRouter } from 'next/navigation';

// Hook
import { startTransition, useEffect } from 'react';

// Type
import { ErrorType } from '@/types';

export default function Error({ error, reset }: ErrorType) {
	const router = useRouter();
	useEffect(() => {
		console.error(error.message);
	}, [error]);
	return (
		<div>
			<h3>검색 과정에서 오류가 발생했습니다</h3>
			<button
				onClick={() => {
					startTransition(() => {
						router.refresh();
						reset();
					});
				}}
			>
				다시 시도
			</button>
		</div>
	);
}
