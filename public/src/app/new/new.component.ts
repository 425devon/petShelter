import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  skillset = {
    s1: "",
    s2: "",
    s3: ""
  }

  newPet = {
    name: "",
    type: "",
    desc: "",
    skills: []
  }
  msg;
  curErr;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => console.log(params['id']));
  }
  onSubmit(){
    for(let i in this.skillset){
      this.newPet.skills.push(this.skillset[i])
    }
    let O = this._httpService.addPet(this.newPet);
    O.subscribe(data=>{
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
        
        this.newPet = {
          name: "",
          type: "",
          desc: "",
          skills: []
        }

      }else{
        this.newPet = {
          name: "",
          type: "",
          desc: "",
          skills: []
        }
        this.goHome();
      }
    })
  }
  goHome() {
    this._router.navigate(['/home']);
  }
  cancel(){
    this.newPet = {
      name: "",
      type: "",
      desc: "",
      skills: []
    }
    this.goHome();
  }
}
