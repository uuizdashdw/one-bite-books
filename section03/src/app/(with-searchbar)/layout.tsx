// Type
import { ReactNode } from 'react';

// Component
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Searchbar />
			{children}
		</div>
	);
}
