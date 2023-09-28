import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minimizeDescription",
})
export class MinimizeDescriptionPipe implements PipeTransform {
  transform(overview: string): string {
    if (overview.length < 250) {
      return overview;
    }
    return overview.slice(0, 250) + "...";
  }
}
