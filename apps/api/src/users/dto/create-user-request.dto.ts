import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
	@IsNotEmpty({ message: 'Nome não pode ser vazio' })
	@IsString({ message: 'Nome deve ser uma string' })
	@MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
	@MaxLength(100, { message: 'Nome não pode ter mais de 100 caracteres' })
	name: string;

	@IsNotEmpty({ message: 'E-mail não pode ser vazio' })
	@IsEmail({}, { message: 'Formato de e-mail inválido' })
	@MaxLength(255, { message: 'E-mail não pode ter mais de 255 caracteres' })
	email: string;

	@IsNotEmpty({ message: 'Senha não pode ser vazia' })
	@MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
	password: string;
}
