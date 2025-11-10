import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../entity/category.entity";
import { CategoriesService } from "../services/categories.service";
import { CategoriesController } from "../controllers/categories.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
    exports: [CategoriesService],
})
export class CategoriesModule {}