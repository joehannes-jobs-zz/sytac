export type JSONValue = number | string | boolean | Array<number | string | boolean | Object> | Object;
export interface IModel {
  [index: string]: JSONValue | IModel;
};

export abstract class Model implements IModel {
  constructor(json: IModel) {
    this.init(json);
  }
  public toJSON(): Object {
    let jsonO: IModel = {};
    Object.getOwnPropertyNames(this).forEach((key: string): void => {
      if (typeof this[key] !== 'function') {
        if (this[key] instanceof Model) {
          jsonO[key] = (this[key] as Model).toJSON();
        } else if (this[key] instanceof Collection) {
          jsonO[key] = (this[key] as Collection<Model>)
            .toArray()
            .map((_model: Model) => {
            _model.toJSON();
          });
        } else {
          jsonO[key] = this[key] as JSONValue;
        }
      }
    });
    return jsonO as Object;
  }
  public toQueryString(key: string = ''): string {
    let str: Array<string> = [];
    let conditionalLowDasherize = (__key: string): string => {
      return (__key.length > 0) ? '_' + __key : '';
    };
    Object.getOwnPropertyNames(this).forEach((_key: string): void => {
      if (typeof this[_key] !== 'function') {
        if (this[_key] instanceof Model) {
          str.push((this[_key] as Model).toQueryString(_key + conditionalLowDasherize(key)));
        } else if (this[_key] instanceof Collection) {
          str.push((this[_key] as Collection<Model>)
            .toArray()
            .map((_model: Model): string => {
              return _model.toQueryString(_key + conditionalLowDasherize(key));
          }).join('&'));
        } else {
          str.push(_key + conditionalLowDasherize(key) + '=' + encodeURIComponent(this[key].toString()));
        }
      }
    });
    return str.join('&');
  }
  protected init(model: IModel): void {
    Object.getOwnPropertyNames(model).forEach((key: string): void => {
      if (typeof this[key] !== 'function') {
        if (model[key] instanceof Object) {
          if (Array.isArray(model[key])) {
            this[key] = this.instantiate((model[key] as ICollection), key);
          } else {
            this[key] = this.instantiate((model[key] as IModel), key);
          }
        } else if (typeof model[key] !== 'undefined') {
          this[key] = model[key];
        }
      }
    });
  }
  protected isDefined(key: string): boolean {
    return (typeof this[key] !== 'undefined');
  }
  protected abstract instantiate(raw: IModel | ICollection, key: string): Model | Collection<Model>;

  [index: string]: JSONValue | IModel;
}

export interface ICollection {
  [index: number]: Model;
};
export abstract class Collection<M extends Model> implements ICollection {
  length = 0;

  constructor(collection: Array<IModel>) {
    collection.forEach((model: IModel): void => {
      this[this.length] = this.instantiate(model);
      this.length++;
    });
  }

  public toArray(): Array<JSONValue> {
    let a = [];
    for (let i = 0; i < this.length; i++) {
      a.push(this[i].toJSON());
    }
    return a;
  }
  protected abstract instantiate(model: IModel): M;

  [index: number]: M;
}

export class MeisterDtO extends Model {
  id: number;
  type: string;
  brand: string;
  colors: string[];
  image: string;

  constructor(json: IModel) {
    super(json);
  }
  protected instantiate(model: IModel, key: string): Model {
    return;
  }
}

export class MeisterDtC extends Collection<MeisterDtO> {
  constructor(collection: Array<IModel>) {
    super(collection);
  }
  protected instantiate(model: IModel): MeisterDtO {
    return new MeisterDtO(model);
  }
};
