import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

interface RecentBooking {
  id: string;
  rideType: string;
  status: string;
}

export default function Home({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("Standard");
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  
  const createRideRequest = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "You must be logged in to request a ride.");
      return;
    }

    if (!pickup || !destination) {
      Alert.alert("Error", "Please enter both pickup and destination.");
      return;
    }

    try {
      setLoading(true);
      const rideRequest = {
        pickup,
        destination,
        rideType,
        status: "Pending",
        userRef: user.uid,
        requestedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "rideRequests"), rideRequest);

      Alert.alert("Success", "Your ride has been requested!");
      setModalVisible(false);
      setPickup("");
      setDestination("");
      setRideType("Standard");
    } catch (error: any) {
      console.error("Error creating ride request:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "rideRequests"),
      where("userRef", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recent: RecentBooking[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        rideType: doc.data().rideType,
        status: doc.data().status,
      }));
      setRecentBookings(recent);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hi, {auth.currentUser?.email || "Guest"}
        </Text>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.searchPlaceholder}>Where to?</Text>
      </TouchableOpacity>

    
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Rides</Text>

        {recentBookings.length === 0 ? (
          <Text style={{ color: "#777", marginTop: 10 }}>
            No recent rides yet.
          </Text>
        ) : (
          <FlatList
            data={recentBookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.locationItem}>
                <Ionicons name="car-outline" size={20} color="#fff" />
                <Text style={styles.locationText}>
                  {item.rideType} - {item.status}
                </Text>
              </View>
            )}
          />
        )}
      </View>

  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Request a Ride</Text>

            <TextInput
              style={styles.input}
              placeholder="Pickup Location"
              placeholderTextColor="#999"
              value={pickup}
              onChangeText={setPickup}/>

            <TextInput
              style={styles.input}
              placeholder="Destination"
              placeholderTextColor="#999"
              value={destination}
              onChangeText={setDestination}/>

            <Text style={styles.label}>Select Ride Type</Text>
            <View style={styles.rideTypeContainer}>
              {["Standard", "Premium", "XL"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.rideTypeButton,
                    rideType === type && styles.selectedRideType,
                  ]}
                  onPress={() => setRideType(type)}>
                  <Text
                    style={[
                      styles.rideTypeText,
                      rideType === type && styles.selectedRideTypeText,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={createRideRequest}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.confirmText}>Confirm Ride</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  profileBtn: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
  },
  searchPlaceholder: {
    color: "#000",
    fontSize: 16,
    width: "100%",
  },
  recentContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "#111",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    marginBottom: 12,
    fontSize: 16,
  },
  label: {
    color: "#aaa",
    marginBottom: 8,
    marginTop: 10,
  },
  rideTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  rideTypeButton: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedRideType: {
    backgroundColor: "#fff",
  },
  rideTypeText: {
    color: "#fff",
  },
  selectedRideTypeText: {
    color: "#000",
    fontWeight: "600",
  },
  confirmBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#aaa",
    fontSize: 14,
  },
});
