
export interface Dimensions {
    height: number | string;
    width: number | string;
    depth: number | string;
  }

export interface Product {
    _id: string;
    name: string;
    _type: 'product';
    image?: {
        asset: {
            _ref: string;
            _type: "image";
        };
    };
    price: number;
    quantity:number;
    tags: string[];
    description: string;
    features: string[];
    dimensions:Dimensions;
    category:string;
    slug:{
        _type:"slug"
        current: string;
    }
}
