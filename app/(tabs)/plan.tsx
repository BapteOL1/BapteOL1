import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import {
  monthlyExpenses,
  upfrontExpenses,
  Expense,
} from '../../data/mockData';

type Tab = 'monthly' | 'upfront';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BAR_MAX_WIDTH = SCREEN_WIDTH - spacing.md * 2 - spacing.md * 2 - 140;

function ExpenseRow({ item }: { item: Expense }) {
  if (item.warning) {
    return (
      <View style={rowStyles.row}>
        <View style={[rowStyles.dot, { backgroundColor: item.color }]} />
        <View style={rowStyles.rowContent}>
          <Text style={rowStyles.label}>{item.label}</Text>
          <View style={rowStyles.warningRow}>
            <Ionicons name="warning-outline" size={13} color={colors.red} />
            <Text style={rowStyles.warningText}>Not activated</Text>
          </View>
        </View>
        <Text style={rowStyles.warningAmount}>—</Text>
      </View>
    );
  }

  return (
    <View style={rowStyles.row}>
      <View style={[rowStyles.dot, { backgroundColor: item.color }]} />
      <View style={rowStyles.rowContent}>
        <Text style={rowStyles.label}>{item.label}</Text>
        <View style={rowStyles.barTrack}>
          <View
            style={[
              rowStyles.barFill,
              {
                width: Math.max(BAR_MAX_WIDTH * item.barWidth, item.amount > 0 ? 4 : 0),
                backgroundColor: item.color,
              },
            ]}
          />
        </View>
      </View>
      <Text style={rowStyles.amount}>
        ${item.amount.toLocaleString()}
      </Text>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 5,
  },
  barTrack: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  warningText: {
    fontSize: 12,
    color: colors.red,
    fontWeight: '600',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    minWidth: 60,
    textAlign: 'right',
  },
  warningAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDim,
    minWidth: 60,
    textAlign: 'right',
  },
});

export default function PlanScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('monthly');

  const isMonthly = activeTab === 'monthly';
  const expenses = isMonthly ? monthlyExpenses : upfrontExpenses;
  const total = isMonthly ? '$4,805' : '$8,460';
  const totalLabel = isMonthly ? 'Monthly total' : 'Upfront total';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Plan</Text>
            <Text style={styles.subtitle}>{totalLabel}</Text>
          </View>
          <Text style={styles.totalAmount}>{total}</Text>
        </View>

        {/* Tab Toggle */}
        <View style={styles.tabToggle}>
          <TouchableOpacity
            style={[styles.tabBtn, isMonthly && styles.tabBtnActive]}
            onPress={() => setActiveTab('monthly')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabBtnText, isMonthly && styles.tabBtnTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, !isMonthly && styles.tabBtnActive]}
            onPress={() => setActiveTab('upfront')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabBtnText, !isMonthly && styles.tabBtnTextActive]}>
              Upfront
            </Text>
          </TouchableOpacity>
        </View>

        {/* Expense List */}
        <View style={styles.expenseCard}>
          {expenses.map((item, idx) => (
            <View key={item.id}>
              <ExpenseRow item={item} />
            </View>
          ))}

          {!isMonthly && (
            <View style={styles.totalRow}>
              <Text style={styles.totalRowLabel}>Total upfront</Text>
              <Text style={styles.totalRowAmount}>$8,460</Text>
            </View>
          )}

          {isMonthly && (
            <View style={styles.noteRow}>
              <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
              <Text style={styles.noteText}>
                Electricity estimate (~$345/mo) not included until activated
              </Text>
            </View>
          )}
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Rent ratio</Text>
              <Text style={styles.summaryValue}>70%</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Savings buffer</Text>
              <Text style={[styles.summaryValue, { color: colors.orange }]}>Low</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Move-ready</Text>
              <Text style={[styles.summaryValue, { color: colors.green }]}>68%</Text>
            </View>
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
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
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
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -1,
  },
  tabToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.button,
    padding: 3,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: radius.button - 1,
  },
  tabBtnActive: {
    backgroundColor: colors.accent,
  },
  tabBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabBtnTextActive: {
    color: colors.primary,
  },
  expenseCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 2,
  },
  totalRowLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  totalRowAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -0.5,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  noteText: {
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
    lineHeight: 17,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '500',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
});
