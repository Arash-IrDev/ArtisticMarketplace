// ProductContext

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../db/models/ProductType';

type ProductContextProps = {
    featuredProduct: Product | null;
    otherProducts: Product[];
    categories: string[];
    selectedCategories: string[];
    priceRanges: { range: string, min: number, max: number }[];
    selectedPriceRange: string | null;
    toggleCategory: (category: string) => void;
    selectPriceRange: (range: string) => void;
};

export const ProductContext = createContext<ProductContextProps>({
    featuredProduct: null,
    otherProducts: [],
    categories: [],
    selectedCategories: [],
    priceRanges: [],
    selectedPriceRange: null,
    toggleCategory: () => { },
    selectPriceRange: () => { },
});

type ProductProviderProps = {
    children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRanges, setPriceRanges] = useState<{ range: string, min: number, max: number }[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const selectPriceRange = (range: string) => {
        setSelectedPriceRange(range);
    };

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {

                const { products, categories, priceRanges } = data.data;

                setCategories(categories);
                setPriceRanges(priceRanges);

                const filteredProducts = products
                    .filter((product: Product) => selectedCategories.length === 0 || product.category.some(cat => selectedCategories.includes(cat)))
                    .filter((product: Product) => {
                        if (!selectedPriceRange) return true;
                        const { min, max } = priceRanges.find((r: { range: string, min: number, max: number }) => r.range === selectedPriceRange) || {};
                        return product.price >= min && product.price <= max;
                    });

                const featured = products.find((product: Product) => product.featured);
                setFeaturedProduct(featured || null);

                const others = filteredProducts.filter((product: Product) => !product.featured);
                setOtherProducts(others);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [selectedCategories, selectedPriceRange]);

    return (
        <ProductContext.Provider value={{ featuredProduct, otherProducts, categories, selectedCategories, priceRanges, selectedPriceRange, toggleCategory, selectPriceRange }}>
            {children}
        </ProductContext.Provider>
    );
};
