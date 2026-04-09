import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';

type UploadState = 'idle' | 'loading' | 'complete';

interface RiskItem {
  id: string;
  severity: 'high' | 'medium' | 'low';
  borderColor: string;
  bgColor: string;
  label: string;
  title: string;
  detail: string;
  action: string;
}

const risks: RiskItem[] = [
  {
    id: 'r1',
    severity: 'high',
    borderColor: colors.red,
    bgColor: colors.redDim,
    label: 'HIGH RISK',
    title: 'Early Termination Fee: $6,760',
    detail: '2 months rent. Negotiable.',
    action: 'Ask to reduce to 1 month rent in your counter-offer.',
  },
  {
    id: 'r2',
    severity: 'medium',
    borderColor: colors.orange,
    bgColor: colors.orangeDim,
    label: 'MEDIUM RISK',
    title: 'Rent increase clause: up to 8%',
    detail: 'At renewal.',
    action: 'NYC allows negotiation before signing — push to cap at 3%.',
  },
  {
    id: 'r3',
    severity: 'low',
    borderColor: colors.yellow,
    bgColor: colors.yellowDim,
    label: 'LOW RISK',
    title: 'No subletting without written consent',
    detail: 'Standard clause.',
    action: 'Standard but worth knowing if travel plans change.',
  },
];

const keyDates = [
  { label: 'Lease start', value: 'Apr 1, 2025', icon: 'calendar-outline' },
  { label: 'First renewal', value: 'Nov 1, 2025', icon: 'refresh-outline' },
  { label: 'ETF closes', value: 'Oct 1, 2025', icon: 'warning-outline' },
] as const;

function UploadIcon() {
  return (
    <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2 C12 2 6 9 6 13.5 A6 6 0 0 0 18 13.5 C18 9 12 2 12 2 Z"
        stroke={colors.textMuted}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22V13M8 17L12 13L16 17"
        stroke={colors.textMuted}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function AIScreen() {
  const [uploadState, setUploadState] = useState<UploadState>('idle');

  const handleUpload = () => {
    if (uploadState !== 'idle') return;
    setUploadState('loading');
    setTimeout(() => setUploadState('complete'), 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Lease Analysis</Text>
          <Text style={styles.subtitle}>
            Upload your lease and get instant risk analysis
          </Text>
        </View>

        {/* Upload Area */}
        <TouchableOpacity
          style={[
            styles.uploadArea,
            uploadState === 'complete' && styles.uploadAreaComplete,
          ]}
          onPress={handleUpload}
          activeOpacity={0.7}
          disabled={uploadState !== 'idle'}
        >
          {uploadState === 'idle' && (
            <>
              <UploadIcon />
              <Text style={styles.uploadTitle}>Upload your lease</Text>
              <Text style={styles.uploadSubtitle}>PDF or DOCX · up to 50MB</Text>
              <View style={styles.uploadBtn}>
                <Text style={styles.uploadBtnText}>Choose File</Text>
              </View>
            </>
          )}

          {uploadState === 'loading' && (
            <>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={styles.uploadTitle}>Analyzing lease...</Text>
              <Text style={styles.uploadSubtitle}>
                AI is reading 28 pages · usually under 10 seconds
              </Text>
            </>
          )}

          {uploadState === 'complete' && (
            <>
              <View style={styles.uploadDone}>
                <Ionicons name="checkmark-circle" size={32} color={colors.green} />
              </View>
              <Text style={[styles.uploadTitle, { color: colors.green }]}>
                Analysis complete
              </Text>
              <Text style={styles.uploadSubtitle}>
                lease_350w42nd.pdf · 28 pages
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Analysis Results — shown after upload */}
        {uploadState === 'complete' && (
          <>
            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <View style={styles.summaryIcon}>
                  <Ionicons name="document-text" size={20} color={colors.accent} />
                </View>
                <View style={styles.summaryText}>
                  <Text style={styles.summaryTitle}>
                    Your lease is 28 pages.
                  </Text>
                  <Text style={styles.summaryBody}>
                    Risk level:{' '}
                    <Text style={{ color: colors.orange, fontWeight: '700' }}>
                      Medium
                    </Text>
                    {'  ·  '}
                    <Text style={{ color: colors.red, fontWeight: '700' }}>
                      3 issues flagged
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Risk Cards */}
            <Text style={styles.sectionLabel}>Flagged Issues</Text>
            {risks.map((risk) => (
              <View
                key={risk.id}
                style={[styles.riskCard, { backgroundColor: risk.bgColor }]}
              >
                <View
                  style={[styles.riskBorder, { backgroundColor: risk.borderColor }]}
                />
                <View style={styles.riskContent}>
                  <Text style={[styles.riskLabel, { color: risk.borderColor }]}>
                    {risk.label}
                  </Text>
                  <Text style={styles.riskTitle}>{risk.title}</Text>
                  <Text style={styles.riskDetail}>{risk.detail}</Text>
                  <View style={styles.riskActionRow}>
                    <Ionicons
                      name="bulb-outline"
                      size={13}
                      color={colors.textMuted}
                    />
                    <Text style={styles.riskAction}>{risk.action}</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Key Dates */}
            <Text style={styles.sectionLabel}>Key Dates</Text>
            <View style={styles.datesCard}>
              {keyDates.map((d, i) => (
                <View
                  key={d.label}
                  style={[
                    styles.dateRow,
                    i < keyDates.length - 1 && styles.dateRowBorder,
                  ]}
                >
                  <View style={styles.dateIconWrap}>
                    <Ionicons
                      name={d.icon}
                      size={16}
                      color={colors.accent}
                    />
                  </View>
                  <View style={styles.dateContent}>
                    <Text style={styles.dateLabel}>{d.label}</Text>
                    <Text style={styles.dateValue}>{d.value}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Share Button */}
            <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
              <Ionicons name="share-outline" size={18} color={colors.primary} />
              <Text style={styles.shareBtnText}>Share report</Text>
            </TouchableOpacity>
          </>
        )}
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
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  uploadArea: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    paddingVertical: 36,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    minHeight: 180,
    justifyContent: 'center',
    gap: 8,
  },
  uploadAreaComplete: {
    borderStyle: 'solid',
    borderColor: colors.green,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
  },
  uploadSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  uploadBtn: {
    marginTop: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.button,
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  uploadDone: {
    marginBottom: 4,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.small,
    backgroundColor: 'rgba(200,169,122,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  summaryBody: {
    fontSize: 13,
    color: colors.textMuted,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  riskCard: {
    flexDirection: 'row',
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  riskBorder: {
    width: 4,
  },
  riskContent: {
    flex: 1,
    padding: spacing.md,
    gap: 4,
  },
  riskLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  riskTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 20,
  },
  riskDetail: {
    fontSize: 13,
    color: colors.textMuted,
  },
  riskActionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 4,
  },
  riskAction: {
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
    lineHeight: 17,
  },
  datesCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  dateRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.xs,
    backgroundColor: 'rgba(200,169,122,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  shareBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
  },
  shareBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.2,
  },
});
