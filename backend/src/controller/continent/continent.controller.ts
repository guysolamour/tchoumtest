import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateContinentDto } from 'src/dto/create-continent.dto';
import { UpdateContinentDto } from 'src/dto/update-continent.dto';

import { ContinentService } from 'src/service/continent/continent.service';
@Controller('api/continent')
export class ContinentController {
   constructor(private readonly continentService: ContinentService) { }

     

    @Post()
        async createContinent(@Res() response, @Body() createContinentDto: CreateContinentDto) {
        try {
            const newContinent = await this.continentService.createContinent(createContinentDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Continent has been created successfully',
                newContinent,}
        );
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Continent not created!',
            error: 'Bad Request'
        });
        }
    }

    @Put('/:id')
    async updateContinent(@Res() response,@Param('id') continentId: string, @Body() updateContinentDto: UpdateContinentDto) {
        try {
            const existingContinent = await this.continentService.updateContinent(continentId, updateContinentDto);
            return response.status(HttpStatus.OK).json({
                message: 'Continent has been successfully updated',
            existingContinent,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    // http://localhost:3000/countries?lang=fr&code=AF&word=afr
    @Get()
    async getContinents(@Res() response, @Query() query) {
        try {

           // const lang = query["lang"] || "" ;
            const lang = query["lang"] ? query["lang"].toLowerCase() : "english";
            const code = query["code"] ? query["code"].toUpperCase() : null;
            const word = query["word"] ? query["word"].toLowerCase() : null;

            console.log("getting continent");
            

            let continentData = await this.continentService.findAll(word, code, lang);

           // let continentData = await this.continentService.getAllContinents();

            if (lang){
                // filter by lang
            }

            if (code){
               // continentData = continentData.filter(continent => continent.code == code)
            }

            if (word){
               // ++continentData = continentData.filter(continent => continent.name.toLowerCase().includes(word))
            }


              //continentData = await this.continentService.getAllContinents();
            return response.status(HttpStatus.OK).json(continentData);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


    @Get('/:id')
    async getContinent(@Res() response, @Param('id') continentId: string) {
        try {
            const existingContinent = await this.continentService.getContinent(continentId);
            return response.status(HttpStatus.OK).json({
                message: 'Student found successfully',existingContinent,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') continentId: string){
        try {
            const deletedContinent = await this.continentService.deleteContinent(continentId);
            return response.status(HttpStatus.OK).json({
            message: 'Student deleted successfully',
            deletedContinent,});
        }catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}