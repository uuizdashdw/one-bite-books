// Router
import { useRouter } from 'next/router';

// Hooks
import React, { ReactNode, useEffect, useState } from 'react';

// CSS
import styles from './searchable-layout.module.css';

export default function SearchableLayout({
	children,
}: {
	children: ReactNode;
}) {
	const [search, setSearch] = useState('');
	const router = useRouter();

	const q = router.query.q as string;

	useEffect(() => {
		setSearch(q || '');
	}, [q]);

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSubmit = () => {
		if (!search || q === search) return;
		router.push(`/search?q=${search}`);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	return (
		<div>
			<div className={styles.searchBar_container}>
				<input
					type="text"
					value={search}
					placeholder="검색어를 입력하세요..."
					onChange={onChangeSearch}
					onKeyDown={onKeyDown}
				/>
				<button onClick={onSubmit}>검색</button>
			</div>
			{children}
		</div>
	);
}
