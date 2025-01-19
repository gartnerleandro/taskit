import { ForwardedRef, useCallback, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";

import uuid from 'react-native-uuid';

import { Todo } from '@/types';

export default function AddTodoModal({
  modalRef,
  onSave,
} : {
  modalRef: ForwardedRef<BottomSheetModal>,
  onSave: (todo: Todo) => void
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const reset = () => {
    setTitle("");
    setDescription("");
  }

  const onSubmit = () => {
    onSave({
      title,
      description,
      id: uuid.v4(),
      completed: false,
    })
  }

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="close"
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  ), []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={modalRef}
        enableDynamicSizing={true}
        enablePanDownToClose
        enableDismissOnClose
        onDismiss={reset}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.backgroundModal}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.addTodoTitle}>Agrega una tarea</Text>
          </View>

          <TextInput
            onChangeText={setTitle}
            placeholder="¿Qué tarea quieres hacer?*"
            placeholderTextColor="#d3d3d3"
            value={title}
            style={styles.inputTodo}
          />
 
          <TextInput
            onChangeText={setDescription}
            placeholder="¿En qué consiste la tarea?"
            placeholderTextColor="#d3d3d3"
            value={description}
            style={styles.inputTodo}
          />

          <TouchableOpacity style={styles.saveTodo} onPress={onSubmit}>
            <Text>Guardar tarea</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  backgroundModal: {
    backgroundColor: "#fbfbfb"
  },
  contentContainer: {
    flex: 1,
    gap: 10,
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 30
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addTodoTitle: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#2b2c2d"
  },
  inputTodo: {
    backgroundColor: "#fbfbfb",
    borderColor: "transparent",
    borderWidth: 1,
    color: "#2b2c2d",
    borderRadius: 8,
    height: 40,
    padding: 8,
    shadowColor: "#2b2c2d",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  saveTodo: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  }
});