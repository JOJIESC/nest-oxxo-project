import { Injectable } from "@nestjs/common";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Provider } from "./entities/provider.entity";
import { Like } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>
  ) {}
  create(createProviderDto: CreateProviderDto) {
    return this.providersRepository.save(createProviderDto);
  }

  findAll() {
    return this.providersRepository.find({
      relations: {
        products: true,
      },
    });
  }

  async findOneByName(name: string) {
    const provider = await this.providersRepository.findBy({
      providerName: Like(`%${name}%`),
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  findOne(id: string) {
    return this.providersRepository.findOne({
      where: { providerId: id },
      relations: {
        products: true,
      },
    });
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providersRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });
    return this.providersRepository.save(product);
  }

  remove(id: string) {
    this.providersRepository.delete({
      providerId: id,
    });
    return {
      message: "Provider deleted",
    };
  }
}
