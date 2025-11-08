import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>About ZoomGo</Text>
        </View>

        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>ZG</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.text}>
            ZoomGo a modern mobility platform that connects riders with drivers quickly,
            safely, and affordably. Our goal is to make every journey smooth, smart, and sustainable —
            powered by real-time technology and a passion for innovation.
          </Text>

          <Text style={styles.heading}>Who We Are</Text>
          <Text style={styles.text}>
            Founded in 2025, ZoomGo was created to redefine how people move around cities.
            Whether you’re commuting to work, catching a flight, or exploring new places,
            VeloRide ensures you get there with comfort and confidence.
          </Text>

          <Text style={styles.heading}>Why Choose VeloRide?</Text>
          <Text style={styles.text}>
            •  Fast and reliable rides, anytime, anywhere. {"\n"}
            • Easy payments — cashless and secure. {"\n"}
            • Built with real-time tracking and eco-friendly goals. {"\n"}
            • Drivers and riders connected through trust and transparency.
          </Text>

          <Text style={styles.heading}>Our Vision</Text>
          <Text style={styles.text}>
            To create a connected, cleaner, and more efficient transport network that
            empowers people and communities — one ride at a time.
          </Text>

          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.text}>
             123 Innovation Drive, San Francisco, CA{"\n"}
             support@veloride.com{"\n"}
            +1 (800) 555-VELO
          </Text>

          <Text style={styles.footer}>© 2025 VeloRide Technologies Inc.</Text>
        </View>
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
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  logoCircle: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#000",
    fontSize: 36,
    fontWeight: "800",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 6,
  },
  text: {
    color: "#aaa",
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    color: "#555",
    fontSize: 13,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
});
