import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets(){
    return this._http.get('/pets');
  }
  getPetById(id){
    return this._http.get('/pets/' + id);
  }
  addPet(newPet){
    return this._http.post('/pets', newPet);
  }
  editPet(id, pet){
    return this._http.put('/pets/' + id, pet);
  }
  removePet(id){
    return this._http.delete('/pets/' + id);
  }

}
