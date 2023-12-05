import { Ticket } from '@/type';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { TicketFetchResponseType, getTickets } from '@/api/aviasales';
export type sortType = 'price' | 'duration' | 'optinal';
type initalStateType = {
  tickets: Ticket[];
  loading: boolean;
  errors: boolean;
  stop: boolean;
  filter: filter[];
  sort: sortType;
};
export type filter = {
  name: string;
  tranferCount: number;
  value: boolean;
};
const initialState: initalStateType = {
  tickets: [],
  loading: true,
  errors: false,
  stop: false,
  sort: 'price',
  filter: [
    {
      name: `Без пересадок`,
      tranferCount: 0,
      value: true,
    },
    {
      name: '1 пересадка',
      value: true,
      tranferCount: 1,
    },
    {
      name: '2 пересадки',
      value: true,
      tranferCount: 2,
    },
    {
      name: '3 пересадки',
      value: true,
      tranferCount: 3,
    },
  ],
};
export const fetchTickets = createAsyncThunk<TicketFetchResponseType>(`ticket/fetchTicket`, async () => {
  const data = await getTickets();
  return data;
});
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    updateSort: (state, action: PayloadAction<sortType>) => {
      state.sort = action.payload;
    },
    updateReceived: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    updaAllFilter: (state, action: PayloadAction<boolean>) => {
      state.filter = state.filter.map((el) => {
        return { ...el, value: action.payload };
      });
    },
    updateFilter: (state, action: PayloadAction<filter>) => {
      const { name, value } = action.payload;
      const newValue = !value;
      state.filter = state.filter.map((filter) => {
        if (filter.name === name) return { ...filter, value: newValue };
        return filter;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
      state.errors = false;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      const { tickets, stop } = action.payload;
      state.loading = false;
      state.stop = stop;
      state.tickets = [...state.tickets, ...tickets];
    });
    builder.addCase(fetchTickets.rejected, (state) => {
      state.errors = true;
    });
  },
});
export const { updateReceived, updateFilter, updaAllFilter, updateSort } = ticketSlice.actions;
export const selectTickets = (state: RootState) => state.tickets.tickets;
export const selectSort = (state: RootState) => state.tickets.sort;
export const selectStop = (state: RootState) => state.tickets.stop;
export const selectFilter = (state: RootState) => state.tickets.filter;
export const selectLoading = (state: RootState) => state.tickets.loading;
export const selectError = (state: RootState) => state.tickets.errors;
export default ticketSlice.reducer;
