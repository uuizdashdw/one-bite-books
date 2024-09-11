import Image from 'next/image';

// CSS
import styles from './[id].module.css';

// Type
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

// API
import fetchOneBook from '@/lib/fetchOneBook';

export const getStaticPaths = () => {
	return {
		paths: [
			{ params: { id: '1' } },
			{ params: { id: '2' } },
			{ params: { id: '3' } },
		],
		fallback: false,
	};
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const id = context.params!.id;
	const book = await fetchOneBook(Number(id));

	return {
		props: {
			book,
		},
	};
};

export default function Page({
	book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	if (!book) return '문제가 발생했습니다. 다시 시도해주세요.';
	const { id, title, subTitle, description, author, publisher, coverImgUrl } =
		book;
	return (
		<div className={styles.container}>
			<div
				className={styles.cover_img_container}
				style={{ backgroundImage: `url('${coverImgUrl}')` }}
			>
				<Image src={coverImgUrl} alt={title} width={275} height={350}></Image>
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.subTitle}>{subTitle}</div>
			<div className={styles.author}>
				{author} | {publisher}
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	);
}
