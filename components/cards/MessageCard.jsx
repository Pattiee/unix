import { Ionicons } from "@expo/vector-icons";
import { PureComponent } from "react";
import { View, Text } from "react-native";


class MessageCard extends PureComponent{
    render(){
        const { sender, content, timestamp, isRead } = this.props;
        return(
            <View className={`flex w-[80vw] ${sender ? 'bg-slate-300 self-end' : 'bg-slate-100 self-start'} mx-2 dark:bg-slate-800 border border-slate-100 shadow-2xl shadow-slate-700 flex-col justify-between mb-3 rounded-3xl`}>
                <Text className="text-slate-700 font-pregular dark:text-white text-base py-2 px-3">{content}</Text>
                <View className={`w-full ${sender ? 'bg-slate-500 self-end' : 'bg-slate-300 self-start'} rounded-b-3xl min-h-[24px] px-4 flex-row items-center justify-around`}>
                    <Text className=" text-slate-800 dark:text-white">{timestamp}</Text>
                    <Text className=" text-slate-800 dark:text-white">{isRead ? <Ionicons name='open-outline' size={19} color={'blue'}/> : <Ionicons name='mail-open-outline' size={19} color={'black'}/>}</Text>
                </View>
            </View>
        )
    }
}

export default MessageCard;