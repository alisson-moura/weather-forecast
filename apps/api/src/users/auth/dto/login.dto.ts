import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({
		description: 'E-mail do usuário',
		example: 'usuario@exemplo.com',
	})
	email: string;

	@ApiProperty({
		description: 'Senha do usuário',
		example: 'senha123',
	})
	password: string;
}

export class LoginResponseDto {
	@ApiProperty({
		description: 'Token de acesso JWT',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	})
	access_token: string;
}
