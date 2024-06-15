import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
const CreateAccount = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [companycode, setCompanycode] = useState("");
  const [password, setPassword] = useState("");
  const [describe, setDescribe] = useState(true);
  const [havecompanycode, setHavecompanycode] = useState(true);
  const [passwordtrue, setPasswordtrue] = useState(true);
  const [confirmpasswordtrue, setConfirmpasswordtrue] = useState(true);

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);
  const handleClickForSignin = () => {
    navigation.navigate("Login");
  };
  const clickHomeowner = () => {
    setDescribe(false);
  };
  const clickReferalparter = () => {
    setDescribe(true);
  };
  const clickHaveCompanyCode = () => {
    setHavecompanycode(true);
  };

  const clickDontHaveCompanyCode = () => {
    setHavecompanycode(false);
  };
  const hitForSuccessfullySignup = () => {
    navigation.navigate("SuccessfullySignup");
  };
  const clickChangePasswordIcon = () => {
    if (passwordtrue) {
      setPasswordtrue(false);
    } else {
      setPasswordtrue(true);
    }
  };
  const clickChangeConfirmPasswordIcon = () => {
    if (confirmpasswordtrue) {
      setConfirmpasswordtrue(false);
    } else {
      setConfirmpasswordtrue(true);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView></SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            color: "#3B4248",
            fontWeight: "700",
            fontFamily: "Montserrat-Regular",
            marginTop: 26,
          }}
        >
          Create a Referralz account
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#555B61",
            fontWeight: "400",
            fontFamily: "Montserrat-Regular",
            marginTop: 12,
          }}
        >
          Refer, track, and earn with ease.
        </Text>
        <View style={styles.inputStyle}>
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            underlineColor="transparent"
            theme={{ colors: { primary: "#ffffff" } }}
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            style={styles.input}
            label="First Name"
            value={firstname}
            onChangeText={(firstname) => setFirstname(firstname)}
            underlineColor="transparent"
            theme={{ colors: { primary: "#ffffff" } }}
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            style={styles.input}
            label="Last Name"
            value={lastname}
            onChangeText={(lastname) => setLastname(lastname)}
            underlineColor="transparent"
            theme={{ colors: { primary: "#ffffff" } }}
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            style={{
              width: Width / 1.22,
              backgroundColor: "#FFFFFF",
              height: 50,
              borderRadius: 9,
              color: "#9B9EA1",
              fontSize: 16,
              fontWeight: "400",
            }}
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={passwordtrue}
            underlineColor="transparent"
            theme={{ colors: { primary: "#ffffff" } }}
          />
          <TouchableOpacity style={{}} onPress={clickChangePasswordIcon}>
            <Image
              source={
                passwordtrue
                  ? require("../images/password_icon.png")
                  : require("../images/radio_tick.png")
              }
              style={{ height: 24, width: 24, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            style={{
              width: Width / 1.22,
              backgroundColor: "#FFFFFF",
              height: 50,
              borderRadius: 9,
              color: "#9B9EA1",
              fontSize: 16,
              fontFamily: "Montserrat-Regular",
              fontWeight: "400",
            }}
            label="Confirm Password"
            value={confirmpassword}
            onChangeText={(confirmpassword) =>
              setConfirmpassword(confirmpassword)
            }
            secureTextEntry={confirmpasswordtrue}
            underlineColor="transparent"
            theme={{ colors: { primary: "#ffffff" } }}
          />
          <TouchableOpacity style={{}} onPress={clickChangeConfirmPasswordIcon}>
            <Image
              source={
                confirmpasswordtrue
                  ? require("../images/password_icon.png")
                  : require("../images/radio_tick.png")
              }
              style={{ height: 24, width: 24, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: Width / 1.1, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 17,
              color: "black",
              fontFamily: "Montserrat-Regular",
              fontWeight: "600",
              marginTop: 12,
            }}
          >
            Describe yourself
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: Width / 1.1,
              justifyContent: "space-between",
              marginTop: 12,
            }}
            onPress={clickHomeowner}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#3B4248",
                fontFamily: "Montserrat-Regular",
                fontWeight: "400",
              }}
            >
              Homeowner
            </Text>
            <Image
              source={
                describe == true
                  ? require("../images/radio_empty.png")
                  : require("../images/radio_tick.png")
              }
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: Width / 1.1,
              justifyContent: "space-between",
              marginTop: 12,
            }}
            onPress={clickReferalparter}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#3B4248",
                fontFamily: "Montserrat-Regular",
                fontWeight: "400",
              }}
            >
              Referral partner
            </Text>
            <Image
              source={
                describe == false
                  ? require("../images/radio_empty.png")
                  : require("../images/radio_tick.png")
              }
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {describe == true ? (
        <View>
          <View style={{ alignItems: "center" }}>
            <View style={{ width: Width / 1.1, marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 17,
                  color: "black",
                  fontFamily: "Montserrat-Regular",
                  fontWeight: "600",
                  marginTop: 12,
                }}
              >
                Do you have a company code?
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: Width / 1.1,
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
                onPress={clickHaveCompanyCode}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#3B4248",
                    fontFamily: "Montserrat-Regular",
                    fontWeight: "400",
                  }}
                >
                  Yes
                </Text>
                <Image
                  source={
                    havecompanycode == true
                      ? require("../images/radio_tick.png")
                      : require("../images/radio_empty.png")
                  }
                  style={{ height: 24, width: 24 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: Width / 1.1,
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
                onPress={clickDontHaveCompanyCode}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#3B4248",
                    fontFamily: "Montserrat-Regular",
                    fontWeight: "400",
                  }}
                >
                  No
                </Text>
                <Image
                  source={
                    havecompanycode == true
                      ? require("../images/radio_empty.png")
                      : require("../images/radio_tick.png")
                  }
                  style={{ height: 24, width: 24 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {havecompanycode == true ? (
            <View style={{ alignItems: "center" }}>
              <View style={styles.inputStyle}>
                <TextInput
                  style={styles.input}
                  label="Company code"
                  value={companycode}
                  onChangeText={(companycode) => setCompanycode(companycode)}
                  underlineColor="transparent"
                  theme={{ colors: { primary: "#ffffff" } }}
                />
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View></View>
      )}
      <View style={{ alignItems: "center" }}>
        <View
          style={{ alignItems: "center", width: Width / 1.1, marginTop: 20 }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#3B4248",
              fontFamily: "Montserrat-Regular",
              fontWeight: "400",
              marginTop: 12,
            }}
          >
            By clicking “Agree and continue”, You agree to Referralz’s{" "}
            <Text
              style={{
                fontSize: 16,
                color: "#3B4248",
                fontFamily: "Montserrat-Regular",
                fontWeight: "400",
                marginTop: 12,
                textDecorationLine: "underline",
              }}
            >
              Terms of Service{" "}
            </Text>{" "}
            and{" "}
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontFamily: "Montserrat-Regular",
                fontWeight: "400",
                marginTop: 12,
                textDecorationLine: "underline",
              }}
            >
              Privacy Policy.{" "}
            </Text>{" "}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: Width / 1.1,
            borderRadius: 8,
            height: 52,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#E16032",
          }}
          onPress={hitForSuccessfullySignup}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              fontFamily: "Montserrat-Regular",
              fontWeight: "400",
            }}
          >
            Create account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            width: Width / 1.1,
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#3B4248",
              fontFamily: "Montserrat-Regular",
              fontWeight: "400",
              alignSelf: "center",
            }}
          >
            Already have an account
            <TouchableOpacity
              style={{ width: 80, marginLeft: 12, marginTop: -2 }}
              onPress={handleClickForSignin}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#3B4248",
                  fontFamily: "Montserrat-Regular",
                  fontWeight: "400",
                  alignSelf: "center",
                  textDecorationLine: "underline",
                  marginLeft: 1,
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
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
    marginTop: 18,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
  },
  input: {
    width: Width / 1.11,
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 9,
    color: "#9B9EA1",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
  },
});

export default CreateAccount;
