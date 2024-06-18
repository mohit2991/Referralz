import { Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getUserDetails } from '../services/apiService';
import Toast from 'react-native-toast-message';

const Dashboard = () => {
  const navigation = useNavigation();

  const getUserData = async () => {
    try {
      const response = await getUserDetails();
      console.log('User details response:', response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity
        style={{ width: 80, marginLeft: 12, marginTop: -2 }}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#3B4248',
            fontFamily: 'Montserrat-Regular',
            fontWeight: '400',
            alignSelf: 'center',
            textDecorationLine: 'underline',
            marginLeft: 1,
          }}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
