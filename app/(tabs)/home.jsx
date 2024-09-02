import { View, Text, SafeAreaView, FlatList, RefreshControl, Dimensions, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useServer from '../../hooks/useServer'
import PostService from '../../services/posts.service'
import { useAuth } from '../../contexts/AuthProvider'
import VideoCard from '../../components/VideoCard'
import { useFocusEffect } from 'expo-router'
import { images } from '../../constants/images'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';




const Home = () => {
  const { user, setUser, setIsLoggedIn, justUploaded} = useAuth();
  const { data: posts, refetch } = useServer(PostService.getAllPosts);
  const { data: latestPosts } = useServer(PostService.getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);


  const[playingIndex, setPlayingIndex] = useState(null);
  const flatListRef = React.useRef(null);
  const screenHeight = Dimensions.get('window').height;

  const videoRefs = useRef([]);


  const [staticPosts, setStaticPosts] = useState([
    {
      postId: '78373uyr46teqi89dh',
      title: 'Test1 Post'
    }
  ])


  useFocusEffect(
    useCallback(() => {
      return () => {
        videoRefs.current.forEach(vRef => {
          if (vRef) {
            vRef.pauseAsync();
          }
        })
      }
    }, [])
  );



  const handleViewableItemsChanged = ({ viewableItems }) => {
    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) {
        video.pauseAsync();
        video.setPositionAsync(0);
      }
    });

    // Play the first viewable video
    if (viewableItems.length > 0) {
      const viewableIndex = viewableItems[0].index;
      const videoToPlay = videoRefs.current[viewableIndex];
      if (videoToPlay) {
        videoToPlay.setPositionAsync(0);
        videoToPlay.playAsync();
      }
    }
  }


  useEffect(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [justUploaded]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  // const renderItem = ({ item, index }) => (
  //   <VideoCard video={item}/>
  // );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };


  return (
    <SafeAreaView>
      <FlatList
        scrollEventThrottle={16} // Higher frequency of scroll events makes it smoother
        className="h-full w-full p-0 m-0 border-none"
        snapToStart
        snapToAlignment='start'
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        data={posts ?? staticPosts}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        renderItem={({ item, index }) => (
          <VideoCard videoRefs={videoRefs} video={item} index={index}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 border border-red-600">
            <View className="justify-between items-start flex-row mb-6">

              <View className="">
                <Text className="text-sm text-gray-100 font-pmedium">Welcome back, </Text>
                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logo2}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput placeholder={"Search for a video topic"}/>

            {/* Latest videos section */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending posts={latestPosts ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first to upload a video"/>
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home
