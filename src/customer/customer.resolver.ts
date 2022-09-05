import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { InvoiceService } from "../invoice/invoice.service";
import { CustomerModel } from "./customer.model";
import { InvoiceModel } from "../invoice/invoice.model";

@Resolver(of => CustomerModel)
export class CustomerResolver {
  constructor(@Inject(CustomerService) private customerService: CustomerService,
              @Inject(InvoiceService) private invoiceService: InvoiceService) {
  }

  @Query(returns => CustomerModel)
  async customer(@Args('id') id: string ){
    return await this.customerService.findOne(id);
  }

  @ResolveField(returns => [InvoiceModel])
  async invoices(@Parent() customer){
    const { id } = customer;
    return await this.invoiceService.findByCustomer(id);
  }

  @Query(returns => [CustomerModel])
  async customers(){
    return this.customerService.findAll();
  }

  @Mutation(returns => CustomerModel)
  async createCustomer(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone', {nullable: false}) phone: string,
    @Args('address', {nullable: true}) address: string,
  ){
    return this.customerService.create({name, email, phone, address});
  }
}
