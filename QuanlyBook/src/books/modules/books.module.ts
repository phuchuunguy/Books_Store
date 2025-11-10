import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../entity/book.entity";
import { CategoriesModule } from "../../categories/modules/categories.module";
import { BookService } from "../services/books.service";
import { BookController } from "../controllers/books.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Book]), CategoriesModule],
    providers: [BookService],
    controllers: [BookController],
})
export class BooksModule {}