import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styled from 'styled-components/native';

import ColorBox from '../components/ColorBox';

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
  padding-top: 20px;
  background-color: #fff;
`;

const HeadingText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ColorPalette = ({ route }) => {
  const { colors, paletteName } = route.params;

  return (
    <Container>
      <FlatList
        data={colors}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
        )}
        ListHeaderComponent={<HeadingText>{paletteName}</HeadingText>}
      />
    </Container>
  );
};

export default ColorPalette;
