'use client';

// CSS
import styles from './modal.module.css';

import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Navigation
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
			dialogRef.current?.scrollTo({
				top: 0,
			});
		}
	}, []);

	const modalHandle = (e: React.MouseEvent<HTMLDialogElement>) => {
		const target = e.target as HTMLElement;
		if (target.nodeName === 'DIALOG') {
			router.back();
		}
	};

	return createPortal(
		<dialog
			className={styles.modal}
			ref={dialogRef}
			onClick={modalHandle}
			onClose={() => router.back()}
		>
			{children}
		</dialog>,
		document.getElementById('modal-root') as HTMLElement,
	);
}
