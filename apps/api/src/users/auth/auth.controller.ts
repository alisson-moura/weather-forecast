import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UserProfileDto } from './dto/profile.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { User, UserPayload } from './user.decorator';

@ApiTags('Auth')
@Controller({
	version: '1',
	path: 'auth',
})
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@ApiOperation({
		summary: 'Realizar login',
		description: 'Endpoint para autenticação de usuário',
	})
	@ApiBody({
		type: LoginDto,
		description: 'Credenciais de login',
	})
	@ApiResponse({
		status: 201,
		description: 'Login realizado com sucesso',
		type: LoginResponseDto,
	})
	@ApiUnauthorizedResponse({
		description: 'Credenciais inválidas',
	})
	async login(@User() user: UserPayload): Promise<LoginResponseDto> {
		return this.authService.login(user);
	}

	@Get('profile')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Obter perfil do usuário',
		description: 'Endpoint para recuperar informações do perfil do usuário autenticado',
	})
	@ApiResponse({
		status: 200,
		description: 'Perfil do usuário recuperado com sucesso',
		type: UserProfileDto,
	})
	@ApiUnauthorizedResponse({
		description: 'Token de autenticação inválido ou expirado',
	})
	getProfile(@User() user: UserPayload): UserProfileDto {
		return user;
	}
}
