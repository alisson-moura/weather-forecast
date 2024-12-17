import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Injectable()
export class FavoritesService {
	constructor(private readonly prisma: PrismaService) {}
	async addFavorite(userId: number, favorite: Prisma.CityCreateInput) {
		let city = await this.prisma.city.findUnique({
			where: {
				name_state: {
					name: favorite.name,
					state: favorite.state,
				},
			},
		});
		if (city == null) {
			city = await this.prisma.city.create({
				data: favorite,
			});
		}
		return this.prisma.favorite.upsert({
			where: {
				userId_cityId: {
					cityId: city.id,
					userId: userId,
				},
			},
			create: {
				userId,
				cityId: city.id,
			},
			update: {
				cityId: city.id,
				userId,
			},
		});
	}

	async removeFavorite(userId: number, cityId: number) {
		return this.prisma.favorite.delete({
			where: {
				userId_cityId: {
					userId,
					cityId,
				},
			},
		});
	}

	async listFavorites(userId: number) {
		return this.prisma.favorite.findMany({
			where: { userId },
			select: {
				city: true,
				userId: true,
				cityId: true,
			},
		});
	}
}
