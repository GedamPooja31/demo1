import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';


  escapeRegExp(delimiter: string): string {
    return delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  add(numbers: string): number {
    if (numbers === '') return 0; 

    let delimiter = /,|\n/; 
    const customDelimiterMatch = numbers.match(/^\/\/(.+)\n/); 

    if (customDelimiterMatch) {
      delimiter = new RegExp(this.escapeRegExp(customDelimiterMatch[1])); 
      numbers = numbers.split('\n')[1]; 
    }

    const numArray = numbers.split(delimiter).map(Number);
    const negatives = numArray.filter(num => num < 0); 

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numArray.reduce((sum, num) => sum + num, 0); 
  }

  ngOnInit() {}
}