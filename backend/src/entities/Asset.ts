import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { AssetType } from "../types/AssetType";

@Entity("assets")
export class Asset {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: AssetType })
  type: AssetType;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  value: number;

  @Column({ type: "date" })
  acquisitionDate: Date;

  @Column({ nullable: true })
  documentPath: string;

  @ManyToOne(() => User, user => user.assets)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}