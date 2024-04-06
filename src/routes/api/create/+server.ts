import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const result = await prisma.todo.create({
		data
	});
	return json(result);
};
