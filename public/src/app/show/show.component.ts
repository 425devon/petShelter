import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  id: any;
  msg;
  pet: any;
  stat;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];  // (+) converts string 'id' to a number
      this.getPet();
     });
  }
  getPet(){
    let O = this._httpService.getPetById(this.id);
    O.subscribe(data => {
      console.log("found pet", data);
      this.pet = data['data'][0];
      console.log(this.pet);
    })
  }
  upVote(){
    this.pet.likes += 1
    this.stat = true;
    let O = this._httpService.editPet(this.id, this.pet);
    O.subscribe(data =>{
      console.log(this.pet);
    })
  }
  delete(){
    let O = this._httpService.removePet(this.id);
    O.subscribe(data=>{console.log("deleted!")})
    this.goHome();
  }

  goHome() {
    this._router.navigate(['/home']);
  }

}
