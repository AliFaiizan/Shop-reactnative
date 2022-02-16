import React from 'react';
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons"
import {Color} from "../../constants/Colors";
import {Platform} from "react-native";

const CHeaderButton = (props:any) => {

    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS==='android'?Color.dark:Color.Primary}
        />
    )
};

export default CHeaderButton;

