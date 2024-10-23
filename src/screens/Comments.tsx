import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { api } from '../config/Api';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { colorPrimary } from '../constants/constants';
import uniqolor from 'uniqolor';

export default function Comments({ route }: any) {
    const { currentPost } = route.params;
    const [newComment, setNewComment] = useState('');
    const [replies, setReplies] = useState<any>([]);

    // Função para buscar as respostas da postagem
    const fetchReplies = async () => {
        try {
            const response = await api.get(`/posts/${currentPost.id}/replies`);
            setReplies(response.data); // Atualiza o estado com as respostas recebidas
        } catch (error) {
            console.error('Erro ao buscar respostas:', error);
        }
    };

    useEffect(() => {
        fetchReplies(); // Buscar respostas assim que a tela for renderizada
    }, []);

    // Função para adicionar uma nova resposta ao post via API POST
    const addReply = async () => {
        if (newComment.trim()) {
            try {
                // Faz a requisição POST para adicionar a nova resposta
                const response = await api.post(`/posts/${currentPost.id}/replies`, {
                    reply: {
                        message: newComment,
                    },
                });

                const newReply = response.data;

                // Atualiza a lista de respostas com a nova resposta
                setReplies([...replies, newReply]);

                // Limpa o campo de texto
                setNewComment('');
            } catch (error) {
                console.error('Erro ao adicionar resposta:', error);
                Alert.alert('Erro', 'Não foi possível adicionar a resposta.');
            }
        } else {
            Alert.alert('Aviso', 'O comentário não pode estar vazio.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Exibe o login do usuário que postou e a mensagem */}
            <View style={{flexDirection:"row", gap:5, alignItems:"center"}}>
                <Avatar.Text
                    color='white'
                    style={{ backgroundColor: "green" }}
                    size={35}
                    label={currentPost?.user_login ? currentPost?.user_login[0]?.toUpperCase() : ""}
                />
                <Text style={styles.userLogin}>Postado por: {currentPost.user_login}</Text>
            </View>
            <Text style={styles.postTitle}>{currentPost.message}</Text>

            {/* Renderiza as respostas da postagem */}
            {replies.length > 0 ? (
                <FlatList
                    data={replies}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentText}>{item.message}</Text>
                            <Text style={styles.commentUser}>Comentado por: {item.user_login}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text style={styles.noComments}>Sem respostas ainda.</Text>
            )}

            {/* Campo de texto para adicionar uma nova resposta */}
            <TextInput
                mode='outlined'
                style={styles.input}
                dense
                activeOutlineColor={colorPrimary}
                placeholder="Adicionar uma resposta..."
                value={newComment}
                onChangeText={setNewComment}
            />
            <Button buttonColor={colorPrimary} textColor='white' onPress={addReply}>
                Enviar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    userLogin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 4,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        top:5, left:10
    },
    commentContainer: {
        marginBottom: 8,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    commentText: {
        fontSize: 14,
    },
    commentUser: {
        fontSize: 12,
        color: '#888',
    },
    input: {
        height: 40,
        padding: 8,
        marginVertical: 16,
    },
    noComments: {
        fontSize: 14,
        color: '#888',
    },
});
