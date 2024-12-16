import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
	@ApiProperty({
		description: 'Nome do usuário',
		example: 'João Silva',
		minLength: 2,
		maxLength: 100,
	})
	@IsNotEmpty({ message: 'Nome não pode ser vazio' })
	@IsString({ message: 'Nome deve ser uma string' })
	@MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
	@MaxLength(100, { message: 'Nome não pode ter mais de 100 caracteres' })
	name: string;

	@ApiProperty({
		description: 'Endereço de e-mail do usuário',
		example: 'joao.silva@exemplo.com',
		format: 'email',
		maxLength: 255,
	})
	@IsNotEmpty({ message: 'E-mail não pode ser vazio' })
	@IsEmail({}, { message: 'Formato de e-mail inválido' })
	@MaxLength(255, { message: 'E-mail não pode ter mais de 255 caracteres' })
	email: string;

	@ApiProperty({
		description: 'Senha do usuário',
		example: 'senha123',
		minLength: 6,
		type: 'string',
		format: 'password',
	})
	@IsNotEmpty({ message: 'Senha não pode ser vazia' })
	@MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
	password: string;
}
