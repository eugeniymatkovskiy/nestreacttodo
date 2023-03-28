import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import CreateUserDTO from 'src/auth/dto/create-user.dto';
import UserDTO from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import SignInDTO from './dto/sign-in.dto';
import JwtAuthenticationGuard from './jwt-auth.guard';
import { LocalAuthenticationGuard } from './local-auth.guard';
import RequestWithUser from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'User has been created',
    type: UserDTO,
  })
  @ApiInternalServerErrorResponse()
  async register(
    @Body() registrationData: CreateUserDTO,
    @Res() response: Response,
  ) {
    try {
      const createdUser = await this.authService.register(registrationData);

      response.setHeader(
        'Set-Cookie',
        this.authService.getCookieWithToken(createdUser.id),
      );

      createdUser.password = undefined;
      return response.send(createdUser);
    } catch (err) {
      throw new HttpException(
        "User wasn't created",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDTO })
  @UseGuards(LocalAuthenticationGuard)
  @ApiBadRequestResponse()
  async auth(
    @Req() request: RequestWithUser,
    @Body() signInData: SignInDTO,
    @Res() response: Response,
  ) {
    const { user } = request;

    response.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithToken(user.id),
    );

    user.password = undefined;
    return response.send(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({ type: UserDTO })
  async checkIfUserIsAuthenticated(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
