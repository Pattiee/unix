import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import PollCandidateCard from '../components/PollCandidateCard'
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const PollPositions = () => {
  const { position } = useLocalSearchParams();
  const pollPosition = JSON.parse(position);

  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);


  const handleSubmit = async () => {
    if(!selectedCandidate) return Alert.alert("Alert", "No selection made");
    Alert.alert("CONFIRMATION", `Do you want to vote ${selectedCandidate.name}?`)
  }
  


  const handleVote = (candidate) => {
      setSelectedCandidateId(null);
      setSelectedCandidateId(candidate.id);
      setSelectedCandidate(candidate);
  }


  const renderItem = (candidate, index) => {
    const isSelected = candidate.id === selectedCandidateId;

    return(
      <TouchableOpacity className={` rounded-xl mx-1 my-3 py-5 px-2 shadow-xl shadow-primary ${isSelected? 'bg-primary': 'bg-gray-200'}`} style={{
      }} onPress={() => handleVote(candidate)}>
          <Text className="text-lg" style={{
            color: isSelected? 'white': 'black'
          }}>{index}. {candidate.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={pollPosition.candidates || []}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => renderItem(item, index)}
        ListHeaderComponent={(item) => (
          <View className=" flex h-[50vh] w-[100vw] justify-center items-center mb-2 bg-blue-400">
            <View>
              <Text className="text-3xl m-5 text-primary font-pextrabold">{pollPosition.title || "Unknown post"}</Text>
              <Text className="flex flex-nowrap text-6xl w-[100vw] text-nowrap">{selectedCandidate?.name || "No selection"}</Text>
            </View>
            
            <View className="w-full h-[50px] justify-center mt-auto items-center">
              <View>
                <TouchableOpacity className="flex justify-center items-center px-4 h-[40px] w-[100px] py-2 bg-primary rounded-xl" onPress={handleSubmit}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default PollPositions