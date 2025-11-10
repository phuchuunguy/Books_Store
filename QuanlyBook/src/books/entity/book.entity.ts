import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../categories/entity/category.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    author?: string;

    @Column({type: 'text', nullable: true})
    description?: string;

    @ManyToOne(() => Category, (category: Category) => category.books, { onDelete: "CASCADE" })
    @JoinColumn({name: 'categoryId'})
    category: Category;

    @Column({ nullable: true })
    categoryId?: number;
}


