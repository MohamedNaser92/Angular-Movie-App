import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minimizeDescription",
})
export class MinimizeDescriptionPipe implements PipeTransform {
  transform(overview: string, words: number): string {
    if (overview.length < words) {
      return overview;
    }
    return overview.slice(0, words) + "...";
  }
}
