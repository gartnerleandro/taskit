import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Todo } from "@/types";

import { IconSymbol } from "./ui/IconSymbol";


export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <TouchableOpacity
      style={styles.todoItem}
    >
      <IconSymbol name={todo.completed ? "checkmark.circle.fill" : "circle"} color="#000" />
      <View>
        <Text style={styles.todoItemText}>
          {todo.title}
        </Text>
        {todo.description && (
          <Text style={styles.todoItemDescription}>
            {todo.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3"
  },
  todoItemText: {
    color: "#2b2c2d"
  },
  todoItemDescription: {
    color: "#c8c8c8",
    fontSize: 12,
    fontFamily: "RobotoRegular"
  }
})