import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  value: number;
}

const initialState: TestState = {
  value: 0,
}

const testSlice = createSlice({
  name: 'Test',
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    }
  }
});

export const { incremented, amountAdded } = testSlice.actions;
export default testSlice.reducer;