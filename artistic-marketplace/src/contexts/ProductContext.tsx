import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../db/models/ProductType';

type ProductContextProps = {
    featuredProduct: Product | null;
    allProducts: Product[];
    otherProducts: Product[];
    categories: string[];
    selectedCategories: string[];
    priceRanges: { range: string, min: number, max: number }[];
    selectedPriceRange: string | null;
    toggleCategory: (category: string) => void;
    emptyFilters: () => void;
    selectPriceRange: (range: string) => void;
    getProductById: (id: string) => Product | undefined;
    currentPage: number;
    changePage: (page: number) => void;
    totalProductPages: number;
};

export const ProductContext = createContext<ProductContextProps>({
    featuredProduct: null,
    allProducts: [],
    otherProducts: [],
    categories: [],
    selectedCategories: [],
    priceRanges: [],
    selectedPriceRange: null,
    toggleCategory: () => { },
    emptyFilters: () => { },
    selectPriceRange: () => { },
    getProductById: () => undefined,
    currentPage: 1,
    changePage: () => { },
    totalProductPages: 1,
});

type ProductProviderProps = {
    children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]); // state for allProducts
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRanges, setPriceRanges] = useState<{ range: string, min: number, max: number }[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(6);
    const [totalProductPages, setTotalProductPages] = useState <number>(1);

    const changePage = (page: number) => setCurrentPage(page);
    const setPerPage = (perPage: number) => setProductsPerPage(perPage);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
        setCurrentPage(1);
    };

    const emptyFilters = () => {
        setSelectedCategories([]);
        setSelectedPriceRange('');
    };

    const selectPriceRange = (range: string) => {
        setSelectedPriceRange(range);
        setCurrentPage(1);
    };

    const getProductById = (id: string) => {
        return allProducts.find(product => product._id === id);
    };

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // const changePage = (page: number) => setCurrentPage(page);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {

                const { products, categories, priceRanges } = data.data;

                setAllProducts(products);
                setCategories(categories);
                setPriceRanges(priceRanges);

                const featured = products.find((product: Product) => product.featured);
                setFeaturedProduct(featured || null);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = allProducts
            .filter((product: Product) => selectedCategories.length === 0 || product.category.some(cat => selectedCategories.includes(cat)))
            .filter((product: Product) => {
                if (!selectedPriceRange) return true;
                const { min = 0, max = Number.POSITIVE_INFINITY } = priceRanges.find((r: { range: string, min: number, max: number }) => r.range === selectedPriceRange) || {};
                return product.price >= min && product.price <= max;
            });

        setFilteredProducts(filtered);

    }, [allProducts, selectedCategories, selectedPriceRange]);

    useEffect(() => {
        const others = filteredProducts.filter((product: Product) => !product.featured);
        // calculate total pages for the filtered products
        setTotalProductPages(Math.ceil(others.length / productsPerPage));
        // slice the filtered products for current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setOtherProducts(others.slice(startIndex, endIndex));

    }, [filteredProducts, currentPage, productsPerPage]);

    return (
        <ProductContext.Provider value={{ featuredProduct, allProducts, otherProducts, categories, selectedCategories, priceRanges, selectedPriceRange, toggleCategory, emptyFilters, selectPriceRange, getProductById, currentPage, changePage, totalProductPages }}>
            {children}
        </ProductContext.Provider>
    );
};
