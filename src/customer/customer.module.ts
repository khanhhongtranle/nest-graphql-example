import { forwardRef, Module } from "@nestjs/common";
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { InvoiceModule } from "../invoice/invoice.module";
import { InvoiceService } from "../invoice/invoice.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModel } from "./customer.model";

@Module({
  imports:[forwardRef(()=> InvoiceModule), TypeOrmModule.forFeature([CustomerModel])],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
