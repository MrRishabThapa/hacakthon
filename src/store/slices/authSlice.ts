import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  score: number;
  tier: 'Rookie' | 'Explorer' | 'Adventurer' | 'Expert Explorer' | 'Legend';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.score += action.payload;
        // Update tier based on score
        if (state.user.score >= 10000) state.user.tier = 'Legend';
        else if (state.user.score >= 5000) state.user.tier = 'Expert Explorer';
        else if (state.user.score >= 2000) state.user.tier = 'Adventurer';
        else if (state.user.score >= 500) state.user.tier = 'Explorer';
        else state.user.tier = 'Rookie';
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateScore } = authSlice.actions;
export default authSlice.reducer;