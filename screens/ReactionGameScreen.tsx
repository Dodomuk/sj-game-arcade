import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type GameState = 'waiting' | 'ready' | 'playing' | 'end';

export default function ReactionGameScreen() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [message, setMessage] = useState('');
  const startTimeRef = useRef<number>(0);
  const gameTimeRef = useRef<NodeJS.Timeout>();
  const [round, setRound] = useState(0);

  const startGame = () => {
    setGameState('ready');
    setScore(0);
    setRound(0);
    setMessage('');
    playRound();
  };

  const playRound = () => {
    const delay = Math.random() * 3000 + 1000;
    gameTimeRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState('playing');
      setMessage('지금 클릭!');
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'ready') {
      setMessage('너무 빨라요! 초록색이 될 때까지 기다려주세요.');
      if (gameTimeRef.current) clearTimeout(gameTimeRef.current);
      setGameState('waiting');
      return;
    }

    if (gameState === 'playing') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setScore(score + 1);
      setRound(round + 1);

      if (round + 1 >= 5) {
        setGameState('end');
        setMessage(`게임 완료!\n총 점수: ${score + 1}점`);
      } else {
        setGameState('ready');
        playRound();
      }
    }
  };

  const resetGame = () => {
    if (gameTimeRef.current) clearTimeout(gameTimeRef.current);
    setGameState('waiting');
    setScore(0);
    setRound(0);
    setReactionTime(0);
    setMessage('');
  };

  const getClickBoxColor = () => {
    if (gameState === 'waiting') return '#667eea';
    if (gameState === 'ready') return '#ffd700';
    if (gameState === 'playing') return '#4caf50';
    return '#2196f3';
  };

  const getClickBoxLabel = () => {
    if (gameState === 'waiting') return '시작하기';
    if (gameState === 'ready') return '준비중...';
    if (gameState === 'playing') return '클릭!';
    return '완료!';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.clickBox, { backgroundColor: getClickBoxColor() }]}
        onPress={handleClick}
        activeOpacity={0.9}
      >
        <Text style={styles.clickBoxText}>{getClickBoxLabel()}</Text>
      </TouchableOpacity>

      {message !== '' && (
        <Text style={styles.message}>{message}</Text>
      )}

      {reactionTime > 0 && gameState !== 'waiting' && (
        <Text style={styles.reactionTime}>반응 속도: {reactionTime}ms</Text>
      )}

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.label}>라운드</Text>
          <Text style={styles.value}>
            {round} / 5
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.label}>점수</Text>
          <Text style={styles.value}>{score}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {gameState === 'waiting' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={startGame}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>게임 시작</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={resetGame}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>처음부터</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>게임 방법</Text>
        <Text style={styles.instructionsText}>1. "게임 시작" 버튼을 클릭하세요</Text>
        <Text style={styles.instructionsText}>2. 상자가 초록색으로 변할 때까지 기다리세요</Text>
        <Text style={styles.instructionsText}>3. 초록색이 되면 최대한 빨리 클릭하세요</Text>
        <Text style={styles.instructionsText}>4. 5라운드를 완료하세요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clickBox: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  clickBoxText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  message: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    minHeight: 20,
  },
  reactionTime: {
    fontSize: 18,
    color: '#667eea',
    fontWeight: '700',
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    gap: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
    marginVertical: 15,
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
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
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
  instructions: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});
