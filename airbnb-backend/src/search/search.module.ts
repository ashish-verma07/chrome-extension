import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SearchSchema } from '../entities/search/search.schema';

@Module({
  imports: [SequelizeModule.forFeature([SearchSchema])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
