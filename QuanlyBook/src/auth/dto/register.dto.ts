import { IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../../users/entity/user.entity";

export class RegisterDto {
    @ApiProperty({
        description: 'Username',
        example: 'username',
        minLength: 3,
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Password',
        example: 'password123',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}