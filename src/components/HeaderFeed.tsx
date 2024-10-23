import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


import logo from '../../assets/splash.png';
import { colorPrimary } from '../constants/constants';

export default function HeaderFeed({navigation}:any) {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", }}>
        <View style={{ width: "50%", flexDirection: "row", gap:3 }}>
          <Text style={styles.title}>Papacapim</Text>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={{ width: "50%", alignItems: "flex-end", top: 3, justifyContent: "flex-start", right:5 }}>
          <Pressable onPress={() => navigation.navigate("SeachPost")} android_ripple={{ color: "gray", borderless:true }}  >
            <AntDesign name="search1" size={28} color="black" />
          </Pressable>
        </View>

      </View>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 6,
    gap: 10,
    paddingBottom: 13
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
