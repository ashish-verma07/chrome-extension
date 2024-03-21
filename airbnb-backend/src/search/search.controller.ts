import {
  Controller,
  Get,
  Post,
  // Body,
  Patch,
  Param,
  Delete,
  Body,
  // Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  create(@Body() body) {
    return this.searchService.create(body);
  }

  @Get()
  findAll() {
    return this.searchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(+id);
  }

  @Patch(':id')
  update() {
    return this.searchService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchService.remove(+id);
  }
}
