import { IsNotEmpty,  IsString, MaxLength } from "class-validator";
export class CreateContinentDto {
    @IsString()
    @MaxLength(2)
    @IsNotEmpty()
    readonly code: string;

   
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}