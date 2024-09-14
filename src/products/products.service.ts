import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { v4 as uuid } from "uuid";
import { retry } from "rxjs";

@Injectable()
export class ProductsService {
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
    if (!createProductDto.productId) createProductDto.productId = uuid();
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter(
      (product) => product.productId === id
    )[0];
    if (!productFound) throw new NotFoundException();
    return productFound;
  }

  findByProvider(provider: string) {
    //This actions returns all products by provider
    const prouctFound = this.products.filter(
      (product) => product.provider === provider
    );
    if (prouctFound.length === 0) throw new NotFoundException();
    return prouctFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    this.products = this.products.map((product) => {
      if (product.productId === id) {
        product = { ...product, ...updateProductDto };
      }
      return product;
    });
    return { ...product, ...updateProductDto };
  }

  remove(id: string) {
    const { productId } = this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== id);
    return this.products;
  }
}
