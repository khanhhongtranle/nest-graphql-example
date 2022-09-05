import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CustomerService } from "../customer/customer.service";
import { InvoiceModel } from "./invoice.model";
import { CustomerModel } from "../customer/customer.model";
import { CreateInvoiceDTO } from "./invoice.dto";

@Resolver( of => InvoiceModel)
export class InvoiceResolver {
  constructor(@Inject(InvoiceService) private invoiceService: InvoiceService,
              @Inject(CustomerService) private customerService: CustomerService) {
  }

  @Query(() => InvoiceModel)
  async invoice(@Args('id') id: string){
    return await this.invoiceService.findOne(id);
  }

  @ResolveField(() => CustomerModel)
  async customer(@Parent() invoice){
    const { customer } = invoice;
    return await this.customerService.findOne(customer);
  }

  @Query(() => [InvoiceModel])
  async invoices(){
    return await this.invoiceService.findAll();
  }

  @Mutation(() => InvoiceModel)
  async createInvoice(@Args('invoice') invoice: CreateInvoiceDTO){
    return await this.invoiceService.create(invoice);
  }
}
