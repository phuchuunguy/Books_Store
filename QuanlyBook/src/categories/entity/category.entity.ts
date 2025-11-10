import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from '../../books/entity/book.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany((): typeof Book => Book, (book: Book) => book.category, { cascade: true })
    books: Book[];
}