import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const StatCard = ({ icon, title, value, subtitle }: {
    icon: string;
    title: string;
    value: string;
    subtitle?: string;
  }) => (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color="#4CAF50" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>🎲 Your Stats</Text>
      
      <View style={styles.statsGrid}>
        <StatCard
          icon="game-controller"
          title="Games Played"
          value="42"
          subtitle="This month"
        />
        <StatCard
          icon="time"
          title="Hours Played"
          value="127h"
          subtitle="Total time"
        />
        <StatCard
          icon="trophy"
          title="Wins"
          value="18"
          subtitle="43% win rate"
        />
        <StatCard
          icon="heart"
          title="Wishlist"
          value="23"
          subtitle="Games to buy"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Played <Text style={styles.gameName}>Azul</Text></Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="heart" size={20} color="#FF5722" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Added <Text style={styles.gameName}>Wingspan</Text> to wishlist</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="star" size={20} color="#FFD700" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Rated <Text style={styles.gameName}>Ticket to Ride</Text> ⭐⭐⭐⭐</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Genres</Text>
        <View style={styles.genresContainer}>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>Strategy</Text>
          </View>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>Euro Games</Text>
          </View>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>Card Games</Text>
          </View>
        </View>
      </View>
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
    marginBottom: 30,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  gameName: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genreTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});