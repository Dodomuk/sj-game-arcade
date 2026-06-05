import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { memoryGameCelebrities } from '../data/celebrities';

const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 4;

interface Card {
  id: string;
  celebId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGameScreen() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [matched, cards]);

  const initializeGame = () => {
    const gameCards: Card[] = [];

    memoryGameCelebrities.forEach((celeb) => {
      gameCards.push(
        {
          id: `${celeb.id}-1`,
          celebId: celeb.id,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `${celeb.id}-2`,
          celebId: celeb.id,
          isFlipped: false,
          isMatched: false,
        }
      );
    });

    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardPress = (cardId: string) => {
    if (
      flipped.includes(cardId) ||
      matched.includes(cardId) ||
      flipped.length === 2
    ) {
      return;
    }

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [id1, id2] = newFlipped;
      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      if (card1 && card2 && card1.celebId === card2.celebId) {
        setMatched([...matched, id1, id2]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const getCelebrity = (celebId: string) => {
    return memoryGameCelebrities.find((c) => c.id === celebId);
  };

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.statItem}>
          <Text style={styles.label}>클릭 횟수</Text>
          <Text style={styles.value}>{moves}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.label}>매칭</Text>
          <Text style={styles.value}>
            {matched.length / 2} / {cards.length / 2}
          </Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          const isMatched = matched.includes(card.id);
          const celeb = getCelebrity(card.celebId);

          return (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                (isFlipped || isMatched) && styles.cardActive,
              ]}
              onPress={() => handleCardPress(card.id)}
              disabled={isMatched}
              activeOpacity={0.7}
            >
              {(isFlipped || isMatched) && celeb ? (
                <Image
                  source={{ uri: celeb.image }}
                  style={styles.cardImage}
                />
              ) : (
                <Text style={styles.cardBack}>?</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal transparent visible={gameOver} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.gameOverBox}>
            <Text style={styles.gameOverTitle}>게임 완료! 🎉</Text>
            <Text style={styles.gameOverText}>클릭 횟수: {moves}</Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={initializeGame}
              activeOpacity={0.8}
            >
              <Text style={styles.restartButtonText}>다시 시작</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  loading: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#667eea',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  card: {
    width: cardSize,
    height: cardSize,
    backgroundColor: '#667eea',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardActive: {
    backgroundColor: '#fff',
  },
  cardBack: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  gameOverText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
