import { ApplicationCommandCallback } from "./ApplicationCommandConstructor";
import { TextCommandCallback } from "./TextCommandConstructor";

export class BaseCommand {
  constructor(
    public name: string,
    public $isSlash: boolean,
    public callback: ApplicationCommandCallback | TextCommandCallback,
    public description?: string
  ) {}

  public isSlash(): boolean {
    return this.$isSlash;
  }

  public isText(): boolean {
    return !this.$isSlash;
  }
}
