import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

import SearchBar from "@/components/SearchBar";
import FilteredTodos from "@/components/FilteredTodos";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <SearchBar onSubmit={setSearchText} />
      </View>
      <FilteredTodos searchText={searchText} />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  searchHeader: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});