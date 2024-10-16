// Intercepting Component
import BookPage from '@/app/book/[id]/page';

// Modal
import Modal from '@/components/modal';

// Type
import { BookPagePropsType } from '@/types';

export default function Page(props: BookPagePropsType) {
	return (
		<Modal>
			<BookPage {...props} />
		</Modal>
	);
}
