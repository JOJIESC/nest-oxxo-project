import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { v4 as uuid } from "uuid";
import { retry } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations: {
        provider: true,
      },
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOne({
      where: { productId: id },
      relations: {
        provider: true,
      },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(provider: string) {
    //This actions returns all products by provider
    return this.productRepository.findBy({
      provider: {
        providerId: provider,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });
    if (!productToUpdate) throw new NotFoundException();
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.productRepository.delete({ productId: id });
    return { message: `This action removed a #${id} product` };
  }
}
