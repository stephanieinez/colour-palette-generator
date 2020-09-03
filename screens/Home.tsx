import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';

import PalettePreview from '../components/PalettePreview';

const HomeContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding-horizontal: 10px;
`;

const Button = styled.TouchableOpacity`
  margin-vertical: 15px;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const ModalText = styled.Text`
  color: #008080;
  font-weight: bold;
  font-size: 18px;
  margin-vertical: 10px;
`;

const Home = ({ navigation, route }) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;

  const fetchColorPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (result.ok) {
      const colors = await result.json();
      setColorPalettes(colors);
    }
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes([newColorPalette, ...colorPalettes]);
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, []);

  return (
    <HomeContainer>
      <FlatList
        data={colorPalettes}
        keyExtractor={(item) => item.paletteName}
        renderItem={({ item }) => (
          <Button
            onPress={() => {
              navigation.navigate('ColorPalette', {
                paletteName: item.paletteName,
                colors: item.colors,
              });
            }}
          >
            <ButtonText>{item.paletteName}</ButtonText>
            <PalettePreview colors={item.colors.slice(0, 5)} />
          </Button>
        )}
        refreshing={isRefreshing}
        onRefresh={() => handleRefresh()}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('ColorPaletteModal')}
          >
            <ModalText>Add a colour scheme</ModalText>
          </TouchableOpacity>
        }
      />
    </HomeContainer>
  );
};

export default Home;
