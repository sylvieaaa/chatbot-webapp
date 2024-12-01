import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
})
export class FormatTextPipe implements PipeTransform {
  transform(value: string): unknown {
    if (!value) return value;

    let formattedText = value;
    // Bold text (e.g., **Girls:** becomes <b>Girls:</b>)
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert list items (e.g., 1. Emma becomes <ul><li>Emma</li></ul>)
    formattedText = formattedText.replace(
      /(\d+\.\s+)(.*?)(?=\n|$)/g,
      '<ul><li>$2</li></ul>'
    );

    // Handle other potential formatting cases (e.g., line breaks)
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  }
}
