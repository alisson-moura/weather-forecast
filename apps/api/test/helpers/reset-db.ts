import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
	await prisma.$transaction([
		prisma.favorite.deleteMany(),
		prisma.city.deleteMany(),
		prisma.user.deleteMany(),
	]);
};
