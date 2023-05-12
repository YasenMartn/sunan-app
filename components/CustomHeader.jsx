import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { useState } from 'react';
import { Text } from 'react-native';

const CustomHeader = ({ navigation,route, options, back,}) => {

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header className="bg-[#5bb6ad]  w-full pl-5">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {/* <Appbar.Content title={title} titleStyle={{fontFamily: "CairoB", paddingTop: 10}} /> */}
      <Text className="font-[CairoB] text-lg text-white ">{title}</Text>
      {!back ? (
        <>
          <Appbar.Action icon="magnify" iconColor='white'/>
          <Appbar.Action icon="magnify" iconColor='white'/>
        </>
      ) : null}
    </Appbar.Header>
  );
}

export default CustomHeader;