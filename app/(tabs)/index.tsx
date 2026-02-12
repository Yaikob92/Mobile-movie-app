import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  if (moviesLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white">Error: {moviesError.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary px-5">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
