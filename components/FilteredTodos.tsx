import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";

import TodoItem from "@/components/TodoItem";

import { getFilteredTodos } from "@/api/todos";

export default function FilteredTodos({ searchText }: { searchText: string }) {
  const { data: filteredTodos } = useQuery({
    queryKey: ["todos", searchText],
    queryFn: () => getFilteredTodos(searchText)
  });
  

  return (
    <FlatList
      data={filteredTodos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TodoItem todo={item} />}
    />
  )
}