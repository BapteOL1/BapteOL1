import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { serviceCategories, ServiceCategory, ServiceProvider } from '../../data/mockData';

// ─── Status badge ────────────────────────────────────────────────────────────

function StatusBadge({ status, label }: { status: ServiceCategory['status']; label: string }) {
  const map = {
    booked: { bg: 'rgba(96,48,255,0.18)', color: '#746fff' },
    active: { bg: 'rgba(137,209,133,0.15)', color: '#89d185' },
    alert: { bg: colors.redDim, color: colors.red },
    pending: { bg: 'rgba(255,141,20,0.15)', color: colors.orange },
    included: { bg: 'rgba(55,148,255,0.15)', color: colors.blue },
  };
  const s = map[status];
  return (
    <View style={[badgeStyles.wrap, { backgroundColor: s.bg }]}>
      {status === 'alert' && (
        <Ionicons name="warning" size={10} color={s.color} style={{ marginRight: 3 }} />
      )}
      {status === 'booked' && (
        <Ionicons name="checkmark" size={10} color={s.color} style={{ marginRight: 3 }} />
      )}
      {status === 'active' && (
        <Ionicons name="checkmark-circle" size={10} color={s.color} style={{ marginRight: 3 }} />
      )}
      <Text style={[badgeStyles.text, { color: s.color }]}>{label}</Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

// ─── Star rating ─────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-outline'}
          size={11}
          color={colors.yellow}
        />
      ))}
    </View>
  );
}

// ─── Payment modal ────────────────────────────────────────────────────────────

interface PaymentModalProps {
  visible: boolean;
  provider: ServiceProvider | null;
  category: ServiceCategory | null;
  onClose: () => void;
  onConfirm: () => void;
}

function PaymentModal({ visible, provider, category, onClose, onConfirm }: PaymentModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'done'>('form');
  const insets = useSafeAreaInsets();

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('done');
    }, 1800);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  const handleDone = () => {
    setStep('form');
    onConfirm();
  };

  if (!provider || !category) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={pmStyles.overlay} onPress={step === 'form' ? handleClose : undefined}>
        <Pressable
          style={[pmStyles.sheet, { paddingBottom: insets.bottom + spacing.md }]}
          onPress={() => {}}
        >
          <View style={pmStyles.grabHandle} />

          {step === 'form' && (
            <>
              <Text style={pmStyles.title}>Réserver & Payer</Text>
              <View style={pmStyles.providerRow}>
                <View style={[pmStyles.providerDot, { backgroundColor: provider.color }]}>
                  <Text style={pmStyles.providerInitials}>{provider.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={pmStyles.providerName}>{provider.name}</Text>
                  <Text style={pmStyles.providerPrice}>{provider.price}</Text>
                </View>
              </View>

              <View style={pmStyles.divider} />

              <Text style={pmStyles.sectionLabel}>Carte de paiement</Text>
              <View style={pmStyles.cardRow}>
                <View style={pmStyles.cardField}>
                  <Text style={pmStyles.cardFieldLabel}>Numéro</Text>
                  <TextInput
                    style={pmStyles.cardInput}
                    placeholder="•••• •••• •••• 4242"
                    placeholderTextColor={colors.textDim}
                    keyboardType="numeric"
                    editable={false}
                  />
                </View>
              </View>
              <View style={pmStyles.cardRowSplit}>
                <View style={[pmStyles.cardField, { flex: 1, marginRight: 8 }]}>
                  <Text style={pmStyles.cardFieldLabel}>Expiration</Text>
                  <TextInput
                    style={pmStyles.cardInput}
                    placeholder="MM/AA"
                    placeholderTextColor={colors.textDim}
                    editable={false}
                  />
                </View>
                <View style={[pmStyles.cardField, { flex: 1 }]}>
                  <Text style={pmStyles.cardFieldLabel}>CVV</Text>
                  <TextInput
                    style={pmStyles.cardInput}
                    placeholder="•••"
                    placeholderTextColor={colors.textDim}
                    editable={false}
                  />
                </View>
              </View>

              <View style={pmStyles.totalRow}>
                <Text style={pmStyles.totalLabel}>Total</Text>
                <Text style={pmStyles.totalAmount}>{provider.price}</Text>
              </View>

              <TouchableOpacity style={pmStyles.payBtn} onPress={handlePay} activeOpacity={0.8}>
                <Ionicons name="lock-closed" size={14} color={colors.background} />
                <Text style={pmStyles.payBtnText}>Confirmer le paiement</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 'processing' && (
            <View style={pmStyles.centerState}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={pmStyles.processingText}>Traitement en cours…</Text>
            </View>
          )}

          {step === 'done' && (
            <View style={pmStyles.centerState}>
              <View style={pmStyles.successCircle}>
                <Ionicons name="checkmark" size={32} color={colors.background} />
              </View>
              <Text style={pmStyles.successTitle}>Réservation confirmée !</Text>
              <Text style={pmStyles.successSub}>{provider.name} · {provider.price}</Text>
              <TouchableOpacity style={pmStyles.doneBtn} onPress={handleDone} activeOpacity={0.8}>
                <Text style={pmStyles.doneBtnText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const pmStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border,
    minHeight: 380,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  providerDot: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerInitials: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  providerPrice: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  cardRow: {
    marginBottom: spacing.sm,
  },
  cardRowSplit: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  cardField: {},
  cardFieldLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 5,
    fontWeight: '500',
  },
  cardInput: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.small,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textDim,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -0.4,
  },
  payBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  payBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.background,
  },
  centerState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  processingText: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 8,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  successSub: {
    fontSize: 13,
    color: colors.textMuted,
  },
  doneBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.button,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  doneBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
});

