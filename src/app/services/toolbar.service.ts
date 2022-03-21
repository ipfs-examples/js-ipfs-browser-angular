import { Injectable } from "@angular/core";

export interface Options {
  buttons: {
    icon: string;
    label: string;
  }[];
}

@Injectable()
export class ToolbarService {
  currentTitle: string = '';
  currentOptions: Options = { buttons: [] };
  backButton = false;

  setBackButton(backButton: boolean) {
    this.backButton = backButton;
  }

  setButtons(options: Options): void {
    this.currentOptions = options;
  }

  setTitle(title: string): void {
    this.currentTitle = title;
  }
}
