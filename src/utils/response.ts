export class ResponseShape {
  private readonly success;
  private readonly data;

  constructor(success: boolean, data: any | any[]) {
    this.success = success;
    this.data = data;
  }
}
