import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  msg;
  curErr;
  newPet = {
    name: "",
    type: "",
    desc: "",
    skills: []
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
    this.id = params['id'];  // (+) converts string 'id' to a number
    console.log(this.id)
    this.getPet();
    
   });
  }
  getPet(){
    let O = this._httpService.getPetById(this.id);
    O.subscribe(data => {
      console.log("found Pet");
      this.newPet = data['data'][0];
      console.log(this.newPet);
    })
  }
  editPet(){
    let O = this._httpService.editPet(this.id, this.newPet);
    O.subscribe(data =>{
      console.log("save: " , data)
      if(data['message'] == "error"){
        if(data['message'] == "error"){
          this.msg = data['error']['errors'];
          console.log(this.msg)
  
          if('name' in this.msg){
            this.curErr = this.msg.name.message
            return;
          }
          if('desc' in this.msg){
            this.curErr = this.msg.desc.message
            return;
        }
          if('type' in this.msg){
            this.curErr = this.msg.type.message
            return;
        }
      }
      }else{
        this.goHome();
      }
    })
  }
  goHome() {
    this._router.navigate(['/show/' + this.id]);
  }

}
