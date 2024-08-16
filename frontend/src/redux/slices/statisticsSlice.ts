import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Statistic {
  metric: string;
  value: number;
}

interface AnalyticsState {
  statistics: Statistic[];
  error: string | null;
}

const initialState: AnalyticsState = {
  statistics: [],
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    fetchStatisticsSuccess: (state, action: PayloadAction<Statistic[]>) => {
      state.statistics = action.payload;
      state.error = null;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchStatisticsSuccess, fetchStatisticsFailure } = analyticsSlice.actions;
export default analyticsSlice.reducer;
