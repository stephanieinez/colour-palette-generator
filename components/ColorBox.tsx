import React, { useState } from 'react';
import { Text, TouchableOpacity, Clipboard } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import styled from 'styled-components/native';

const Box = styled.TouchableOpacity`
  background-color: ${(props) => props.hexCode};
  padding-vertical: 10px;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  border: ${(props) => (props.hexCode === '#ffffff' ? '#000' : 'none')};
`;

const StyledText = styled.Text`
  color: ${parseInt((props) => props.hexCode.replace('#', ''), 16) >
  0xffffff / 1.1
    ? '#000'
    : '#fff'};
  font-weight: bold;
`;

const ColorBox = (props) => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (hex) => {
    Clipboard.getString(hex);
  };

  return (
    <Box hexCode={props.hexCode} onPress={() => copyToClipboard(props.hexCode)}>
      <StyledText hexCode={props.hexCode}>
        {props.colorName} {props.hexCode}
      </StyledText>
    </Box>
  );
};

export default ColorBox;
