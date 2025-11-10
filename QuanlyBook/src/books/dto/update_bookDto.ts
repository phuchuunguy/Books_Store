import { PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "./create_bookDto";

export class UpdateBookDto extends PartialType(CreateBookDto) {}