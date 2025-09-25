import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

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
  metadata?: {
    complexity?: number;
    bgg_rank?: number;
    mechanisms?: string[];
    categories?: string[];
  };
}

export default function GameDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchGameDetails();
    }
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      const response = await fetch(`http://192.168.178.21:8000/api/games/${id}`);
      const data = await response.json();
      setGame(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching game details:', error);
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={16} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={16} color="#FFD700" />);
      }
    }
    return stars;
  };

  const ActionButton = ({ icon, text, color, onPress }: {
    icon: string;
    text: string;
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={[styles.actionButton, { borderColor: color }]} onPress={onPress}>
      <Ionicons name={icon as any} size={20} color={color} />
      <Text style={[styles.actionText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loading}>Loading game...</Text>
      </View>
    );
  }

  if (!game) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.error}>Game not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Game Image */}
      <View style={styles.imageContainer}>
        {game.image_url ? (
          <Image source={{ uri: game.image_url }} style={styles.gameImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="game-controller" size={60} color="#ccc" />
          </View>
        )}
      </View>

      {/* Game Info */}
      <View style={styles.content}>
        <Text style={styles.gameName}>{game.name}</Text>
        
        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(game.avg_rating)}
          </View>
          <Text style={styles.ratingText}>{game.avg_rating.toFixed(1)}</Text>
          {game.year_published && <Text style={styles.yearText}>({game.year_published})</Text>}
        </View>

        {/* Game Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color="#666" />
            <Text style={styles.statText}>{game.min_players}-{game.max_players} players</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.statText}>{game.play_time} min</Text>
          </View>
          {game.metadata?.complexity && (
            <View style={styles.statItem}>
              <Ionicons name="analytics" size={16} color="#666" />
              <Text style={styles.statText}>Complexity: {game.metadata.complexity}/5</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <ActionButton
            icon="checkmark-circle-outline"
            text="Played"
            color="#4CAF50"
            onPress={() => console.log('Played pressed')}
          />
          <ActionButton
            icon="heart-outline"
            text="Wishlist"
            color="#FF5722"
            onPress={() => console.log('Wishlist pressed')}
          />
          <ActionButton
            icon="star-outline"
            text="Rate"
            color="#2196F3"
            onPress={() => console.log('Rate pressed')}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{game.description}</Text>
        </View>

        {/* Categories */}
        {game.metadata?.categories && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.tagsContainer}>
              {game.metadata.categories.map((category, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{category}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Mechanisms */}
        {game.metadata?.mechanisms && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mechanisms</Text>
            <View style={styles.tagsContainer}>
              {game.metadata.mechanisms.map((mechanism, index) => (
                <View key={index} style={[styles.tag, styles.mechanismTag]}>
                  <Text style={styles.tagText}>{mechanism}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: '#f44336',
    marginTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  gameImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  gameName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  yearText: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mechanismTag: {
    backgroundColor: '#f3e5f5',
  },
  tagText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});