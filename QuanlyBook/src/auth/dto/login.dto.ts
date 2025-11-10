import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'Username',
        example: 'username',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Password',
        example: 'password123',
    })
    @IsString()
    password: string;
}