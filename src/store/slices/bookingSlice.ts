import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingData {
  place: string;
  date: string;
  people: number;
  name: string;
  email: string;
  phone: string;
}

interface Booking extends BookingData {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingState {
  bookings: Booking[];
  currentBooking: BookingData | null;
  loading: boolean;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<BookingData>) => {
      state.currentBooking = action.payload;
    },
    addBooking: (state, action: PayloadAction<BookingData>) => {
      const newBooking: Booking = {
        ...action.payload,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      state.bookings.push(newBooking);
      state.currentBooking = null;
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: Booking['status'] }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { setCurrentBooking, addBooking, updateBookingStatus, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;