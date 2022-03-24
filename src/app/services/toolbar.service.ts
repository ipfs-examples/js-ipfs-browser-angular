import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export interface Options {
  buttons: {
    icon: string;
    label: string;
    link?: string;
    callback?: Function;
  }[];
}

@Injectable()
export class ToolbarService {
  currentTitle: string = '';
  currentOptionsSubject = new BehaviorSubject<Options>({ buttons: [ ]});
  currentOptions$ = this.currentOptionsSubject.asObservable();
  backButton = false;

  setBackButton(backButton: boolean) {
    this.backButton = backButton;
  }

  setButtons(options: Options): void {
    this.currentOptionsSubject.next(options);
  }

  setTitle(title: string): void {
    this.currentTitle = title;
  }
}
