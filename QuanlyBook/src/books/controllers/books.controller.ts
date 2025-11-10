import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { BookService } from "../services/books.service";
import { CreateBookDto } from "../dto/create_bookDto";
import { UpdateBookDto } from "../dto/update_bookDto";
import { JwtAuthGuard } from "src/auth/gruards/jwt-auth.guard";
import { RolesGuard } from "src/auth/gruards/roles.guard";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService ) {}

    @ApiOperation({summary: 'Create a new book'})
    @ApiResponse({
        status: 201,
        description: 'Book created successfully',
        schema: {
            example: {
                id: 1,
                title: 'How to Win Friends and Influence People',
                author: 'Dale Carnegie',
                description: 'A book about the art of living and communicating with people',
                categoryId: 1,
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @Post()
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    create(@Body() dto: CreateBookDto) {
        return this.bookService.create(dto);
    }

    @ApiOperation({summary: 'Get all books'})
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Current page number', type: Number })
    @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of books per page', type: Number })
    @ApiResponse({
        status: 200,
        description: 'List of books',
        schema: {
            example: {
                data: [
                    {
                        id: 1,
                        title: 'How to Win Friends and Influence People',
                        author: 'Dale Carnegie',
                        description: 'A book about the art of living',
                        categoryId: 1,
                    },
                ],
                total: 10,
                page: 1,
                limit: 5,
                totalPages: 2,
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
        @Query('categoryId') categoryId?: number
    ) {
        return this.bookService.findAll(page, limit, categoryId);
    }

    @ApiOperation({summary: 'Get a book by ID'})
    @ApiResponse({
        status: 200,
        description: 'Book information',
        schema: {
            example: {
                id: 1,
                title: 'How to Win Friends and Influence People',
                author: 'Dale Carnegie',
                description: 'A book about the art of living and communicating with people',
                categoryId: 1,
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.findOne(id);
    }

    @ApiOperation({summary: 'Update book information'})
    @ApiResponse({
        status: 200,
        description: 'Book updated successfully',
        schema: {
            example: {
                id: 1,
                title: 'How to Win Friends and Influence People (Updated Edition)',
                author: 'Dale Carnegie',
                description: 'A book about the art of living and communicating with people',
                categoryId: 1,
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @Put(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
        return this.bookService.update(id, dto);
    }

    @ApiOperation({summary: 'Delete a book'})
    @ApiResponse({
        status: 200,
        description: 'Book deleted successfully',
        schema: {
            example: {
                message: 'Book deleted successfully',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @Delete(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.remove(id);
    }
}