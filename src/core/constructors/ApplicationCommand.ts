export class ApplicationCommand {
  public type: number = 1;

  constructor(
    public name: string,
    public description: string,
    public options: any[]
  ) {}
}
