import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { SettleLogo } from '../../components/SettleLogo';
import { PulsingDot } from '../../components/PulsingDot';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing.md * 2 - spacing.sm) / 2;

interface Module {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  tagBg: string;
}

const modules: Module[] = [
  {
    id: 'apartment',
    icon: 'home-outline',
    iconColor: colors.accent,
    title: '350 W 42nd · 1BR',
    subtitle: '$3,380/mo',
    tag: 'Active',
    tagColor: colors.accent,
    tagBg: 'rgba(200,169,122,0.15)',
  },
  {
    id: 'utilities',
    icon: 'flash-outline',
    iconColor: colors.red,
    title: 'Con Edison urgent',
    subtitle: '~$345/mo',
    tag: 'Alert',
    tagColor: colors.red,
    tagBg: colors.redDim,
  },
  {
    id: 'moving',
    icon: 'cube-outline',
    iconColor: colors.green,
    title: 'FlatRate · Apr 1',
    subtitle: '$1,200',
    tag: 'Booked',
    tagColor: colors.green,
    tagBg: colors.greenDim,
  },
  {
    id: 'lease',
    icon: 'document-text-outline',
    iconColor: colors.red,
    title: '3 risks flagged',
    subtitle: 'ETF $6,760',
    tag: 'Review',
    tagColor: colors.red,
    tagBg: colors.redDim,
  },
];

export default function HomeScreen() {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0.68,
      duration: 1200,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, [progressAnim]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Jordan</Text>
            <Text style={styles.subGreeting}>Your NYC move is coming together</Text>
          </View>
          <SettleLogo size={42} />
        </View>

        {/* Move Readiness Score Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreLeft}>
              <Text style={styles.scoreLabel}>Move readiness</Text>
              <Text style={styles.scoreSubtitle}>
                3 tasks remaining · 8 days to move-in
              </Text>
            </View>
            <Text style={styles.scoreNumber}>68%</Text>
          </View>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* AI Alert Card */}
        <View style={styles.alertCard}>
          <View style={styles.alertAccentBar} />
          <View style={styles.alertBody}>
            <View style={styles.alertMeta}>
              <PulsingDot size={7} color={colors.accent} />
              <Text style={styles.alertMetaText}>AI · Today</Text>
            </View>
            <Text style={styles.alertText}>
              Con Edison not activated — activate today or no electricity on April 1
            </Text>
          </View>
        </View>

        {/* Module Grid */}
        <View style={styles.moduleGrid}>
          {modules.map((mod) => (
            <TouchableOpacity
              key={mod.id}
              style={styles.moduleCard}
              activeOpacity={0.7}
            >
              <View style={styles.moduleTopRow}>
                <View
                  style={[
                    styles.moduleIconWrap,
                    { backgroundColor: `${mod.iconColor}18` },
                  ]}
                >
                  <Ionicons name={mod.icon} size={18} color={mod.iconColor} />
                </View>
                <View style={[styles.moduleTag, { backgroundColor: mod.tagBg }]}>
                  <Text style={[styles.moduleTagText, { color: mod.tagColor }]}>
                    {mod.tag}
                  </Text>
                </View>
              </View>
              <Text style={styles.moduleTitle} numberOfLines={2}>
                {mod.title}
              </Text>
              <Text style={styles.moduleSubtitle}>{mod.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Monthly est.</Text>
            <Text style={styles.statValue}>$4,805</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Days left</Text>
            <Text style={[styles.statValue, { color: colors.red }]}>8</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Upfront paid</Text>
            <Text style={styles.statValue}>$6,760</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl + 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.4,
  },
  subGreeting: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 3,
  },
  scoreCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  scoreLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  scoreLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  scoreSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
  scoreNumber: {
    fontSize: 44,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -2,
    lineHeight: 48,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  alertCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  alertAccentBar: {
    width: 3,
    backgroundColor: colors.accent,
  },
  alertBody: {
    flex: 1,
    padding: spacing.md,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  alertMetaText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  alertText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  moduleCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    width: CARD_WIDTH,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moduleTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  moduleIconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleTag: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  moduleTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 18,
  },
  moduleSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statsRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
});
