export interface Variants {
  active: boolean;
  discount: number;
  id: string;
  name: string;
  price: number;
  salePrice: number;
}

export interface Products {
  name: string;
  active: boolean;
  description: string;
  id: string;
  image: string;
  specification: any;
  variants: Variants;
}

export interface Categories {
  name: string;
  sort: any;
  active: boolean;
  icon: string;
  id: string;
  products: Products[];
}

export interface Menu {
  description: string;
  id: string;
  name: string;
  categories: Categories[];
}

export interface BranchTypes {
  id: string;
  type: any;
  name: string;
  description: string;
  logo: string;
  dayClose: string;
  phone: any;
  email: string;
  address: string;
}

export interface PaymentType {
  type: any;
  id: string;
  name: string;
}

export default interface CurrentBranchType {
  advancePayment: boolean;
  id: string;
  menuId: string;
  branch: BranchTypes;
  services: any;
  payments: PaymentType[];
  menu: Menu;
}
