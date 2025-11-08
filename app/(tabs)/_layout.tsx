import { Tabs } from "expo-router";
import React from "react";
import { useState } from "react";
import SignIn from "../auth/SignIn";

export default function _Layout() {

const [auth, setAuth] = useState(false);

function handleAuth(){
  setAuth(true);
}

if(!auth) return <SignIn handleAuth={handleAuth} />

return (
    <Tabs 
    screenOptions={{ 
        headerShown: false,
        tabBarInactiveTintColor: "#999",
        }}>
      <Tabs.Screen name="/index" options={{ title:"index"}}/>
      <Tabs.Screen name="/booking" options={{ title:"booking"}}/>
      <Tabs.Screen name="/profile" options={{ title:"profile"}}/>
      <Tabs.Screen name="/about" options={{ title:"settings"}}/>
    </Tabs>
  );
}
