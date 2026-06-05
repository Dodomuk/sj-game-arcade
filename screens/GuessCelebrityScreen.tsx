import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { guessCelebrityQuestions } from '../data/celebrities';

const { width } = Dimensions.get('window');

export default function GuessCelebrityScreen() {
  const [revealed, setRevealed] = useState(false);
  const questions = guessCelebrityQuestions;
  const imageSize = (width - 50) / 2;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.instruction}>
        아래 3명의 연예인을 맞혀보세요!
      </Text>

      <View style={styles.imagesContainer}>
        {questions.map((celebrity) => (
          <View key={celebrity.id} style={styles.imageWrapper}>
            <Image
              source={{ uri: celebrity.image }}
              style={[styles.image, { width: imageSize, height: imageSize }]}
            />
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {!revealed ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setRevealed(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>정답 공개</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setRevealed(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>다시하기</Text>
          </TouchableOpacity>
        )}
      </View>

      {revealed && (
        <View style={styles.answersContainer}>
          <Text style={styles.answersTitle}>정답</Text>
          {questions.map((celebrity) => (
            <View key={celebrity.id} style={styles.answerCard}>
              <Text style={styles.answerText}>{celebrity.name}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  imageWrapper: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    borderRadius: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  answersContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  answersTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  answerCard: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  answerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
