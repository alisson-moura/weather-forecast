import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async login(@Request() req: any): Promise<LoginResponseDto> {
		return this.authService.login(req.user);
	}

	@Get('profile')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('JWT-auth')
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getProfile(@Request() req: any): UserProfileDto {
		return req.user;
	}
}
