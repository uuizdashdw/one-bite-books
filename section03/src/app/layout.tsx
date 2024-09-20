import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className={style.container}>
					<header>
						<Link href={'/'}>📚 WIZ&apos;s ONEBITE BOOKS</Link>
					</header>
					<main>{children}</main>
					<footer>제작 @ uuizdashdw</footer>
				</div>
			</body>
		</html>
	);
}
