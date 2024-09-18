import Image from 'next/image';

// CSS
import styles from './[id].module.css';

// Type
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

// API
import fetchOneBook from '@/lib/fetchOneBook';
import { useRouter } from 'next/router';

// Head Module for Meta
import Head from 'next/head';

export const getStaticPaths = () => {
	return {
		paths: [
			{ params: { id: '1' } },
			{ params: { id: '2' } },
			{ params: { id: '3' } },
		],
		fallback: true,
	};
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const id = context.params!.id;
	const book = await fetchOneBook(Number(id));

	if (!book) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			book,
		},
	};
};

export default function Page({
	book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<>
				<Head>
					<title>위즈의 한입북스</title>
					<meta property="og:image" content="/thumbnail.png" />
					<meta property="og:title" content="위즈의 한입북스" />
					<meta
						property="og:description"
						content="위즈의 한입 북스에 등록된 도서들을 만나보세요"
					/>
				</Head>
				<div>로딩 중...</div>
			</>
		);
	}
	if (!book) return '문제가 발생했습니다. 다시 시도해주세요.';

	const { id, title, subTitle, description, author, publisher, coverImgUrl } =
		book;
	return (
		<>
			<Head>
				<title>위즈의 한입북스 | {title}</title>
				<meta property="og:image" content={coverImgUrl} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
			</Head>
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
		</>
	);
}
