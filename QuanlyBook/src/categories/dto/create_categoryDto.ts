import { IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Category name',
        example: 'Literature',
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: 'Category description',
        example: 'Books about Vietnamese and world literature',
    })
    @IsOptional()
    @IsString()
    description?: string
}