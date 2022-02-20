import { ApplicationCommandCallback } from "./ApplicationCommandConstructor";
import { TextCommandCallback } from "./TextCommandConstructor";

export class BaseCommand {
  constructor(
    public name: string,
    public callback: ApplicationCommandCallback | TextCommandCallback,
    public description?: string
  ) {}
}
