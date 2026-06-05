import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LinearGradient,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const games = [
  {
    id: 'GuessCelebrity',
    title: '연예인 맞추기',
    description: '연예인 사진을 보고 이름을 맞혀보세요!',
    emoji: '🌟',
  },
  {
    id: 'MemoryGame',
    title: '메모리 게임',
    description: '카드를 뒤집어 연예인 쌍을 찾으세요!',
    emoji: '🎴',
  },
  {
    id: 'ReactionGame',
    title: '반응속도 게임',
    description: '빠르게 클릭하여 반응속도를 측정하세요!',
    emoji: '⚡',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.subtitle}>다양한 게임을 즐겨보세요!</Text>

      <View style={styles.gamesGrid}>
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            onPress={() => navigation.navigate(game.id as never)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#fff', '#f5f5f5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gameCard}
            >
              <Text style={styles.gameEmoji}>{game.emoji}</Text>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
              <Text style={styles.playButton}>시작하기 →</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>재미있는 게임을 즐겨보세요! 🎉</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 30,
    fontWeight: '500',
  },
  gamesGrid: {
    gap: 15,
    marginBottom: 30,
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gameEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  playButton: {
    color: '#667eea',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 8,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
});
