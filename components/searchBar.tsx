import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

type Props =
  | {
      placeholder: string;
      onPress: () => void; // Home screen mode
    }
  | {
      placeholder: string;
      value: string; // Search screen mode
      onChangeText: (text: string) => void;
      onPress?: never;
    };
const SearchBar = (props: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      {"onPress" in props ? (
        // Navigation mode (Home screen)
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#a8b5db"
          className="flex-1 ml-2 text-white"
          onPress={props.onPress}
        />
      ) : (
        // Input mode (Search screen)
        <TextInput
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholderTextColor="#a8b5db"
          className="flex-1 ml-2 text-white"
        />
      )}
    </View>
  );
};

export default SearchBar;
