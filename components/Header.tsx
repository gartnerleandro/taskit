import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { supabase } from "@/lib/supabase";
import { CustomIcon } from "./ui/CustomIcon";

export default function Header() {
  const logout = () => {
    supabase.auth.signOut();
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Taskit</Text>
      <View style={styles.headerIcons}>
        <CustomIcon name="search" color="#2b2c2d" size={18} />
        <CustomIcon name="bell" color="#2b2c2d" size={18} />
        <TouchableOpacity onPress={logout}>
          <CustomIcon name="logout" color="#2b2c2d" size={18} />
        </TouchableOpacity>
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