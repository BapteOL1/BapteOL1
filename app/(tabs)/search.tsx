import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { neighborhoodData } from '../../data/mockData';

type Neighborhood = (typeof neighborhoodData)[number];

const FILTERS = ['Budget', 'Commute', 'Bedrooms'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const renderItem: ListRenderItem<Neighborhood> = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.75}>
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <Text style={styles.neighborhoodName}>{item.name}</Text>
          <Text style={styles.borough}>{item.borough}</Text>
        </View>
        <View style={[styles.scoreBadge, { borderColor: item.scoreColor }]}>
          <Text style={[styles.scoreNumber, { color: item.scoreColor }]}>
            {item.score}
          </Text>
          <Text style={[styles.scoreMax, { color: item.scoreColor }]}>/10</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <Ionicons name="home-outline" size={12} color={colors.textMuted} />
          <Text style={styles.statText}>{item.avgRent}</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statPill}>
          <Ionicons name="subway-outline" size={12} color={colors.textMuted} />
          <Text style={styles.statText}>{item.commute} commute</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {item.tags.map((tag, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.topSection}>
          <Text style={styles.title}>Find Your Neighborhood</Text>
          <Text style={styles.subtitle}>NYC — tailored to where you work</Text>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="location-outline" size={17} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter work address..."
              placeholderTextColor={colors.textDim}
              value={searchQuery}
              onChangeText={setSearchQuery}
              selectionColor={colors.accent}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={17} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Chips */}
          <View style={styles.filterRow}>
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterChip,
                  activeFilter === f && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(activeFilter === f ? null : f)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === f && styles.filterChipTextActive,
                  ]}
                >
                  {f}
                </Text>
                {activeFilter === f && (
                  <Ionicons name="checkmark" size={12} color={colors.primary} style={{ marginLeft: 3 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          data={neighborhoodData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.button,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  filterChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl + 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  cardLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  neighborhoodName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  borough: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderRadius: radius.small,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scoreNumber: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  scoreMax: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 1,
    opacity: 0.7,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
