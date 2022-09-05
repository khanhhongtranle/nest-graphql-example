import { forwardRef, Module } from "@nestjs/common";
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { CustomerModule } from "../customer/customer.module";
import { CustomerService } from "../customer/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoiceModel } from "./invoice.model";

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceModel]), forwardRef(()=> CustomerModule)],
  providers: [InvoiceResolver, InvoiceService],
  exports: [InvoiceService]
})
export class InvoiceModule {}
