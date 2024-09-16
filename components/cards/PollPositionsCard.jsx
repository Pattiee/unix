import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PollHeader from '../PollHeader'
import { SafeAreaView } from 'react-native-safe-area-context'


const PollPositionsCard = ({ pollPosition }) => {
  return (
    <SafeAreaView>
        <FlatList
            data={poll?.positions ?? []}
            keyExtractor={({item, index}) => {
              <PollPositionsCard key={index} pollPosition={item}/>
            }}
            ListHeaderComponent={<PollHeader poll={pollPosition}/>}
          />
    </SafeAreaView>
  )
}

export default PollPositionsCard