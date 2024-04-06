import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const POST: RequestHandler = async ({ params }) => {
	try {
		await prisma.todo.delete({
			where: {
				id: Number.parseInt(params.id)
			}
		});
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			if (e.code === 'P2025') {
				return error(404, `Todo with id ${params.id} doesn't exist.`);
			}
		}
		console.warn(e);
		return error(500, "Couln't delete todo, something went wrong");
	}
	return json({ success: true });
};
