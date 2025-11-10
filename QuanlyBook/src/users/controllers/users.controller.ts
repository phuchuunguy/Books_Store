import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Res, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/gruards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gruards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({
    status: 200,
    description: 'List of users',
    schema: {
      example: [
        {
          id: 1,
          username: 'admin_user',
          role: 'admin',
        },
        {
          id: 2,
          username: 'john_doe',
          role: 'user',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @Get()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Get a user by ID'})
  @ApiResponse({
    status: 200,
    description: 'User information',
    schema: {
      example: {
        id: 1,
        username: 'admin_user',
        role: 'admin',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Access denied' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number, @Req()  req) {
    const user = req.user;
    if (user.role !== 'admin' && user.sub !== +id)
      return {messgae: 'Access denied'};
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary: 'Update user information'})
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        id: 1,
        username: 'admin_user_updated',
        role: 'admin',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @Put(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: 'Delete a user'})
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      example: {
        message: 'User deleted successfully',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
