/* INFO:
  Stores api key in memory, don't save to local storage because not encrypted.
*/

class ApiKey {
  private static instance: ApiKey;
  private _apikey: any;

  private constructor() {}

  public static getInstance(): ApiKey {
    if (!ApiKey.instance) {
      ApiKey.instance = new ApiKey();
    }
    return ApiKey.instance;
  }

  get apikey(): any {
    return this._apikey;
  }

  set apikey(value: any) {
    this._apikey = value;
  }
}

export default ApiKey;
