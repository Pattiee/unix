import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
// import { searchPost } from '../../lib/appwrite'
// import useAppwrite from '../../lib/useAppwrite';
// import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import useServer from '../../hooks/useServer'
import PostService from '../../services/posts.service'
import SearchInput from '../../components/SearchInput'



const Search = () => {

  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useServer(() => PostService.searchPostByTitle(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <Text>{item?.name}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-sm text-gray-100 font-pmedium">Search results</Text>
            <Text className="text-2xl font-psemibold text-white">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Can't find videos for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search;