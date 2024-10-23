import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { api } from '../config/Api';
import { FormatPost } from '../interfaces';
import LoadingComponent from '../components/LoadingComponent';

export default function SearchPosts({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<FormatPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Função para buscar postagens com base no termo de pesquisa
  async function fetchPosts(search: string) {
    try {
      setLoading(true);
      const response = await api.get("/posts", {
        params: {
          search: search,
          page: 0, // Paginação inicial
        }
      });
      setPosts(response.data); // Atualiza a lista de postagens
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Manipula a mudança no campo de pesquisa
  const onChangeSearch = async (search: string) => {
    setSearchQuery(search); // Atualiza o estado da pesquisa
    if (search.length > 0) {
      fetchPosts(search); // Busca postagens que correspondem ao termo
    } else {
      setPosts([]); // Se a pesquisa estiver vazia, limpa a lista de postagens
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Pesquisar postagens"
          onChangeText={onChangeSearch}
          value={searchQuery}
          mode='bar'
          inputMode='search'
          selectionColor={"gray"}
          cursorColor={"gray"}
          style={styles.searchbar}
        />
      </View>

      {loading ? (
        <LoadingComponent /> // Exibe o componente de carregamento enquanto busca os dados
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {posts.length > 0 ? (
            posts.map((post: FormatPost) => (
              <Pressable 
                onPress={() => navigation.navigate("PostDetail", { postId: post.id })} // Navega para detalhes do post
                android_ripple={{ color: "gray" }} 
                key={post.id} 
                style={styles.postContainer}
              >
                <Text style={styles.postUser}>{post.user_login}</Text>
                <Text style={styles.postMessage}>{post.message}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.noResultsText}>Nenhuma postagem encontrada.</Text> // Mensagem quando não há postagens
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 10,
  },
  searchbar: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
    padding: 10,
    marginBottom: 10,
  },
  postUser: {
    fontWeight: 'bold',
  },
  postMessage: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});
