// Type
import { ReactNode, Suspense } from 'react';

// Component
import Searchbar from '../../components/searchbar';

// Type
import { ChildrenType } from '@/types';

export default function Layout({ children }: ChildrenType) {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Searchbar />
			</Suspense>
			{children}
		</div>
	);
}
