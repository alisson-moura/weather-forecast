import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserServices } from './users.service';

@ApiTags('Users')
@Controller({
	version: '1',
	path: 'users',
})
export class UsersController {
	constructor(private userServices: UserServices) {}

	@Post()
	@HttpCode(201)
	@ApiOperation({
		summary: 'Criar novo usuário',
		description: 'Endpoint para criação de um novo usuário',
	})
	@ApiCreatedResponse({
		description: 'Usuário criado com sucesso',
	})
	@ApiBadRequestResponse({
		description: 'Erro ao criar um novo usuário',
	})
	createUser(@Body() data: CreateUserRequestDto): Promise<void> {
		return this.userServices.create(data);
	}
}
