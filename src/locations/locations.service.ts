import { Injectable } from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Repository } from "typeorm";
import { Location } from "./entities/location.entity";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class LocationsService {
  constructor(private locationRepository: Repository<Location>) {}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    });
    if (!location) throw new NotFoundException();
    return location;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    return location;
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id });
  }
}