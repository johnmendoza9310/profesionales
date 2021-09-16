import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse,HttpClient } from '@angular/common/http'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

 constructor( private http:HttpClient){

 }

  private url= `http://professionals-api-john.kevocde.co/v1`;
  //private url='';



  getAllProfesionals(){
    return this.http.get(`${this.url}/professionals`)
    .pipe(map((data:any)=>{
      return data.data;
    }))
  }




  getOneprofesional(id:number){
    return this.http.get(`${this.url}/professionals/${id}`)
  }


  createProfesional(profesional){
    return this.http.post(`${this.url}/professionals`,profesional)
    .pipe(map(data=>{
      return data;
    }))
  }


  updateProfesional(profesional, id){
    return this.http.post(`${this.url}/professionals/${id}`,profesional)
    .pipe(map(data=>{
      return data;
    }))


    
  }


  deleteProfesional(id){

    return this.http.delete(`${this.url}/professionals/${id}`);

  }















}
