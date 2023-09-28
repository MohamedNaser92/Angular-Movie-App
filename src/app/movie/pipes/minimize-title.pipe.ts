import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minimizeTitle",
})
export class MinimizeTitlePipe implements PipeTransform {
  transform(overview: string): string {
    if (overview.length < 20) {
      return overview;
    }
    return overview.slice(0, 20) + "...";
  }
}
