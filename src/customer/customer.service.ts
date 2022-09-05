import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerModel } from "./customer.model";
import { CustomerDTO } from "./customer.dto";

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(CustomerModel) private customer: Repository<CustomerModel>){

  }

  create(customer: CustomerDTO): Promise<CustomerModel>{
    return this.customer.save(customer);
  }

  findAll(): Promise<CustomerModel[]>{
    return this.customer.find();
  }

  findOne(id: string): Promise<CustomerModel>{
    return this.customer.findOneBy({id});
  }
}
