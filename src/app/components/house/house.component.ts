import { Component, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { Dream } from '../../model/dream';
import { EntityAnalysis } from '../../model/entityAnalysis';
import { SentimentAnalysis } from '../../model/sentimentAnalysis';
import { DreamsService } from '../../service/dreams.service';
import { ModeService } from '../../service/mode.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  randomWord = "";
  thoughts = "";
  dream: Dream = {
    id: "",
    output: ""
  };
  entityAnalysis?: EntityAnalysis
  sentimentAnalysis?: SentimentAnalysis;
  entityOneName = "";
  entityTwoName = "";
  entityOneSentiment = 0;
  entityTwoSentiment = 0;
  overallSentiment = 0;
  dreamScore = 0;
  sentiment1Guess = 0;
  sentiment2Guess = 0;
  sentiment3Guess = 0;
  rooms = 10;
  overallScore = 100;
  gameOver = false;
  gameMode = this.mode.normalMode;
  loadingWord = true;
  loadingDream = false;
  unlockPassword = false;
  dreamScoreList: number[] = [];
  dreamAverage = 0;
  answersChecked = false;
  entityTwoEmpty = true;

  async enterRoom(){
    this.loadingWord = true;
    await this.dreams.getRandomWord().toPromise().then(word => this.randomWord = word);
    this.loadingWord = false;
  }

  updateSlider1(event: MatSliderChange){
    if(event.value){
      this.sentiment1Guess = event.value;
    }
  }

  updateSlider2(event: MatSliderChange){
    if(event.value){
      this.sentiment2Guess = event.value;
    }
  }

  updateSlider3(event: MatSliderChange){
    if(event.value){
      this.sentiment3Guess = event.value;
    }
  }

  async submitThoughts(){
    this.answersChecked = false;
    this.loadingDream = true;
     await this.dreams.getDreamText(this.thoughts).toPromise().then(dream => this.dream = dream);
     await this.dreams.getEntityInfo(this.dream.output).toPromise().then(data => this.entityAnalysis = data);
     await this.dreams.getSentimentAnalysis(this.dream.output).toPromise().then(data => this.sentimentAnalysis = data);
     this.setAnalysisVariables();
     this.loadingDream = false;
  }

  setAnalysisVariables(){
    if(this.entityAnalysis){
      this.entityOneName = this.entityAnalysis.entities[0].name;
      this.entityTwoName = this.entityAnalysis.entities[1].name;
      this.entityOneSentiment = this.entityAnalysis.entities[0].sentiment.score * 10;
      this.entityTwoSentiment = this.entityAnalysis.entities[1].sentiment.score * 10;
      this.entityTwoEmpty = false;
      if(this.entityTwoName == this.entityOneName){
        this.entityTwoName = "";
      }
    }
    if(this.sentimentAnalysis){
      this.overallSentiment = this.sentimentAnalysis.documentSentiment.score * 10;
    }
    if(this.entityTwoName == ""){
      this.entityTwoEmpty = true;
    }
  }

  checkAnswers(){
    this.answersChecked = true;
  }

  setDreamScore(){
    this.dreamScore = this.calculateDreamScore();
    this.overallScore = this.overallScore - this.dreamScore;
  }

  calculateDreamScore(){
    let score1 = Math.abs(this.sentiment1Guess - this.entityOneSentiment);
    let score2 = Math.abs(this.sentiment2Guess - this.entityTwoSentiment);
    let score3 = Math.abs(this.sentiment3Guess - this.overallSentiment) * 2;
    return score1 + score2 + score3;
  }

  calculateDreamAverage(){
    let total = 0;
    for(let i = 0; i < this.dreamScoreList.length; i++){
      total = total + this.dreamScoreList[i]
    }
    this.dreamAverage = (total / this.dreamScoreList.length);
  }

  showEndScreen(){
    this.calculateDreamAverage();
    this.gameOver = true;
    this.mode.endlessUnlocked = true;
    if(this.overallScore >= 90){
      this.unlockPassword = true;
    }
  }

  backToMenu(){
    this.router.navigate(['menu']);
  }

  submitDream(){
    this.dreamScoreList.push(this.overallSentiment);
    this.rooms--;
    if(this.rooms == 0 && this.gameMode){
      this.showEndScreen();
    }
    this.setDreamScore();
    this.randomWord = "";
    this.thoughts = "";
    this.dream = {
      id: "",
      output: ""
    };
    this.entityOneName = "";
    this.entityTwoName = "";
    this.entityOneSentiment = 0;
    this.entityTwoSentiment = 0;
    this.overallSentiment = 0;
    this.dreamScore = 0;
    this.sentiment1Guess = 0;
    this.sentiment2Guess = 0;
    this.sentiment3Guess = 0;
    this.answersChecked = false;
    this.enterRoom();
  }

  constructor(private dreams: DreamsService, private router: Router, private mode: ModeService) { 
  }

  ngOnInit(): void {
    this.dreamScoreList = [];
    this.overallScore = 100;
    this.enterRoom();
  }

}
