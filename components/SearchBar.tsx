import { StyleSheet, TextInput } from "react-native";

export default function SearchBar({ onSubmit } : { onSubmit: (text: string) => void}) {
  return (
    <TextInput
      placeholder="Buscar tarea"
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus={true}
      returnKeyType="search"
      style={styles.searchBar}
      onSubmitEditing={(event) => onSubmit(event.nativeEvent.text)}
    />
  )
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#fbfbfb",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontSize: 16,
    fontFamily: "RobotoRegular",
    flex: 1,
  }
})