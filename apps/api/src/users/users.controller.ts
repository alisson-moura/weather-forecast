import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
	createUser(@Body() data: CreateUserRequestDto): Promise<void> {
		return this.userServices.create(data);
	}
}
