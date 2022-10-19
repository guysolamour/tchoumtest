import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { PromiseProvider } from "mongoose";

export type ContinentDocument = Continent & Document;


@Schema()
export class Continent {
   
   @Prop()
   code: string;

   @Prop()
   name: string;
   
   @Prop()
   translation: Array<Object>
}

const ContinentSchema = SchemaFactory.createForClass(Continent);

ContinentSchema.index({ name: "text", "translation.name": "text" });


export {ContinentSchema} ;