import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { SavedSearch } from './entities/search/search.schema';

interface Response {
  data: any;
  status: number;
}
@Injectable()
export class AppService {
  constructor() {} // @InjectModel(SavedSearch) private searchModel: typeof SavedSearch,
  async getHello(): Promise<Response> {
    // const data = await this.searchModel.findAll();
    return { data: 'HI', status: 200 };
  }
}
