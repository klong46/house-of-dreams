import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  showSecretInfo = false;
  pass = "";

  secretInfo(){
    if(this.pass == "showsecretstuff"){
      this.showSecretInfo = true;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
