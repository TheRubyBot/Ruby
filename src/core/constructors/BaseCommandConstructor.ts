import { RubyError } from "@core/util/Error";

export class BaseCommand {
  constructor(
    public name: string,
    public commandType: "TEXT" | "APPLICATION",
    public description?: string
  ) {
    const nameRegex = /^[a-zA-Z0-9_]+$/gi;
    if (!nameRegex.test(name))
      throw new RubyError(`Invalid command name: ${name}`);
    else if (name.length > 32 || name.length < 1)
      throw new RubyError(
        `Command name must be between 1 and 32 characters long: ${name}`
      );

    if (!description) throw new RubyError(`No description provided: ${name}`);
    else if (description.length > 100 || description.length < 1)
      throw new RubyError(
        `Description must be between 1 and 100 characters: ${name}`
      );
  }

  public isSlash(): boolean {
    return this.commandType === "APPLICATION";
  }
  public isText(): boolean {
    return this.commandType === "TEXT";
  }
}
