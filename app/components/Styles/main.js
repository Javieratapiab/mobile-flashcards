// Styles components
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { $color5, $color4, $color1, $color2, $color3 } from '../../utils/colors'

export const StyledCard = styled.View`
  background-color: white;
  border-radius: ${Platform.OS === 'ios' ? 16 : 2};
  padding: 20px;
  margin-left: 10;
  margin-right: 10;
  margin-top: 17;
  shadow-radius: 3;
  shadow-opacity: 0.8;
  shadow-color: 'rgba(0, 0, 0, 0.24)';
  shadow-offset: 0px 3px;
`

export const ButtonsSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`
export const HeadingText = styled.Text`
  font-size:  18px;
  font-weight: bold;
  align-self: center;
`
// Texts
export const TextCard = styled.Text`
  text-align: center;
  font-size: 18px;
`
export const TextSecondaryCard = styled.Text`
  color: ${$color3};
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`

export const ButtonText = styled.Text`
  background: ${$color1};
  padding: 30px;
  margin-top: 20;
  margin-left: 10;
  margin-right: 10;
  text-align: center;
  font-weight: bold;
`
export const NewDeckSection = styled.View`
  flex: 1;
  justify-content: flex-start;
`

export const MainTitle = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  padding: 20px;
`

export const TextButton = styled.Text`
  text-align: center;
  color: ${$color2};
  padding: 20px;
  font-weight: bold;
  font-size: 15px;
`
export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
`
export const ScoreText = styled.Text`
  align-self: center;
  font-weight: bold;
  padding: 20px;
  font-size: 15px;
`