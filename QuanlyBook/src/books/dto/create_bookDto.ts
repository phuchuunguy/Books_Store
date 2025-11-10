import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({
        description: 'Book title',
        example: 'How to Win Friends and Influence People',
    })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Author name',
        example: 'Dale Carnegie',
    })
    @IsOptional()
    @IsString()
    author?: string;

    @ApiPropertyOptional({
        description: 'Book description',
        example: 'A book about the art of living and communicating with people',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Category ID',
        example: 1,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    categoryId: number;
}