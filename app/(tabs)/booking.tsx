import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { auth, db } from "../config/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

interface Booking {
  id: string;
  pickup: string;
  destination: string;
  rideType: string;
  status: "Pending" | "Approved";
  price?: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [priceModalVisible, setPriceModalVisible] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [price, setPrice] = useState<string>("");


  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "rideRequests"),
      where("userRef", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userBookings: Booking[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        pickup: doc.data().pickup,
        destination: doc.data().destination,
        rideType: doc.data().rideType,
        status: doc.data().status,
        price: doc.data().price,
      }));
      setBookings(userBookings);
    });

    return () => unsubscribe();
  }, []);

  
  const handleSavePrice = async () => {
    if (!selectedBooking || !price) {
      Alert.alert("Error", "Please enter a price.");
      return;
    }

    try {
      const bookingRef = doc(db, "rideRequests", selectedBooking.id);
      await updateDoc(bookingRef, {
        price,
        status: "Approved",
      });

      Alert.alert("Success", "Ride confirmed and approved.");
      setPrice("");
      setSelectedBooking(null);
      setPriceModalVisible(false);
    } catch (error: any) {
      console.error("Error updating booking:", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleConfirmPress = (booking: Booking) => {
    setSelectedBooking(booking);
    setPriceModalVisible(true);
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.detailsContainer}>
        <Text style={styles.pickupText}>
          {item.pickup} ➜ {item.destination}
        </Text>
        <Text style={styles.infoText}>Type: {item.rideType}</Text>

        <Text
          style={[
            styles.status,
            item.status === "Pending" ? styles.pending : styles.approved,
          ]}>
          {item.status}
        </Text>

        {item.price && <Text style={styles.priceText}>${item.price}</Text>}
      </View>

      {item.status === "Pending" && (
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => handleConfirmPress(item)}>
          <Text style={styles.confirmText}>Confirm & Pay</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Bookings</Text>

      {bookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}/>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={priceModalVisible}
        onRequestClose={() => setPriceModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Ride Price</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 25.00"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}/>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSavePrice}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setPriceModalVisible(false)}>
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
    padding: 16,
  },
  pageTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginVertical:50
  },
  bookingCard: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#222",
  },
  detailsContainer: {
    marginBottom: 10,
  },
  pickupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  infoText: {
    color: "#aaa",
    marginTop: 4,
  },
  status: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    fontSize: 14,
  },
  pending: {
    backgroundColor: "#333",
    color: "#fff",
  },
  approved: {
    backgroundColor: "#fff",
    color: "#000",
  },
  priceText: {
    color: "#fff",
    marginTop: 6,
    fontSize: 15,
  },
  confirmBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#000",
    fontWeight: "600",
  },
  noBookingsText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 40,
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
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
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
