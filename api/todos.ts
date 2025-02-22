import { supabase } from "@/lib/supabase";
import { Todo } from "@/types";

export default async function getTodos() {
  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function createTodo(todo: Todo) {
  const { data: userSession } = await supabase.auth.getSession();
  const { data, error } = await supabase.from("todos").insert({
    ...todo,
    user_id: userSession.session?.user.id
  });

  if (error) {
    throw error;
  }

  return data;
}