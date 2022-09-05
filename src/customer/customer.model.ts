import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceModel } from "../invoice/invoice.model";

@ObjectType()
@Entity()
export class CustomerModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({length: 500, nullable: false})
  name: string;

  @Field()
  @Column({type: 'text', nullable: false})
  email: string;

  @Field()
  @Column({type: 'varchar', length: 15})
  phone: string;

  @Field()
  @Column({type: 'text'})
  address: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(type => [InvoiceModel], {nullable: false})
  @OneToMany(type=> InvoiceModel , invoice => invoice.customer)
  invoices: InvoiceModel[];
}
