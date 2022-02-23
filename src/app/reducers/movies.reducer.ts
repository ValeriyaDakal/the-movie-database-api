import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface IMovies {
    popular: {
        totalPages: number | null;
        results: any[];
    },

    search: {
        searchTotalPages: number | null;
        searchResults: any;
        query: string;
    },
    favorites: any[];
    currentMovie: null;
};

const baseUrl = process.env.REACT_APP_BASE_URL;
const authToken = process.env.REACT_APP_AUTH_TOKEN;

const initialState = {
    popular: {
        totalPages: null,
        results: [],
    },
    search: {
        searchTotalPages: null,
        searchResults: null,
        query: "",
    },
    favorites: [],
    currentMovie: null
} as IMovies;

export const fetchMoviesList = createAsyncThunk(
    'movies/fetchMoviesList',
    async (page: number = 1) => {
        const response = await fetch(`${baseUrl}/3/movie/popular/?api_key=${authToken}&page=${page}`)
            .then(res => res.json())
            .then(json => json);

        return {
            totalPages: response.total_pages,
            results: response.results
        };
    }
)

export const fetchMovieDescription = createAsyncThunk(
    'movies/fetchMovieDescription',
    async (id: number) => {
        const response = await fetch(`${baseUrl}/3/movie/${id}?api_key=${authToken}`)
            .then(res => res.json())
            .then(json => json);

        return response;
    }
)

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (query: string) => {
        const response = await fetch(`${baseUrl}/3/search/movie?api_key=${authToken}&page=1&include_adult=false&query=${query}`)
            .then(res => res.json())
            .then(json => json);

        return {
            totalPages: response.total_pages,
            results: response.results,
            query,
        };
    }
)

export const receiweMoreMovies = createAsyncThunk(
    'movies/receiweMoreMovies',
    async ({ query, page = 2 }: any) => {
        const response = await fetch(`${baseUrl}/3/search/movie?api_key=${authToken}&page=${page}&include_adult=false&query=${query}`)
            .then(res => res.json())
            .then(json => json);

        return {
            totalPages: response.total_pages,
            results: response.results
        };
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        toggleToFavorites(state, action: any) {
            const movieExist = state.favorites.find((movie: any) => {
                return movie.id === action.payload.id;
            })

            if (movieExist) {
                state.favorites = state.favorites.filter((movie: any) => {
                    return movie.id !== movieExist.id
                });
                return ;
            }
            state.favorites.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
            state.popular.results.push(...action.payload.results);
            state.popular.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchMovieDescription.fulfilled, (state, action) => {
            state.currentMovie = { ...action.payload };
        });
        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.search.searchResults = [...action.payload.results];
            state.search.searchTotalPages = action.payload.totalPages;
            state.search.query = action.payload.query;
        });
        builder.addCase(receiweMoreMovies.fulfilled, (state, action) => {
            state.search.searchResults.push(...action.payload.results);
            state.search.searchTotalPages = action.payload.totalPages;
        });
    },
})

export const { toggleToFavorites } = moviesSlice.actions
export default moviesSlice.reducer;