import { useCallback, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";

import Header from "@/components/Header";
import AddTodoModal from "@/components/AddTodoModal";
import { CustomIcon } from "@/components/ui/CustomIcon";
import TodoItem from "@/components/TodoItem";

import todo from "@/assets/lotties/todo.json";
import getTodos from "@/api/todos";

export default function Home() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  });
  const modalRef = useRef<BottomSheetModal>(null);

  const handleSaveTodo = () => {
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


  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        ListEmptyComponent={renderEmptyList}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <CustomIcon name="plus" color="#fbfbfb" size={18} />
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