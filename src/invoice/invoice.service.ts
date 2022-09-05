import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { InvoiceModel } from "./invoice.model";
import { Repository } from "typeorm";
import { CustomerService } from "../customer/customer.service";
import { CreateInvoiceDTO } from "./invoice.dto";
@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(InvoiceModel) private invoiceRepository: Repository<InvoiceModel>,
              private customerService: CustomerService){

  }

  async create(invoice: CreateInvoiceDTO) : Promise<InvoiceModel>{
    const customer = await this.customerService.findOne(invoice.customer);
    const subTotal = invoice.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2));
    }, 2);
    const taxAmount = subTotal * Number((invoice.taxRate / 100).toFixed(2));
    const total = subTotal + taxAmount;
    const outstandingBalance = total;
    return this.invoiceRepository.save({
      ...invoice,
      customer,
      subTotal,
      taxAmount,
      total,
      outstandingBalance
    } as any);
  }

  findAll(): Promise<InvoiceModel[]>{
    return this.invoiceRepository.find();
  }

  findOne(id: string): Promise<InvoiceModel>{
    return this.invoiceRepository.findOneBy({id: id});
  }

  findByCustomer(id: string): Promise<InvoiceModel[]>{
    return this.invoiceRepository.createQueryBuilder('invoice').where('invoice.customer = :id', {id}).getMany();
  }
}
