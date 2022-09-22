import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("crop", { schema: "public" })
export class Crop extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: false })
  company: string;

  @Column({ nullable: false, unique: false })
  code: string;

  @Column({ nullable: false, unique: false })
  price: string;

  @Column({ nullable: false, unique: false })
  supplier: string;
}
