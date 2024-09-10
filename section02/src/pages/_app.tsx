import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<header>헤더</header>
			<main>
				<Component {...pageProps} />;
			</main>
			<footer>푸터</footer>
		</div>
	);
}
