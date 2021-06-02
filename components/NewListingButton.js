import React from 'react'
import { Button } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';


export default function NewListingButton({ navigation }) {
  return (
    <Button
      onPress={() => navigation.navigate("Custom Listing", { screen: "Custom Listing" })}
      size={24}
      color='#000'
    >
      <AntDesign name="plus" size={24} color="black" />
    </Button>
  );
}
