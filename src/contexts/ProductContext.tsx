import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../db/models/ProductType';

/**
 * Interface for the Product Context properties.
 */
type ProductContextProps = {
    featuredProduct: Product | null;
    allProducts: Product[];
    otherProducts: Product[];
    categories: string[];
    selectedCategories: string[];
    priceRanges: { range: string; min: number; max: number }[];
    selectedPriceRange: string | null;
    toggleCategory: (category: string) => void;
    emptyFilters: () => void;
    selectPriceRange: (range: string) => void;
    getProductById: (id: string) => Product | null;
    currentPage: number;
    changePage: (page: number) => void;
    totalProductPages: number;
    sorting: string;
    selectSorting: (sort: string) => void;
};

/**
 * Create the Product Context with default values.
 */
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
    getProductById: () => null,
    currentPage: 1,
    changePage: () => { },
    totalProductPages: 1,
    sorting: 'priceLowHigh',
    selectSorting: () => { },
});

type ProductProviderProps = {
    children: ReactNode;
};

/**
 * Product Provider component that manages the state and logic for the Product Context.
 */
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRanges, setPriceRanges] = useState<{ range: string; min: number; max: number }[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(6);
    const [totalProductPages, setTotalProductPages] = useState<number>(1);
    const [sorting, setSorting] = useState<string>('priceLowHigh');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    /**
     * Function to handle changes to the sorting.
     */
    const selectSorting = (sort: string) => {
        setSorting(sort);
    };

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
        const temp = allProducts.find(product => product._id === id);
        if (temp === undefined) return null;
        else return temp;
    };

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
                const { min = 0, max = Number.POSITIVE_INFINITY } = priceRanges.find(
                    (r: { range: string; min: number; max: number }) => r.range === selectedPriceRange
                ) || {};
                return product.price >= min && product.price <= max;
            });

        setFilteredProducts(filtered);
    }, [allProducts, selectedCategories, selectedPriceRange, priceRanges]);

    useEffect(() => {
        const others = [...filteredProducts.filter((product: Product) => !product.featured)];

        // sort the products according to the selected sorting method
        others.sort((a, b) => {
            switch (sorting) {
                case 'priceLowHigh':
                    return a.price - b.price;
                case 'priceHighLow':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        // calculate total pages for the filtered products
        setTotalProductPages(Math.ceil(others.length / productsPerPage));
        // slice the filtered products for current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setOtherProducts(others.slice(startIndex, endIndex));
    }, [filteredProducts, currentPage, productsPerPage, sorting]);

    return (
        <ProductContext.Provider
            value={{
                featuredProduct,
                allProducts,
                otherProducts,
                categories,
                selectedCategories,
                priceRanges,
                selectedPriceRange,
                toggleCategory,
                emptyFilters,
                selectPriceRange,
                getProductById,
                currentPage,
                changePage,
                totalProductPages,
                sorting,
                selectSorting,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