// ─── Provider card ────────────────────────────────────────────────────────────

interface ProviderCardProps {
  provider: ServiceProvider;
  onBook: (provider: ServiceProvider) => void;
}

function ProviderCard({ provider, onBook }: ProviderCardProps) {
  return (
    <View style={pcStyles.card}>
      {provider.recommended && (
        <View style={pcStyles.recommendedBadge}>
          <Text style={pcStyles.recommendedText}>Recommandé</Text>
        </View>
      )}

      <View style={pcStyles.header}>
        <View style={[pcStyles.logoWrap, { backgroundColor: `${provider.color}22` }]}>
          <Text style={[pcStyles.logoText, { color: provider.color }]}>{provider.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={pcStyles.name}>{provider.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <Stars rating={provider.rating} />
            <Text style={pcStyles.ratingText}>
              {provider.rating} ({provider.reviews})
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={pcStyles.price}>{provider.price}</Text>
          {provider.selected && (
            <View style={pcStyles.selectedBadge}>
              <Ionicons name="checkmark" size={10} color={colors.green} />
              <Text style={pcStyles.selectedText}>Actif</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={pcStyles.priceNote}>{provider.priceNote}</Text>

      <View style={pcStyles.featuresWrap}>
        {provider.features.map((f, i) => (
          <View key={i} style={pcStyles.featureRow}>
            <Ionicons name="checkmark-circle" size={13} color={colors.accentBright} style={{ marginTop: 1 }} />
            <Text style={pcStyles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[pcStyles.btn, provider.selected ? pcStyles.btnActive : {}]}
        onPress={() => !provider.selected && onBook(provider)}
        activeOpacity={0.8}
      >
        <Text style={[pcStyles.btnText, provider.selected ? pcStyles.btnTextActive : {}]}>
          {provider.selected ? 'Prestataire actuel' : 'Sélectionner & Payer'}
        </Text>
        {!provider.selected && (
          <Ionicons name="arrow-forward" size={14} color={colors.background} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const pcStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recommendedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentDim,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.accentBright,
    letterSpacing: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 6,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '800',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  ratingText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -0.3,
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
  },
  selectedText: {
    fontSize: 10,
    color: colors.green,
    fontWeight: '700',
  },
  priceNote: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    lineHeight: 17,
  },
  featuresWrap: {
    gap: 6,
    marginBottom: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    flex: 1,
    lineHeight: 18,
  },
  btn: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  btnActive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background,
  },
  btnTextActive: {
    color: colors.textMuted,
  },
});

// ─── Category row ─────────────────────────────────────────────────────────────

interface CategoryRowProps {
  category: ServiceCategory;
  onPress: (cat: ServiceCategory) => void;
}

function CategoryRow({ category, onPress }: CategoryRowProps) {
  const selectedProvider = category.providers.find((p) => p.selected);

  return (
    <TouchableOpacity
      style={crStyles.row}
      onPress={() => onPress(category)}
      activeOpacity={0.72}
    >
      <View style={[crStyles.iconWrap, { backgroundColor: `${category.iconColor}18` }]}>
        <Ionicons name={category.icon as any} size={20} color={category.iconColor} />
      </View>

      <View style={crStyles.body}>
        <View style={crStyles.topRow}>
          <Text style={crStyles.title}>{category.title}</Text>
          <StatusBadge status={category.status} label={category.statusLabel} />
        </View>
        <Text style={crStyles.sub} numberOfLines={1}>
          {selectedProvider ? selectedProvider.name : category.currentProvider}
          {category.monthlyCost ? ` · ${category.monthlyCost}` : ''}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={colors.textDim} />
    </TouchableOpacity>
  );
}

const crStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.small,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  body: {
    flex: 1,
    gap: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  sub: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ServicesScreen() {
  const [categories, setCategories] = useState(serviceCategories);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [paymentTarget, setPaymentTarget] = useState<ServiceProvider | null>(null);

  const totalMonthly = categories.reduce((sum, cat) => {
    if (!cat.monthlyCost) return sum;
    const n = parseInt(cat.monthlyCost.replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const alertCount = categories.filter((c) => c.status === 'alert').length;
  const activeCount = categories.filter(
    (c) => c.status === 'active' || c.status === 'booked'
  ).length;

  const handleBook = (provider: ServiceProvider) => {
    setPaymentTarget(provider);
  };

  const handlePaymentConfirm = () => {
    if (!paymentTarget || !selectedCategory) return;
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== selectedCategory.id) return cat;
        return {
          ...cat,
          status: 'active' as const,
          statusLabel: 'Actif',
          monthlyCost: paymentTarget.price,
          currentProvider: paymentTarget.name,
          providers: cat.providers.map((p) => ({
            ...p,
            selected: p.id === paymentTarget.id,
          })),
        };
      })
    );
    const updated = categories.find((c) => c.id === selectedCategory.id);
    if (updated) {
      setSelectedCategory({
        ...updated,
        status: 'active',
        statusLabel: 'Actif',
        providers: updated.providers.map((p) => ({
          ...p,
          selected: p.id === paymentTarget.id,
        })),
      });
    }
    setPaymentTarget(null);
  };

  // ─── Provider list view ───────────────────────────────────────────────────

  if (selectedCategory) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Back header */}
        <View style={styles.providerHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.providerHeaderInfo}>
            <Text style={styles.providerHeaderTitle}>{selectedCategory.title}</Text>
            <Text style={styles.providerHeaderSub}>
              {selectedCategory.providers.length} prestataire
              {selectedCategory.providers.length > 1 ? 's' : ''}
            </Text>
          </View>
          <StatusBadge
            status={selectedCategory.status}
            label={selectedCategory.statusLabel}
          />
        </View>

        {/* Alert banner for urgent services */}
        {selectedCategory.status === 'alert' && (
          <View style={styles.alertBanner}>
            <Ionicons name="warning" size={14} color={colors.red} />
            <Text style={styles.alertBannerText}>
              Action requise — activez ce service avant le 1er avril
            </Text>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.providerScrollContent}
        >
          {categories
            .find((c) => c.id === selectedCategory.id)
            ?.providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onBook={handleBook}
              />
            ))}
        </ScrollView>

        <PaymentModal
          visible={paymentTarget !== null}
          provider={paymentTarget}
          category={selectedCategory}
          onClose={() => setPaymentTarget(null)}
          onConfirm={handlePaymentConfirm}
        />
      </SafeAreaView>
    );
  }

  // ─── Category list view ───────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mes Services</Text>
            <Text style={styles.subtitle}>Gérez tous vos prestataires NYC</Text>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.headerTotal}>${totalMonthly}/mo</Text>
            <Text style={styles.headerTotalLabel}>estimé</Text>
          </View>
        </View>

        {/* Alert banner */}
        {alertCount > 0 && (
          <TouchableOpacity
            style={styles.globalAlert}
            activeOpacity={0.8}
            onPress={() => {
              const alertCat = categories.find((c) => c.status === 'alert');
              if (alertCat) setSelectedCategory(alertCat);
            }}
          >
            <View style={styles.globalAlertLeft}>
              <Ionicons name="warning" size={16} color={colors.red} />
              <View>
                <Text style={styles.globalAlertTitle}>
                  {alertCount} service{alertCount > 1 ? 's' : ''} requiert votre attention
                </Text>
                <Text style={styles.globalAlertSub}>Appuyez pour résoudre</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.red} />
          </TouchableOpacity>
        )}

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Actifs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, alertCount > 0 && { color: colors.red }]}>
              {alertCount}
            </Text>
            <Text style={styles.statLabel}>Alertes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{categories.length}</Text>
            <Text style={styles.statLabel}>Services</Text>
          </View>
        </View>

        {/* Category list */}
        <Text style={styles.sectionLabel}>Tous les services</Text>
        <View style={styles.categoryCard}>
          {categories.map((cat, i) => (
            <View key={cat.id}>
              <CategoryRow category={cat} onPress={setSelectedCategory} />
              {i === categories.length - 1 && (
                <View style={{ height: 1 }} />
              )}
            </View>
          ))}
        </View>

        {/* Add service */}
        <TouchableOpacity style={styles.addServiceBtn} activeOpacity={0.7}>
          <Ionicons name="add-circle-outline" size={18} color={colors.textMuted} />
          <Text style={styles.addServiceText}>Ajouter un service</Text>
        </TouchableOpacity>
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
    marginBottom: spacing.md,
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
  headerStats: {
    alignItems: 'flex-end',
  },
  headerTotal: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -1,
  },
  headerTotalLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'right',
  },
  globalAlert: {
    backgroundColor: colors.redDim,
    borderRadius: radius.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.red}40`,
  },
  globalAlertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  globalAlertTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.red,
    marginBottom: 2,
  },
  globalAlertSub: {
    fontSize: 12,
    color: `${colors.red}aa`,
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
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  addServiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addServiceText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  // Provider detail view
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  providerHeaderInfo: {
    flex: 1,
  },
  providerHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  providerHeaderSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.redDim,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.red}30`,
  },
  alertBannerText: {
    fontSize: 13,
    color: colors.red,
    flex: 1,
    fontWeight: '500',
  },
  providerScrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl + 8,
  },
});
