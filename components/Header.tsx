import { StyleSheet, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Taskit</Text>
      <View style={styles.headerIcons}>
        <IconSymbol name="magnifyingglass" color="#2b2c2d" size={18} />
        <IconSymbol name="bell" color="#2b2c2d" size={18} />
        <IconSymbol name="line.3.horizontal" color="#2b2c2d" size={18} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  headerTitle: {
    fontFamily: "RobotoBold",
    fontSize: 18
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
})