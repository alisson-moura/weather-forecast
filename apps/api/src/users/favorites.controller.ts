import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from './auth/guards';
import { User, UserPayload } from './auth/user.decorator';
import { CreateCityDto, FavoriteCityResponseDto } from './dto/city.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
	version: '1',
	path: 'favorites',
})
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@Post()
	@ApiOperation({ summary: 'Adicionar uma cidade favorita' })
	@ApiResponse({ status: 201, description: 'Cidade adicionada como favorita.' })
	async addFavorite(@User() user: UserPayload, @Body() favorite: CreateCityDto) {
		return this.favoritesService.addFavorite(user.id, favorite);
	}

	@Delete(':cityId')
	@ApiOperation({ summary: 'Remover uma cidade favorita' })
	@ApiResponse({ status: 200, description: 'Cidade removida dos favoritos.' })
	async removeFavorite(@User() user: UserPayload, @Param('cityId', ParseIntPipe) cityId: number) {
		return this.favoritesService.removeFavorite(user.id, cityId);
	}

	@Get()
	@ApiOperation({ summary: 'Listar todas as cidades favoritas' })
	@ApiResponse({
		status: 200,
		description: 'Lista de cidades favoritas.',
		type: [FavoriteCityResponseDto],
	})
	async listFavorites(@User() user: UserPayload) {
		return this.favoritesService.listFavorites(user.id);
	}
}
