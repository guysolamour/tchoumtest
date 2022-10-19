import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Continent } from '../continent';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.css']
})
export class ContinentComponent implements OnInit {

  displayedColumns  :  string[] = [ 'name', 'code'];
  dataSource :  Continent[]  = [];
  continent = {};
  code: string = "";
  word: string = "";
  lang: string = "english"; // default language

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getContinents(this.code, this.word)
  }

  getContinents(code?: string, word?: string, lang?: string){
    this.apiService.readContinents({code, word, lang}).subscribe((result)=>{
      this.dataSource  =  result;
      console.log(this.dataSource);

     })
  }

  filterContinents(){
    this.getContinents(this.code, this.word, this.lang)
  }



  newContact(){
    this.continent = {};
  }

  createContact(f: { value: Continent; }){
    this.apiService.createContinent(f.value).subscribe((result)=>{
      console.log(result);
    });

  }

}
