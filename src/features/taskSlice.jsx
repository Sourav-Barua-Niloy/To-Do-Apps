import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: "All",
};

// Async thunk to fetch tasks from JSON
export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch("/task.json");
  const data = await response.json();

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description || "",
    status: task.completed ? "completed" : "To Do",
  }));
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    // Add or Edit a task
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index !== -1) {
        // Edit existing task
        state.tasks[index] = action.payload;
      } else {
        // Add new task
        state.tasks.push(action.payload);
      }
    },

    // Delete a task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { editTask, deleteTask } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
