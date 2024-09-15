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
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Product 1",
      productPrice: 100,
      countSeal: 10,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Product 2",
      productPrice: 200,
      countSeal: 20,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Product 3",
      productPrice: 300,
      countSeal: 30,
      provider: uuid(),
    },
  ];

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({ productId: id });
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(provider: string) {
    //This actions returns all products by provider
    const prouctFound = this.products.filter(
      (product) => product.provider === provider
    );
    if (prouctFound.length === 0) throw new NotFoundException();
    return prouctFound;
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
