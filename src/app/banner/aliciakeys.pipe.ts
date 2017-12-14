import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "aliciaKeys"
})
export class AliciaKeys implements PipeTransform {

  transform(value: any, arg: string[]): string {

    return value
      ? Object.entries(value)
          .filter(([key, value]) => value)
          .map(([key, value]) => key)
          .join(", ")
      : "";
  }
}
