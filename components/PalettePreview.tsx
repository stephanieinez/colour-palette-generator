import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styled from 'styled-components/native';

const ColorPreview = styled.View`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.hex};
  border: ${(props) => (props.hex === '#ffffff' ? '#000' : 'none')};
`;

const PalettePreview = ({ colors }) => {
  return (
    <FlatList
      data={colors.slice(0, 5)}
      keyExtractor={(preview) => preview.colorName}
      renderItem={({ item }) => <ColorPreview hex={item.hexCode} />}
      horizontal
      maxToRenderPerBatch={5}
    />
  );
};

export default PalettePreview;
