interface IOptionBuilder {
  string<Name extends string>(name: Name, description: string, required?: boolean): OptionBuilder;
  integer<Name extends string>(name: Name, description: string, required?: boolean): OptionBuilder;
  boolean<Name extends string>(name: Name, description: string, required?: boolean): OptionBuilder;
  channel<Name extends string>(name: Name, description: string, required?: boolean): OptionBuilder;
  user<Name extends string>(name: Name, description: string, required?: boolean): OptionBuilder;
  mentionable<Name extends string>(
    name: Name,
    description: string,
    required?: boolean
  ): OptionBuilder;
  role<Name extends string>(name: Name, description: string, required?: boolean): OptionBuilder;
}

export interface Choice {
  name: string;
  value: string;
}

export interface Option {
  name: string;
  description: string;
  type: string;
  required: boolean;
  choices?: Choice[];
}

export class OptionBuilder implements IOptionBuilder {
  readonly options: Option[] = [];

  private addOption(
    type: "STRING" | "INTEGER" | "BOOLEAN" | "CHANNEL" | "USER" | "MENTIONABLE" | "ROLE"
  ): (name: string, description: string, required?: boolean) => this {
    return (name: string, description: string, required?: boolean, choices?: Choice[]): this => {
      this.options.push({
        name,
        description,
        type,
        required: !!required,
        choices: choices || []
      });
      return this;
    };
  }

  string = this.addOption("STRING");
  integer = this.addOption("INTEGER");
  boolean = this.addOption("BOOLEAN");
  channel = this.addOption("CHANNEL");
  user = this.addOption("USER");
  mentionable = this.addOption("MENTIONABLE");
  role = this.addOption("ROLE");
}
