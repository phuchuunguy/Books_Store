import { CategoriesService } from './../services/categories.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create_categoryDto";
import { UpdateCategoryDto } from "../dto/update_categoryDto";
import { JwtAuthGuard } from 'src/auth/gruards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gruards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @ApiOperation({summary: 'Create a new category'})
    @ApiResponse({
        status: 201,
        description: 'Category created successfully',
        schema: {
            example: {
                id: 1,
                name: 'Literature',
                description: 'Books about Vietnamese and world literature',
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @Post()
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @ApiOperation({summary: 'Get all categories'})
    @ApiResponse({
        status: 200,
        description: 'List of categories',
        schema: {
            example: [
                {
                    id: 1,
                    name: 'Literature',
                    description: 'Books about Vietnamese and world literature',
                },
                {
                    id: 2,
                    name: 'Science',
                    description: 'Books about natural sciences',
                },
            ],
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.categoriesService.findAll();
    }

    @ApiOperation({summary: 'Get a category by ID'})
    @ApiResponse({
        status: 200,
        description: 'Category information',
        schema: {
            example: {
                id: 1,
                name: 'Literature',
                description: 'Books about Vietnamese and world literature',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    @ApiOperation({summary: 'Update category information'})
    @ApiResponse({
        status: 200,
        description: 'Category updated successfully',
        schema: {
            example: {
                id: 1,
                name: 'Literature (Updated)',
                description: 'Books about Vietnamese and world literature',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @Put(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
        return this.categoriesService.update(id, dto);
    }

    @ApiOperation({summary: 'Delete a category'})
    @ApiResponse({
        status: 200,
        description: 'Category deleted successfully',
        schema: {
            example: {
                message: 'Category deleted successfully',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @Delete(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(id);
    }
}