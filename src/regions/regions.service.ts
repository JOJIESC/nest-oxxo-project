import { Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./entities/region.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    const region = this.regionRepository.findOneBy({
      regionId: id,
    });
    if (!region) throw new NotFoundException();
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto,
    });
    return this.regionRepository.save(region);
  }

  remove(id: number) {
    return this.regionRepository.delete({ regionId: id });
  }
}
