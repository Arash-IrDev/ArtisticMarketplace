interface Image {
    src: string;
    alt: string;
}

interface Dimensions {
    width: number;
    height: number;
}

interface Details {
    dimensions: Dimensions;
    size: number;
    description: string;
    recommendations: string[];
}

export interface Product {
    _id: string;
    name: string;
    category: string[];
    price: number;
    currency: string;
    image: Image;
    bestseller: boolean;
    featured: boolean;
    details: Details;
}
