import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// Layout
import GlobalLayout from '@/components/layout/global-layout';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GlobalLayout>
			<Component {...pageProps} />
		</GlobalLayout>
	);
}
