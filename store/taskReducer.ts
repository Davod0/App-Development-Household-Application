import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../data";

const initialState: Task = {
  id: "",
  householdId: "",
  name: "",
  description: "",
  weight: 0,
  frequency: 0,
  isArchived: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
