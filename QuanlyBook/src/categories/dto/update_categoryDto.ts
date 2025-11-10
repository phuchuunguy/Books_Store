import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create_categoryDto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}