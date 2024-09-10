import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// Layout
import GlobalLayout from '@/components/layout/global-layout';

// Types
import { ReactNode } from 'react';
import { NextPage } from 'next';
type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
	Component,
	pageProps,
}: AppProps & {
	Component: NextPageWithLayout;
}) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
