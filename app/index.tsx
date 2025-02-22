import { useCallback, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Todo } from "@/types";

import Header from "@/components/Header";
import AddTodoModal from "@/components/AddTodoModal";
import { IconSymbol } from "@/components/ui/IconSymbol";

import todo from "@/assets/lotties/todo.json";
import useTodoStore from "@/stores/todos";

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const modalRef = useRef<BottomSheetModal>(null);

  const handleSaveTodo = (todo: Todo) => {

    if (todo) {
      addTodo(todo);
    }

    modalRef.current?.close();
  }

  const handleAddTodo = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const renderEmptyList = useCallback(() => (
    <View style={styles.emptyContainer}>
      <LottieView
        source={todo}
        style={styles.lottie}
        autoPlay
        loop={false}
      />
      <Text style={styles.emptyTitle}>Aún no tienes tareas</Text>
      <Text style={styles.emptyText}>Agrega tareas tocando el botón con el símbolo +</Text>
    </View>
  ), []);

  const renderItem = useCallback((todo: Todo) => (
    <TouchableOpacity
      style={styles.todoItem}
    >
      <IconSymbol name={todo.completed ? "checkmark.circle.fill" : "circle"} color="#000" />
      <Text style={styles.todoItemText}>
        {todo.title}
      </Text>
    </TouchableOpacity>
  ), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={renderEmptyList}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <IconSymbol name="plus" color="#fbfbfb" size={18} />
        </TouchableOpacity>
      </View>
      
      <AddTodoModal
        modalRef={modalRef}
        onSave={handleSaveTodo}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  lottie: {
    width: "100%",
    height: 280,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    textAlign: "center",
    color: "#2b2c2d"
  },
  emptyText: {
    fontSize: 12,
    fontFamily: "Roboto",
    textAlign: "center",
    color: "#d3d3d3"
  },
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
  listContainer: {
    flex: 1
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"

  },
  addButton: {
    padding: 10,
    borderRadius: 9999,
    width: 40,
    height: 40,
    backgroundColor: "#25262b",
    justifyContent: "center",
    alignItems: "center"
  },
});