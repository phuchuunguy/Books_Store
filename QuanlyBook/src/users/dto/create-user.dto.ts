import { IsString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../entity/user.entity";

export class CreateUserDto {
    @ApiProperty({
        description: 'Username',
        example: 'admin_user',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Password',
        example: 'securePassword123',
        minLength: 6,
    })
    @IsString()
    password: string;

    @ApiPropertyOptional({
        description: 'User role',
        enum: UserRole,
        example: UserRole.ADMIN,
        default: UserRole.USER,
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
