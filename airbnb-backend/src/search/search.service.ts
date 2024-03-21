import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SearchSchema } from '../entities/search/search.schema';

// interface CreateData {
//   id: number;
//   search_key: string;
//   property_json: any[];
// }
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(SearchSchema) private searchModel: typeof SearchSchema,
  ) {}
  async create(data: any) {
    const x = await this.searchModel.create(data);
    return x;
  }

  async findAll() {
    const data = await this.searchModel.findAll({});
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update() {
    return `This action updates a user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
