"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { taskService } from "@/lib/tasks";

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: "all",
    category: "all",
    search: "",
  },
  stats: {
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  },
};

// Action types
const TASK_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_FILTERS: "SET_FILTERS",
  UPDATE_STATS: "UPDATE_STATS",
};

// Helper function to calculate stats
const calculateStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const pending = tasks.filter((task) => task.status === "Pending").length;

  return { total, completed, inProgress, pending };
};

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TASK_ACTIONS.SET_TASKS:
      const stats = calculateStats(action.payload);
      return {
        ...state,
        tasks: action.payload,
        stats,
        loading: false,
        error: null,
      };
    case TASK_ACTIONS.ADD_TASK:
      const newTasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: newTasks,
        stats: calculateStats(newTasks),
      };
    case TASK_ACTIONS.UPDATE_TASK:
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        stats: calculateStats(updatedTasks),
      };
    case TASK_ACTIONS.DELETE_TASK:
      const filteredTasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        stats: calculateStats(filteredTasks),
      };
    case TASK_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case TASK_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case TASK_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks
  const fetchTasks = useCallback(async (params = {}) => {
    try {
      dispatch({ type: TASK_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });

      const data = await taskService.getTasks(params);
      dispatch({ type: TASK_ACTIONS.SET_TASKS, payload: data.tasks });

      return { success: true, data };
    } catch (error) {
      dispatch({
        type: TASK_ACTIONS.SET_ERROR,
        payload: error.message || "Failed to fetch tasks",
      });
      return { success: false, error: error.message };
    }
  }, []);

  // Create task
  const createTask = useCallback(async (taskData) => {
    try {
      dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });

      const task = await taskService.createTask(taskData);
      dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: task });

      return { success: true, task };
    } catch (error) {
      dispatch({
        type: TASK_ACTIONS.SET_ERROR,
        payload: error.message || "Failed to create task",
      });
      return { success: false, error: error.message };
    }
  }, []);

  // Update task
  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });

      const task = await taskService.updateTask(taskId, taskData);
      dispatch({ type: TASK_ACTIONS.UPDATE_TASK, payload: task });

      return { success: true, task };
    } catch (error) {
      dispatch({
        type: TASK_ACTIONS.SET_ERROR,
        payload: error.message || "Failed to update task",
      });
      return { success: false, error: error.message };
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (taskId) => {
    try {
      dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });

      await taskService.deleteTask(taskId);
      dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: taskId });

      return { success: true };
    } catch (error) {
      dispatch({
        type: TASK_ACTIONS.SET_ERROR,
        payload: error.message || "Failed to delete task",
      });
      return { success: false, error: error.message };
    }
  }, []);

  // Get random task
  const getRandomTask = useCallback(async (category = null) => {
    try {
      dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });

      const task = await taskService.getRandomTask(category);
      return { success: true, task };
    } catch (error) {
      dispatch({
        type: TASK_ACTIONS.SET_ERROR,
        payload: error.message || "No tasks found for spinning wheel",
      });
      return { success: false, error: error.message };
    }
  }, []);

  // Set filters
  const setFilters = useCallback((filters) => {
    dispatch({ type: TASK_ACTIONS.SET_FILTERS, payload: filters });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });
  }, []);

  // Get filtered tasks
  const getFilteredTasks = useCallback(() => {
    let filtered = state.tasks;

    // Filter by status
    if (state.filters.status !== "all") {
      filtered = filtered.filter(
        (task) => task.status === state.filters.status
      );
    }

    // Filter by category
    if (state.filters.category !== "all") {
      filtered = filtered.filter(
        (task) => task.category === state.filters.category
      );
    }

    // Filter by search term
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [state.tasks, state.filters]);

  const value = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    getRandomTask,
    setFilters,
    clearError,
    getFilteredTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use task context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export default TaskContext;
