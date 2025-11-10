import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entity/category.entity";
import { UpdateCategoryDto } from "../dto/update_categoryDto";
import { CreateCategoryDto } from "../dto/create_categoryDto";
import { Repository } from "typeorm";

@Injectable() 
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private repo: Repository<Category>,
    ) {}

    create(dto: CreateCategoryDto) {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll() {
        return this.repo.find({ relations: ['books']});
    }

    async findOne(id: number) {
        const cat = await this.repo.findOne({where: {id}, relations: ['books']});
        if(!cat) throw new NotFoundException('Category not found');
        return cat;
    }

    async update(id: number, dto: UpdateCategoryDto) {
        const cat = await this.findOne(id);
        Object.assign(cat, dto);
        return this.repo.save(cat);
    }

    async remove(id: number) {
        const cat = await this.findOne(id);
        return this.repo.remove(cat);
    }
}