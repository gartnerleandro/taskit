import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { storage } from "./storage";
import { Todo } from "@/types";

type TodoStore = {
  todos: Todo[],
  addTodo: (todo: Todo) => void,
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo: Todo) => {
        set((state) => ({ todos: [...state.todos, todo]}))
      }
    }),
    {
      name: "todos-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useTodoStore;