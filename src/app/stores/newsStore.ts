// stores/newsStore.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface NewsItem {
    _id: string;
    title: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
    slug: string;
}

interface NewsState {
    news: NewsItem[];
    filtered: NewsItem[];
    loading: boolean;
    page: number;
    search: string;
    total: number;
    totalItems: number;
    // Add cache for paginated data
    paginationCache: {
        [key: string]: {
            data: NewsItem[];
            totalPages: number;
            totalItems: number;
            timestamp: number;
        };
    };
    // Add homepage data
    homepageNews: NewsItem[];
    homepageLoading: boolean;
}

// Initial state
const initialNewsState: NewsState = {
    news: [],
    filtered: [],
    loading: true,
    page: 1,
    search: '',
    total: 0,
    totalItems: 0,
    paginationCache: {},
    homepageNews: [],
    homepageLoading: true,
};

// Atoms
export const newsAtom = atom<NewsState>(initialNewsState);

// Derived atoms
export const newsListAtom = atom((get) => get(newsAtom).news);
export const filteredNewsAtom = atom((get) => get(newsAtom).filtered);
export const loadingAtom = atom((get) => get(newsAtom).loading);
export const pageAtom = atom((get) => get(newsAtom).page);
export const searchAtom = atom((get) => get(newsAtom).search);
export const totalPagesAtom = atom((get) => get(newsAtom).total);
export const totalItemsAtom = atom((get) => get(newsAtom).totalItems);
export const paginationCacheAtom = atom((get) => get(newsAtom).paginationCache);
export const homepageNewsAtom = atom((get) => get(newsAtom).homepageNews);
export const homepageLoadingAtom = atom((get) => get(newsAtom).homepageLoading);

// Helper function to generate cache key
export const generateCacheKey = (page: number, search: string, limit: number) => {
    return `${page}_${search}_${limit}`;
};

// Actions
export const setNewsAtom = atom(
    null,
    (get, set, update: Partial<NewsState>) => {
        set(newsAtom, (prev) => ({ ...prev, ...update }));
    }
);

export const updatePaginationCacheAtom = atom(
    null,
    (get, set, { key, data, totalPages, totalItems }: {
        key: string;
        data: NewsItem[];
        totalPages: number;
        totalItems: number;
    }) => {
        set(newsAtom, (prev) => ({
            ...prev,
            paginationCache: {
                ...prev.paginationCache,
                [key]: {
                    data,
                    totalPages,
                    totalItems,
                    timestamp: Date.now(),
                },
            },
        }));
    }
);

export const getFromCacheAtom = atom(
    (get) => (key: string) => {
        const cache = get(paginationCacheAtom);
        const cachedData = cache[key];

        // Cache validity: 5 minutes
        if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
            return cachedData;
        }
        return null;
    }
);

export const setHomepageNewsAtom = atom(
    null,
    (get, set, news: NewsItem[]) => {
        set(newsAtom, (prev) => ({
            ...prev,
            homepageNews: news,
            homepageLoading: false,
        }));
    }
);

export const setHomepageLoadingAtom = atom(
    null,
    (get, set, loading: boolean) => {
        set(newsAtom, (prev) => ({
            ...prev,
            homepageLoading: loading,
        }));
    }
);

export const resetNewsAtom = atom(null, (get, set) => {
    set(newsAtom, initialNewsState);
});