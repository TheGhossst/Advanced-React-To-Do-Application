import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { RootState } from './store'

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  important: boolean;
  userId: string;
  listId?: string;
  dueDate?: string;
  dueTime?: string;
  reminder?: string;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'none';
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
}

export type TaskList = {
  id: string;
  name: string;
  tasks: string[];
};

interface TaskState {
  tasks: Task[]
  lists: TaskList[]
  activeList: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  selectedTask: string | null
}

const initialState: TaskState = {
  tasks: [],
  lists: [
    { id: 'all', name: 'All Tasks', tasks: [] },
    { id: 'today', name: 'Today', tasks: [] },
    { id: 'important', name: 'Important', tasks: [] },
    { id: 'planned', name: 'Planned', tasks: [] },
    { id: 'assigned', name: 'Assigned to me', tasks: [] },
  ],
  activeList: 'today',
  status: 'idle',
  error: null,
  selectedTask: null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId: string) => {
  try {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
    
    // Store in localStorage as backup
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Try to load from localStorage if Firebase fails
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>, { getState }) => {
  try {
    const state = getState() as RootState;
    const userId = state.auth.user?.uid;
    if (!userId) throw new Error('User not authenticated');

    const newTask = {
      ...task,
      userId,
      priority: task.priority || 'medium',
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    const createdTask = { id: docRef.id, ...newTask } as Task;
    
    // Update localStorage
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    localStorage.setItem('tasks', JSON.stringify([...tasks, createdTask]));
    
    return createdTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
  try {
    const { id, ...updateData } = task;
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, updateData);
    
    // Update localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      const updatedTasks = tasks.map((t: Task) => t.id === id ? task : t);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    return task;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    
    // Update localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      const updatedTasks = tasks.filter((t: Task) => t.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    return taskId;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setActiveList: (state, action: PayloadAction<string>) => {
      state.activeList = action.payload
    },
    setSelectedTask: (state, action: PayloadAction<string | null>) => {
      state.selectedTask = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload)
      })
  }
})

export const { setActiveList, setSelectedTask } = taskSlice.actions
export default taskSlice.reducer