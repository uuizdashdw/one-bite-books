// Type
import { ReactNode, Suspense } from 'react';

// Component
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Searchbar />
			</Suspense>
			{children}
		</div>
	);
}
