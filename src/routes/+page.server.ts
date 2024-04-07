import type { PageServerLoad } from './$types';
import type { todo } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/list');
	const todos: todo[] = await res.json();
	return { todos };
};
