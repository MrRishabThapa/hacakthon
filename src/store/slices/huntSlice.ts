import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HuntItem {
  id: string;
  name: string;
  area: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  points: number;
  description: string;
  isFound: boolean;
  foundAt?: string;
}

interface HuntState {
  items: HuntItem[];
  foundItems: string[];
  totalScore: number;
  scanning: boolean;
}

const initialState: HuntState = {
  items: [
    {
      id: '1',
      name: 'Ancient Temple Bell',
      area: 'Kathmandu Valley',
      image: '/placeholder.svg',
      difficulty: 'Medium',
      points: 150,
      description: 'Find the sacred bell in the ancient temple courtyard',
      isFound: false,
    },
    {
      id: '2',
      name: 'Prayer Wheel Collection',
      area: 'Pokhara',
      image: '/placeholder.svg',
      difficulty: 'Easy',
      points: 100,
      description: 'Locate the traditional prayer wheels by the lake',
      isFound: false,
    },
    {
      id: '3',
      name: 'Mountain View Point',
      area: 'Annapurna Circuit',
      image: '/placeholder.svg',
      difficulty: 'Hard',
      points: 300,
      description: 'Reach the secret viewpoint with panoramic mountain views',
      isFound: false,
    },
  ],
  foundItems: [],
  totalScore: 0,
  scanning: false,
};

const huntSlice = createSlice({
  name: 'hunt',
  initialState,
  reducers: {
    startScanning: (state) => {
      state.scanning = true;
    },
    stopScanning: (state) => {
      state.scanning = false;
    },
    foundItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && !item.isFound) {
        item.isFound = true;
        item.foundAt = new Date().toISOString();
        state.foundItems.push(action.payload);
        state.totalScore += item.points;
      }
    },
    resetHunt: (state) => {
      state.foundItems = [];
      state.totalScore = 0;
      state.items.forEach(item => {
        item.isFound = false;
        delete item.foundAt;
      });
    },
  },
});

export const { startScanning, stopScanning, foundItem, resetHunt } = huntSlice.actions;
export default huntSlice.reducer;