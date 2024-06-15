import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
const SuccessfullySignup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);
  const handleClickForGoBack = () => {
    navigation.navigate("CreateAccount");
  };

  const clickOpeninbox = () => {
    navigation.navigate("InboxCheck");
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView></SafeAreaView>
      <View style={{ alignItems: "center", marginTop: 25 }}>
        <View style={{ width: Width / 1.1 }}>
          <TouchableOpacity
            style={{ justifyContent: "center", height: 40, width: 40 }}
            onPress={handleClickForGoBack}
          >
            <Image
              source={require("../images/back_arrow.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View
          style={{ width: Width, height: 0.6, backgroundColor: "#3B4248" }}
        ></View>
      </View>
      <View
        style={{ alignItems: "center", width: Width / 1.1, marginTop: 100 }}
      >
        <View
          style={{
            height: 124,
            width: 124,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(200,200,200,200)",
          }}
        >
          <Image
            source={require("../images/password_icon.png")}
            style={{ height: 64, width: 64 }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={{ width: Width / 1.1 }}>
            <Text
              style={{
                fontSize: 20,
                color: "#3B4248",
                fontWeight: "700",
                fontFamily: "Montserrat-Regular",
                marginTop: 16,
              }}
            >
              Congratulations!{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#555B61",
                fontWeight: "400",
                fontFamily: "Montserrat-Regular",
                marginTop: 16,
              }}
            >
              Your registration has been completed successfully. An email with
              instructions to activate your membership has been sent to you.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          style={{
            width: Width / 2.5,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#E16032",
            height: 52,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
          onPress={clickOpeninbox}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#E16032",
              fontFamily: "Montserrat-Regular",
              fontWeight: "400",
            }}
          >
            Open inbox
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    width: Width / 1.1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3B4248",
    height: 56,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
  },
  input: {
    width: Width / 1.11,
    backgroundColor: "#ffffff",
    height: 46,
  },
});

export default SuccessfullySignup;
