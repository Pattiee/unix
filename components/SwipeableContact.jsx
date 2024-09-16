import { View, Text, Alert, TouchableOpacity, Animated } from 'react-native'
import React, { PureComponent } from 'react'
import { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { PanGestureHandler, Swipeable } from 'react-native-gesture-handler';
import ContactItemCard from './cards/ContactItemCard';
import { Ionicons } from '@expo/vector-icons';

class SwipeableContact extends PureComponent{

    render(){
        const { notification, onPressDelete, index, onMarkRead, name, phoneNumber, } = this.props;
        // Right action
        const renderRightActions = (progress, dragX, onPressDelete) => {
            const scale = dragX.interpolate({
                inputRange: [-100, -50, 0],
                outputRange: [2, 1, 0],
                extrapolate: 'clamp',
            });
            return(
                <TouchableOpacity className="flex items-center justify-center bg-red-400" activeOpacity={0.8} onPress={() => onPressDelete(index, notification)}>
                    <Animated.View style={[{ transform: [{scale}]}]}>
                        <Ionicons name='remove' color={'white'} size={24}/>
                    </Animated.View>
                </TouchableOpacity>
            )
        };


        // Left action
        const renderLeftActions = (progress, dragX, onMarkRead) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100, 101],
                outputRange: [-20, 0, 0, 1],
            });
            return(
                <TouchableOpacity className="flex items-center justify-center bg-blue-500" activeOpacity={0.8} onPress={() => onMarkRead(index, notification)}>
                    <Animated.View style={[{transform: [{ translateX: trans}] }]}>
                        <Ionicons name='reader' color={'white'} size={24}/>
                    </Animated.View>
                </TouchableOpacity>
            );
        };

        // Component return
        return (
            <Swipeable
                overshootRight={false}
                overshootLeft={false}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onPressDelete)}
                renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, onMarkRead)}
            >
                <ContactItemCard/>
            </Swipeable>
        )
}}

export default SwipeableContact;