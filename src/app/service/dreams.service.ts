import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dream } from '../model/dream';
import { AnalysisInput } from '../model/analysisInput';
import { DocumentInput } from '../model/documentInput';
import { EntityAnalysis } from '../model/entityAnalysis';
import { SentimentAnalysis } from '../model/sentimentAnalysis';

const httpOption1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'api-key':'',
  })
};

const httpOption2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DreamsService {

  apiKey = ""
  dream?: Dream;
  document: DocumentInput = {
    content: "",
    type: "PLAIN_TEXT"
  }
  analysis: AnalysisInput = {
    document: this.document,
    encodingType: "UTF8"
  }

  getRandomWord(){
    return this.http.get<string>("https://random-word-api.herokuapp.com/word?number=1");
  }

  getDreamText(thoughts: string){
    let body = "text=" + thoughts;
    return this.http.post<Dream>("https://api.deepai.org/api/text-generator", body, httpOption1);
  }

  getEntityInfo(dreamText: string){
    this.document.content = dreamText;
    this.analysis.document = this.document;
    return this.http.post<EntityAnalysis>("https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=" + this.apiKey, this.analysis, httpOption2) 
  }

  getSentimentAnalysis(dreamText: string){
    this.document.content = dreamText;
    this.analysis.document = this.document;
    return this.http.post<SentimentAnalysis>("https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + this.apiKey, this.analysis, httpOption2) 
  }

  constructor(private http: HttpClient) { }
}
