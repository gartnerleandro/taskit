import { ForwardedRef, useCallback } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import uuid from 'react-native-uuid';

import { Todo } from '@/types';

const AddTodoSchema = z.object({
  title: z.string({ required_error: "Obligatorio" }).min(2, {
    message: "El título debe terner al menos 2 caracteres"
  }),
  description: z.string().optional()
});

export default function AddTodoModal({
  modalRef,
  onSave,
} : {
  modalRef: ForwardedRef<BottomSheetModal>,
  onSave: (todo: Todo) => void
}) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Todo>({
    resolver: zodResolver(AddTodoSchema),
  });

  const onSubmit = async (data: Todo) => {
    onSave({
      ...data,
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

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value }}) => (
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={onChange}
                  placeholder="¿Qué tarea quieres hacer?*"
                  placeholderTextColor="#d3d3d3"
                  value={value}
                  style={[
                    styles.inputTodo,
                    {
                      borderColor: errors.title ? "#a61414" : "transparent"
                    }
                  ]}
                />
                {!!errors.title && (
                  <Text style={styles.errorMessage}>
                    {errors.title?.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value }}) => (
              <TextInput
                onChangeText={onChange}
                placeholder="¿En qué consiste la tarea?"
                placeholderTextColor="#d3d3d3"
                value={value}
                style={styles.inputTodo}
              />
            )}
          />


          <TouchableOpacity style={styles.saveTodo} onPress={handleSubmit(onSubmit)}>
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
  },
  inputContainer: {
    position: "relative"
  },
  errorMessage: {
    color: "#9e0606",
    fontSize: 12,
    position: "absolute",
    left: 5,
    top: -8,
    backgroundColor: "#ffffff"
  }
});