import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthProvider'
import Trending from '../../components/Trending';
import { images } from '../../constants/images';
import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';



const Polls = () => {
    const { user } = useAuth();

    const[polls, setPolls] = useState([
        {
            id: '54c7v63x746876',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c3x746876',
                    title: 'President',
                    candidates: [
                        {
                            id: '56876',
                            name: 'Mandago',
                        },
                        {
                            id: '568736',
                            name: 'Chelilim',
                        },
                        {
                            id: '5687346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v63x746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '560876',
                            name: 'Mandago',
                        },
                        {
                            id: '568764785',
                            name: 'Chelilim',
                        },
                        {
                            id: '56876454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c5v63x746876',
            institution: 'Koshin TTI',
            positions: [
                {
                    id: '54c7v6746876',
                    title: 'President',
                    candidates: [
                        {
                            id: '568423476',
                            name: 'Mandago',
                        },
                        {
                            id: '56876956543',
                            name: 'Chelilim',
                        },
                        {
                            id: '568734346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '7v63x746876',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '542343876',
                            name: 'Mandago',
                        },
                        {
                            id: '5676856876',
                            name: 'Chelilim',
                        },
                        {
                            id: '5689083476',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v33x746876',
            institution: 'RVTTI',
            positions: [
                {
                    id: '563x746876',
                    title: 'President',
                    candidates: [
                        {
                            id: '478456876',
                            name: 'Mandago',
                        },
                        {
                            id: '574834556876',
                            name: 'Chelilim',
                        },
                        {
                            id: '38492046876',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v66876',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '88908434876',
                            name: 'Mandago',
                        },
                        {
                            id: '75893578956',
                            name: 'Chelilim',
                        },
                        {
                            id: '0989843456876',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v63x743876',
            institution: 'Eldoret Poly',
            positions: [
                {
                    id: '7v63x7468',
                    title: 'President',
                    candidates: [
                        {
                            id: '84932748936',
                            name: 'Mandago',
                        },
                        {
                            id: '989032456876',
                            name: 'Chelilim',
                        },
                        {
                            id: '58947358946876',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '53x746876',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '78493578947523',
                            name: 'Mandago',
                        },
                        {
                            id: '348940548',
                            name: 'Chelilim',
                        },
                        {
                            id: '38932744',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c44v63x746876',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c34x746876',
                    title: 'President',
                    candidates: [
                        {
                            id: '546876',
                            name: 'Mandago',
                        },
                        {
                            id: '5684736',
                            name: 'Chelilim',
                        },
                        {
                            id: '56847346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c74v63x746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '5640876',
                            name: 'Mandago',
                        },
                        {
                            id: '5687464785',
                            name: 'Chelilim',
                        },
                        {
                            id: '568746454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v63x474687',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c34x746876',
                    title: 'President',
                    candidates: [
                        {
                            id: '546876',
                            name: 'Mandago',
                        },
                        {
                            id: '54468736',
                            name: 'Chelilim',
                        },
                        {
                            id: '56847346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v643x746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '5640876',
                            name: 'Mandago',
                        },
                        {
                            id: '5687464785',
                            name: 'Chelilim',
                        },
                        {
                            id: '568764454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v63x7446876',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c3x7446876',
                    title: 'President',
                    candidates: [
                        {
                            id: '564876',
                            name: 'Mandago',
                        },
                        {
                            id: '5648736',
                            name: 'Chelilim',
                        },
                        {
                            id: '56847346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v6434x746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '5604876',
                            name: 'Mandago',
                        },
                        {
                            id: '5687464785',
                            name: 'Chelilim',
                        },
                        {
                            id: '568746454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v63x4746876',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c3x7446876',
                    title: 'President',
                    candidates: [
                        {
                            id: '564876',
                            name: 'Mandago',
                        },
                        {
                            id: '5684736',
                            name: 'Chelilim',
                        },
                        {
                            id: '56874346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v634x746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '5604876',
                            name: 'Mandago',
                        },
                        {
                            id: '5687464785',
                            name: 'Chelilim',
                        },
                        {
                            id: '568746454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v63x7456876',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c3x7546876',
                    title: 'President',
                    candidates: [
                        {
                            id: '568576',
                            name: 'Mandago',
                        },
                        {
                            id: '5685736',
                            name: 'Chelilim',
                        },
                        {
                            id: '56875346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v636x746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '5660876',
                            name: 'Mandago',
                        },
                        {
                            id: '5687664785',
                            name: 'Chelilim',
                        },
                        {
                            id: '568766454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
        {
            id: '54c7v63x7646876',
            institution: 'Moi University',
            positions: [
                {
                    id: '54c3x7646876',
                    title: 'President',
                    candidates: [
                        {
                            id: '5638876',
                            name: 'Mandago',
                        },
                        {
                            id: '56r8736',
                            name: 'Chelilim',
                        },
                        {
                            id: '568d7346',
                            name: 'Patrick',
                        },
                    ]
                },
                {
                    id: '54c7v63rx746',
                    title: 'Sports Leader',
                    candidates: [
                        {
                            id: '560w876',
                            name: 'Mandago',
                        },
                        {
                            id: '56e8764785',
                            name: 'Chelilim',
                        },
                        {
                            id: '5687u6454',
                            name: 'Patrick',
                        },
                    ]
                },
            ],
        },
    ]);


    return (
        <SafeAreaView className="flex justify-center">
            <FlatList
                data={polls}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity className="flex justify-center items-center h-[25vh] my-2 w-full" key={item.id} onPress={() => router.push({ pathname: 'pollDetails', params: { poll: JSON.stringify(item) }})}>
                        <View className="flex absolute opacity-80 bg-primary h-full justify-center items-center w-full p-0 m-0">
                            <Text className="text-3xl text-white font-plight">{item.institution}</Text>
                            <Text className=" text-white font-plight">This institution has {item.positions.length} positions</Text>
                        </View>

                        <View className="h-full">
                            <Image className="h-full w-full" source={images.bg3}/>
                        </View>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 space-y-6">
                        <View className="px-4 justify-between items-center flex-row mb-6">

                            <View className="flex">
                                <Text className="text-sm text-gray-100 font-pmedium">Welcome back, </Text>
                                <Text className="text-2xl font-psemibold capitalize text-white">{user?.firstName}</Text>
                            </View>

                            <View className="mt-1.5">
                                <Image
                                source={images.logo2}
                                className="w-9 h-10"
                                resizeMode='contain'
                                />
                            </View>

                        </View>

                        <SearchInput  placeholder={"Search for a poll"}/>

                        {/* Latest videos section */}
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Polls</Text>
                            <Trending posts={polls ?? []}/>
                        </View>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View className="h-[75vh] py-10 border border-primary w-[100vw]">
                        <View>
                            <Text className="text-xl">Did you find your favorite poll?</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Polls