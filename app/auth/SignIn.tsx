import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface SignInProps {
  handleAuth: () => void;
}

export default function SignIn({ handleAuth }: SignInProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleMode = () => setIsRegister(!isRegister);

  const handleSubmit = () => {
    if (isRegister && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleAuth();
  };

  return (
    <View style={styles.container}>
      {/* Logo and Slogan */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>ZG</Text>
        </View>
        <Text style={styles.slogan}>Fast. Reliable. Everywhere.</Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>
          {isRegister
            ? "Create your ZoomGo account"
            : "Sign in to continue your ride"}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {isRegister && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}/>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}/>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}/>

        {isRegister && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}/>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isRegister ? "Register" : "Login"}</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isRegister ? "Already have an account? " : "Don’t have an account? "}
          <Text style={styles.footerLink} onPress={toggleMode}>
            {isRegister ? "Login" : "Register"}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 25,
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
  slogan: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    textAlign: "center",
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  subtitleText: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  inputContainer: {
    gap: 18,
  },
  input: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    marginTop: 25,
    alignItems: "center",
  },
  footerText: {
    color: "#888",
  },
  footerLink: {
    color: "#fff",
    fontWeight: "600",
  },
});
