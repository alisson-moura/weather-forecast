import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
	@ApiProperty({
		description: 'ID do usuário',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'E-mail do usuário',
		example: 'usuario@exemplo.com',
	})
	email: string;
}
