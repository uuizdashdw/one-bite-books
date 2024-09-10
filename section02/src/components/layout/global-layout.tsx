import { ReactNode } from 'react';
import Link from 'next/link';

// CSS
import styles from './global-layout.module.css'

export default function GlobalLayout({ 
	children 
}: { 
	children: ReactNode;
}) {
	return (
		<div className={styles.container}>
			<header>
				<Link href={'/'}>📚 One Bite Books</Link>
			</header>
			<main>{children}</main>
			<footer>제작 @uuizdashdw</footer>
		</div>
	);
}
 