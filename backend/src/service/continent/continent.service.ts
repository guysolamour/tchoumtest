import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContinentDto } from 'src/dto/create-continent.dto';
import { IContinent } from 'src/interface/continent.interface';
import { FilterQuery, Model } from "mongoose";
import { UpdateContinentDto } from 'src/dto/update-continent.dto';
import { Continent, ContinentDocument } from 'src/schema/continent.schema';



@Injectable()
export class ContinentService {
constructor(@InjectModel('Continent') private continentModel:Model<IContinent>) { }

    async createContinent(createContinentDto: CreateContinentDto): Promise<IContinent> {
        const newContinent = await new this.continentModel(createContinentDto);
     return newContinent.save();
    }

    async updateContinent(continentId: string, updateContinentDto: UpdateContinentDto): Promise<IContinent> {
        const existingContinent = await  this.continentModel.findByIdAndUpdate(continentId, updateContinentDto, { new: true });
        if (!existingContinent) {
            throw new NotFoundException(`Student #${continentId} not found`);
        }
        return existingContinent;
    }

    async getAllContinents(): Promise<IContinent[]> {
        const continentData = await this.continentModel.find();
        if (!continentData || continentData.length == 0) {
            throw new NotFoundException('Continents data not found!');
        }
        return continentData;
    }

    async findAll(  
       
        word?: string, code?: string, lang?: string
        
        ) {
       
       
            let filters: FilterQuery<ContinentDocument> = {};
          

            if (code) {
                filters.code = code;
                
              }

            

              if (word) {
               
                
                filters.$text = {
                    $search: word,
                    $language: lang
                  };

    
                  
                }
            

                const findQuery = this.continentModel
                .find(filters)
                ;
            

                console.log(filters);
                
               
 
             const results = await findQuery;
   
       
          return results;
    }

    async getContinent(continentId: string): Promise<IContinent> {
        const existingContinent = await     this.continentModel.findById(continentId).exec();
        if (!existingContinent) {
            throw new NotFoundException(`Continent #${continentId} not found`);
        }
        return existingContinent;
    }

    async deleteContinent(continentId: string): Promise<IContinent> {
        const deletedContinent = await this.continentModel.findByIdAndDelete(continentId);
        if (!deletedContinent) {
            throw new NotFoundException(`Continent #${continentId} not found`);
        }
        return deletedContinent;
    }

}