import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

export const getNotes = createAsyncThunk("notes/list", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await noteService.getNotes(id, token);
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createNote = createAsyncThunk(
  "notes/create",
  async (noteObj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteObj.noteText, noteObj.id, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const createNote = createAsyncThunk("notes/create", async () => {
//   console.log("inside create note");
//   return null;
//   // try {
//   //   console.log("inside try");
//   //   const token = thunkAPI.getState().auth.user.token;
//   //   return await noteService.createNote(note, id, token);
//   // } catch (error) {
//   //   const message =
//   //     (error.message && error.response.data && error.response.data.message) ||
//   //     error.message ||
//   //     error.toString();

//   //   return thunkAPI.rejectWithValue(message);
//   // }
// });

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.isLoading = false;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.isLoading = false;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
