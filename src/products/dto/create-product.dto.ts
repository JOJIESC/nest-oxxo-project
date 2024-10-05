import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  isString,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto extends Product {
  @IsUUID("4")
  @IsOptional()
  productId: string;
  @IsString()
  @MaxLength(40)
  productName: string;
  @IsNumber()
  productPrice: number;
  @IsInt()
  countSeal: number;
  @IsObject()
  provider: Provider;
}
