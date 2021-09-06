import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DreamsService } from 'src/app/service/dreams.service';
import { ModeService } from '../../service/mode.service';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent implements OnInit {

  endlessUnlocked = false;
  topLeft = "";
  topRight = "";
  botLeft = "";
  botRight = "";


  onClickNormal(){
    this.router.navigate(['house']);
  }

  onClickEndless(){
    this.router.navigate(['house']);
    this.mode.normalMode = false;
  }

  goToInfo(){
    this.router.navigate(['info']);
  }

  async getWords(){
    await this.dreams.getRandomWord().toPromise().then(word => this.topLeft = word);
    await this.dreams.getRandomWord().toPromise().then(word => this.topRight = word);
    await this.dreams.getRandomWord().toPromise().then(word => this.botLeft = word);
    await this.dreams.getRandomWord().toPromise().then(word => this.botRight = word);
  }

  constructor(private router: Router, private mode: ModeService, private dreams: DreamsService) { }

  ngOnInit(): void {
    this.endlessUnlocked = this.mode.endlessUnlocked;
    this.getWords();
  }

}
