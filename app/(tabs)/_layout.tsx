import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SignIn from "../auth/SignIn";

export default function _Layout() {
  const [auth, setAuth] = useState(false);

  function authSuccess() {
    setAuth(true);
  }

  if (!auth) return <SignIn authSuccess={authSuccess} />;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#222",
          height: 100,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#777",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "index") iconName = focused ? "home" : "home-outline";
          else if (route.name === "booking")
            iconName = focused ? "car" : "car-outline";
          else if (route.name === "about")
            iconName = focused ? "information-circle" : "information-circle-outline";
          else if (route.name === "profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}/>
      <Tabs.Screen
        name="booking"
        options={{
          title: "Bookings",
        }}/>
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
        }}/>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}/>
    </Tabs>
  );
}
