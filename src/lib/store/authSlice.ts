import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
        emailVerified: boolean;
    } | null;
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<AuthState['user']> | null>) => {
            state.isAuthenticated = !!action.payload;
            state.user = action.payload
                ? {
                    uid: action.payload.uid ?? '',
                    email: action.payload.email ?? null,
                    displayName: action.payload.displayName ?? null,
                    photoURL: action.payload.photoURL ?? null,
                    emailVerified: action.payload.emailVerified ?? false,
                }
                : null;
        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});



export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;