import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldWords'
})
export class BoldWordsPipe implements PipeTransform {

  transform(value: string | undefined, wordsToBold: string[]): string {
    if (value === undefined || !wordsToBold || wordsToBold.length === 0) {
      return '';
    }

    wordsToBold.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      value = value!.replace(regex, `\u001b[1m${word}\u001b[22m`);
    });

    return value!;
  }
}
