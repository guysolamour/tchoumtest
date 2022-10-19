import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Continent } from  './continent';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }


  public readContinents(params: { code?: string | undefined; word?: string | undefined; lang?: string | undefined;}){

    console.log(params, params["code"]);

    let queryParams = new HttpParams();

    if (params["code"] != undefined){
      queryParams.append("code", params["code"])
    }

    if (params["word"]  != undefined){
      queryParams.append("word", params["word"])
    }


    if (params["lang"]  != undefined){
      queryParams.append("lang", params["lang"])
    }

    console.log(queryParams.toString());


    //if (queryParams.toString)

   // if (queryParams.appendAll(params))


    queryParams = queryParams.appendAll(params);

    return this.httpClient.get<Continent[]>(`${this.API_SERVER}/continent`, {params:queryParams});
  }

  public createContinent(continent: Continent){
    return this.httpClient.post<Continent>(`${this.API_SERVER}/continent`, continent);
  }

  public updateContinent(continent: Continent){
    return this.httpClient.put<Continent>(`${this.API_SERVER}/continent/${continent._id}`, continent);
  }

  public deleteContinent(id: number){
    return this.httpClient.delete(`${this.API_SERVER}/continent/${id}`);
  }
}
