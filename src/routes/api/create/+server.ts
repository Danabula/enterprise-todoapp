import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.title) {
		return error(400, 'title is required.');
	} else if (typeof data.title !== 'string') {
		return error(400, 'title must be of type string.');
	}

	if (data.description) {
		if (typeof data.description !== 'string') {
			return error(400, 'description must be of type string.');
		}
	} else {
		data.description = null;
	}

	const result = await prisma.todo.create({
		data: {
			title: data.title,
			description: data.description
		}
	});
	return json(result);
};
