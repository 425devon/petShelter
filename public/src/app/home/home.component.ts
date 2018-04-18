import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets = [];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => console.log(params['id']));
    this.getPets();
  }

  getPets(){
    let O = this._httpService.getPets();
    O.subscribe(data=>{
      console.log("got pets", data)
      this.pets = data['data']
      this.pets.sort(this.compare);
    })
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const typeA = a.type.toUpperCase();
    const typeB = b.type.toUpperCase();

    let comparison = 0;
    if (typeA > typeB) {
      comparison = 1;
    } else if (typeA < typeB) {
      comparison = -1;
    }
    return comparison;
  }

}
