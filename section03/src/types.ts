export interface BookData {
	id: number;
	title: string;
	subTitle: string;
	author: string;
	publisher: string;
	description: string;
	coverImgUrl: string;
}

export interface ReviewData {
	id: number;
	content: string;
	author: string;
	createdAt: string;
	bookId: number;
}

export interface ErrorType {
	error: Error;
	reset: () => void;
}

import { ReactNode } from 'react';
export interface RootLayoutType {
	children: ReactNode;
	modal: ReactNode;
}

export interface ChildrenType {
	children: ReactNode;
}

export interface ReviewActionType {
	_: null;
	formData: FormData;
}

export interface ReviewDeleteType {
	reviewId: number;
	bookId: number;
}

export interface Params {
	params: {
		id: string;
	};
}

export interface BookId {
	bookId: string;
}

export interface BookPagePropsType {
	params: {
		id: string;
	};
	searchParams: {};
}

export interface QueryType {
	q: string;
}
