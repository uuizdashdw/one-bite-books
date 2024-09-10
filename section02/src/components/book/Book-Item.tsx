// Type
import { BookData } from '@/types';

import Image from 'next/image';
import Link from 'next/link';

// CSS
import styles from './book-item.module.css';

export default function BookItem({
	id,
	title,
	subTitle,
	description,
	author,
	publisher,
	coverImgUrl,
}: BookData) {
	return (
		<Link href={`/book/${id}`} className={styles.container}>
			<Image src={coverImgUrl} alt={title} width={80} height={110} />

			<div>
				<div className={styles.title}>{title}</div>
				<div className={styles.subTitle}>{subTitle}</div>
				<br />
				<div className={styles.author}>
					{author} | {publisher}
				</div>
			</div>
		</Link>
	);
}
