import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

interface Game {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  min_players: number;
  max_players: number;
  play_time: number;
  avg_rating: number;
  year_published?: number;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Chiamata API al caricamento
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      // CAMBIA L'IP CON IL TUO IP DEL MAC
      const response = await fetch('http://192.168.178.21:8000/api/games');
      const data = await response.json();
      setGames(data);
      setLoading(false);
      console.log('Games loaded:', data);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  const renderGame = ({ item }: { item: Game }) => (
    <View style={styles.gameCard}>
      <Text style={styles.gameName}>{item.name}</Text>
      <Text style={styles.gameDescription}>{item.description}</Text>
      <View style={styles.gameInfo}>
        <Text>👥 {item.min_players}-{item.max_players} players</Text>
        <Text>⏱️ {item.play_time} min</Text>
        {item.year_published && <Text>📅 {item.year_published}</Text>}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.title}>🎲 Table Games</Text>
        <Text style={styles.loading}>Loading games...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>🎲 Table Games</Text>
      
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id.toString()}
        style={styles.gamesList}
        scrollEnabled={false} // Disable inner scrolling since we're in ScrollView
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  gamesList: {
    flex: 1,
  },
  gameCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});