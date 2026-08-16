import React from "react";
import { TextInput } from "react-native";

interface Props {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  handleEndEditing: (city: string) => Promise<void>;
}

const SearchInput = ({ value, onChangeText, handleEndEditing }: Props) => {
  return (
    <TextInput
      className="border rounded-full px-5 text-xl"
      value={value}
      placeholder="Search city"
      onChangeText={onChangeText}
      onEndEditing={(event) => {
        handleEndEditing(event.nativeEvent.text);
      }}
    />
  );
};

export default SearchInput;
