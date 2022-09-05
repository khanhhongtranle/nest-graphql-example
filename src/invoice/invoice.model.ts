import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerModel } from "../customer/customer.model";

export enum PaymentStatus {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID'
}

export enum Currency {
  NGN = "NGN",
  USD = "USD",
  GBP = "GBP",
  EUR = "EUR"
}

@ObjectType()
export class Item {
  @Field()
  description: string;
  @Field()
  rate: number;
  @Field()
  quantity: number;
}


@ObjectType()
@Entity()
export class InvoiceModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({length: 500, nullable: false})
  invoiceNo: string;

  @Field()
  @Column({type: 'text'})
  description: string;

  @Field(type=> CustomerModel)
  @ManyToOne(type => CustomerModel, customer=> customer.invoices)
  customer: CustomerModel;

  @Field()
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.NOT_PAID,
  })
  paymentStatus: PaymentStatus;

  @Field()
  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @Field()
  @Column({type: 'decimal', precision: 10, scale: 2})
  taxRate: number;

  @Field()
  @Column()
  issueDate: string;

  @Field()
  @Column()
  dueDate: string;

  @Field()
  @Column()
  note: string;

  @Field(type => Item)
  @Column({
    type: 'json',
    array: false,
    nullable: false,
  })
  items: Item[];

  @Field()
  @Column({type: 'decimal', precision: 10, scale: 2})
  taxAmount: number;

  @Field()
  @Column({type: 'decimal', precision: 10, scale: 2})
  subTotal: number;

  @Field()
  @Column({type: 'decimal', precision: 10, scale: 2})
  total: number;

  @Field()
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2})
  amountPaid: number;

  @Field()
  @Column({type: 'decimal', precision: 10, scale: 2})
  outstandingBalance: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
