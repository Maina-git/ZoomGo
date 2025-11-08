import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 890",
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
    
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>


        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={50} color="#000" />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

  
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#fff" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#fff" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        </View>

    
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="card-outline" size={22} color="#fff" />
            <Text style={styles.optionText}>Payment Methods</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="time-outline" size={22} color="#fff" />
            <Text style={styles.optionText}>Ride History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#fff" />
            <Text style={styles.optionText}>Privacy & Security</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="help-circle-outline" size={22} color="#fff" />
            <Text style={styles.optionText}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="information-circle-outline" size={22} color="#fff" />
            <Text style={styles.optionText}>About VeloRide</Text>
          </TouchableOpacity>
        </View>

  
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  avatarCircle: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },
  userEmail: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  section: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  logoutBtn: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logoutText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
