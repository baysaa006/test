export interface IAttribute {
  id: string;
  name: string;
  values: IAttributeValue[];
}

export interface IAttributeValue {
  id: string;
  name: string;
  sort: number;
}
