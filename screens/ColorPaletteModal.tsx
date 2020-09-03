import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';

import COLORS from '../data/colors';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const PaletteTextInput = styled.TextInput`
  border-width: 1px;
  border-color: #000;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const ColorSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.hexCode};
  padding: 5px;
  border-radius: 5px;
`;

const ColorSelectorText = styled.Text`
  color: ${(props) =>
    parseInt(props.hexCode.replace('#', ''), 16) > 0xffffff / 1.1
      ? '#000'
      : '#fff'};
`;

const SubmitButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #008080;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const ColorPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSubmit = useCallback(() => {
    if (!paletteName) {
      Alert.alert('Please enter a palette name');
    } else if (selectedColors.length < 5) {
      Alert.alert('Please select at least 5 colors');
    } else {
      const newColorPalette = {
        paletteName,
        colors: selectedColors,
      };
      navigation.navigate('Home', {
        newColorPalette,
      });
    }
  }, [paletteName, selectedColors]);

  const handleUpdate = useCallback(
    (color, newValue) => {
      if (newValue === true) {
        setSelectedColors((current) => [...current, color]);
      } else {
        setSelectedColors((current) =>
          current.filter(
            (selectedColor) => selectedColor.colorName !== color.colorName,
          ),
        );
      }
    },
    [selectedColors, setSelectedColors],
  );

  return (
    <Container>
      <Text>Name of your colour palette:</Text>
      <PaletteTextInput value={paletteName} onChangeText={setPaletteName} />
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorSelector hexCode={item.hexCode}>
            <ColorSelectorText hexCode={item.hexCode}>
              {item.colorName}
            </ColorSelectorText>
            <Switch
              value={
                !!selectedColors.find(
                  (color) => color.colorName === item.colorName,
                )
              }
              onValueChange={(newValue) => handleUpdate(item, newValue)}
            />
          </ColorSelector>
        )}
      />
      <SubmitButton onPress={handleSubmit}>
        <SubmitButtonText>Submit</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default ColorPaletteModal;
