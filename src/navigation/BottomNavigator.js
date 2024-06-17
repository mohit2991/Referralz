import { View, Text, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { useNavigation } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Bottom=createBottomTabNavigator()
const BottomNavigator = () => {
    const navigation = useNavigation()

  
    
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
           
        </ScrollView>
    )
}
const styles = StyleSheet.create({
   

});

export default BottomNavigator