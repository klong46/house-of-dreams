import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  normalMode = true;
  endlessUnlocked = false;

  constructor() { }
}
