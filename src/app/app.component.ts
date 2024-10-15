import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';


  escapeRegExp(delimiter: string): string {
    return delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  }

  
  add(numbers: string): number {
    if (numbers === "") return 0;

    let delimiter = /,|\n/; 
    let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);

    if (customDelimiterMatch) {
      delimiter = new RegExp(this.escapeRegExp(customDelimiterMatch[1])); 
      numbers = numbers.split("\n")[1];
    }

    const numArray = numbers.split(delimiter).map(Number);
    const negatives = numArray.filter(num => num < 0);

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return numArray.reduce((sum, num) => sum + num, 0);
  }

  run() {
    const tests = [
      { input: "", expected: 0 },
      { input: "1", expected: 1 },
      { input: "1,5", expected: 6 },
      { input: "1\n2,3", expected: 6 },
      { input: "//;\n1;2", expected: 3 },
      { input: "//|\n2|3|4", expected: 9 },
      { input: "//***\n1***2***3", expected: 6 },
      { input: "1,-2,3", expected: "error" } 
    ];

    tests.forEach(({ input, expected }) => {
      try {
        const result = this.add(input);
        console.log(`Input: "${input}", Output: ${result}, Expected: ${expected}`);
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Input: "${input}", Error: ${e.message}`);
        }
      }
    });
  }

 
  ngOnInit() {
    this.run();
  }
}
