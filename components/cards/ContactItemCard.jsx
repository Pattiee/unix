import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PureComponent } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";



class ContactItemCard extends PureComponent{
    render(){
        const { name, phoneNumber } = this.props;
        const handleContactPress = (name) => {
            Alert.alert("Alert", `${name} pressed`)
          }
        return(
            <TouchableOpacity className=" flex h-[60px] shadow shadow-slate-300 max-w-[100vw] flex-row my-1 dark:bg-slate-900 rounded-full mx-4 p-0" onPress={() => router.push({ pathname: 'ContactDetails', params: { phone: JSON.stringify(phoneNumber), name: name?.toString()} })}>
                <View className="h-15 w-15 bg-slate-700 justify-center items-center flex rounded-full m-0">
                    <Ionicons name='person-circle-outline' color={'white'} size={60}/>
                </View>

                <View className="h-full flex-col justify-around py-[7px] rounded-r-full w-[267px] px-2 max-w-[300px]">
                    <Text className="flex text-slate-700 dark:text-white text-lg pr-2 flex-nowrap" numberOfLines={1}>{name}</Text>
                    <Text className=" text-slate-500">{phoneNumber}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ContactItemCard;