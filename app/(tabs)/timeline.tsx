import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { initialTimelineGroups, TaskGroup, Task } from '../../data/mockData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Move phases ──────────────────────────────────────────────────────────────

const PHASES = [
  { id: 0, label: 'Documents', icon: 'document-text-outline', done: true, active: false },
  { id: 1, label: 'Services', icon: 'flash-outline', done: false, active: true },
  { id: 2, label: 'Move-in', icon: 'cube-outline', done: false, active: false },
  { id: 3, label: 'Installé', icon: 'home-outline', done: false, active: false },
];

function PhaseTracker() {
  const animValues = useRef(PHASES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const anims = PHASES.map((p, i) =>
      Animated.timing(animValues[i], {
        toValue: 1,
        duration: 500,
        delay: i * 120,
        useNativeDriver: true,
      })
    );
    Animated.stagger(120, anims).start();
  }, [animValues]);

  return (
    <View style={phaseStyles.container}>
      {PHASES.map((phase, i) => (
        <View key={phase.id} style={phaseStyles.phaseWrap}>
          {/* Connector line */}
          {i < PHASES.length - 1 && (
            <View
              style={[
                phaseStyles.line,
                phase.done && phaseStyles.lineDone,
              ]}
            />
          )}

          {/* Dot + icon */}
          <Animated.View
            style={[
              phaseStyles.dot,
              phase.done && phaseStyles.dotDone,
              phase.active && phaseStyles.dotActive,
              {
                transform: [
                  {
                    scale: animValues[i].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {phase.done ? (
              <Ionicons name="checkmark" size={14} color={colors.background} />
            ) : phase.active ? (
              <Ionicons name={phase.icon as any} size={13} color="#fff" />
            ) : (
              <View style={phaseStyles.dotEmpty} />
            )}
          </Animated.View>

          {/* Label */}
          <Text
            style={[
              phaseStyles.label,
              phase.done && phaseStyles.labelDone,
              phase.active && phaseStyles.labelActive,
            ]}
            numberOfLines={1}
          >
            {phase.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const phaseStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  phaseWrap: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: 15,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: colors.border,
    zIndex: 0,
  },
  lineDone: {
    backgroundColor: colors.green,
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 6,
  },
  dotDone: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  dotActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accentBright,
  },
  dotEmpty: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textDim,
  },
  label: {
    fontSize: 10,
    color: colors.textDim,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelDone: {
    color: colors.green,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.accent,
    fontWeight: '700',
  },
});

// ─── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value,
      duration: 1000,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, [anim, value]);

  return (
    <View style={pbStyles.track}>
      <Animated.View
        style={[
          pbStyles.fill,
          {
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const pbStyles = StyleSheet.create({
  track: {
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    flex: 1,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
});

// ─── Task row ─────────────────────────────────────────────────────────────────

interface TaskRowProps {
  task: Task;
  onPress: (task: Task) => void;
  onToggle: (taskId: string) => void;
  animValue: Animated.Value;
}

function TaskRow({ task, onPress, onToggle, animValue }: TaskRowProps) {
  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0.94,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onToggle(task.id);
  };

  return (
    <Animated.View style={{ transform: [{ scale: animValue }] }}>
      <TouchableOpacity
        style={trStyles.row}
        onPress={() => onPress(task)}
        activeOpacity={0.75}
      >
        <TouchableOpacity
          style={[trStyles.checkbox, task.completed && trStyles.checkboxDone]}
          onPress={handleToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={11} color={colors.background} />
          )}
        </TouchableOpacity>

        <View style={trStyles.content}>
          <Text
            style={[trStyles.title, task.completed && trStyles.titleDone]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
        </View>

        <View style={trStyles.right}>
          {task.dueBg ? (
            <View style={[trStyles.dueBadge, { backgroundColor: task.dueBg }]}>
              <Text style={[trStyles.dueText, { color: task.dueColor }]}>
                {task.dueLabel}
              </Text>
            </View>
          ) : (
            <Text style={[trStyles.duePlain, { color: task.dueColor }]}>
              {task.dueLabel}
            </Text>
          )}
          <Ionicons
            name="chevron-forward"
            size={13}
            color={colors.textDim}
            style={{ marginLeft: 4 }}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const trStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.borderBright,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 19,
  },
  titleDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  dueBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  dueText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  duePlain: {
    fontSize: 11,
    fontWeight: '500',
  },
});

// ─── Task detail sheet ────────────────────────────────────────────────────────

function TaskDetailSheet({
  task,
  onClose,
}: {
  task: Task | null;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  if (!task) return null;

  const categoryIcons: Record<string, string> = {
    electricity: 'flash-outline',
    internet: 'wifi-outline',
    insurance: 'shield-checkmark-outline',
    moving: 'cube-outline',
    lease: 'document-text-outline',
  };

  return (
    <Modal
      visible={task !== null}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={sheetStyles.overlay} onPress={onClose}>
        <Pressable
          style={[sheetStyles.sheet, { paddingBottom: insets.bottom + spacing.md }]}
          onPress={() => {}}
        >
          <View style={sheetStyles.grabHandle} />

          <View style={sheetStyles.header}>
            <View style={sheetStyles.headerLeft}>
              <View style={sheetStyles.categoryIcon}>
                <Ionicons
                  name={(categoryIcons[task.category] || 'time-outline') as any}
                  size={16}
                  color={colors.accentBright}
                />
              </View>
              <Text style={sheetStyles.title}>{task.title}</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {task.dueLabel && (
            <View style={sheetStyles.dueRow}>
              <Ionicons name="time-outline" size={13} color={colors.textMuted} />
              <Text style={[sheetStyles.dueText, { color: task.dueColor }]}>
                {task.dueLabel}
              </Text>
            </View>
          )}

          <View style={sheetStyles.section}>
            <Text style={sheetStyles.sectionLabel}>Que faire</Text>
            <Text style={sheetStyles.body}>{task.description}</Text>
          </View>

          <View style={sheetStyles.section}>
            <Text style={sheetStyles.sectionLabel}>Pourquoi c'est important</Text>
            <Text style={sheetStyles.body}>{task.whyItMatters}</Text>
          </View>

          <TouchableOpacity
            style={[
              sheetStyles.actionBtn,
              task.completed && sheetStyles.actionBtnDone,
            ]}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Text
              style={[
                sheetStyles.actionText,
                task.completed && sheetStyles.actionTextDone,
              ]}
            >
              {task.actionLabel}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const sheetStyles = StyleSheet.create({
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
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginRight: spacing.sm,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.accentDim,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    lineHeight: 24,
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing.md,
    marginLeft: 40,
  },
  dueText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 21,
  },
  actionBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  actionBtnDone: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.background,
  },
  actionTextDone: {
    color: colors.textMuted,
  },
});

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function TimelineScreen() {
  const [groups, setGroups] = useState<TaskGroup[]>(initialTimelineGroups);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const animRefs = useRef<Record<string, Animated.Value>>({});

  const allTasks = groups.flatMap((g) => g.tasks);
  allTasks.forEach((t) => {
    if (!animRefs.current[t.id]) {
      animRefs.current[t.id] = new Animated.Value(1);
    }
  });

  const completedCount = allTasks.filter((t) => t.completed).length;
  const progress = completedCount / allTasks.length;
  const urgentCount = allTasks.filter(
    (t) => !t.completed && t.dueBg && t.dueColor === colors.red
  ).length;

  const handleToggle = (taskId: string) => {
    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }))
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Timeline</Text>
            <Text style={styles.subtitle}>Move-in : 1er avril 2025</Text>
          </View>
          <View style={styles.countdownWrap}>
            <Text style={styles.countdownNumber}>8</Text>
            <Text style={styles.countdownLabel}>jours</Text>
          </View>
        </View>

        {/* Progress row */}
        <View style={styles.progressRow}>
          <ProgressBar value={progress} />
          <Text style={styles.progressCount}>
            {completedCount}/{allTasks.length} tâches
          </Text>
        </View>

        {/* Urgency alert */}
        {urgentCount > 0 && (
          <View style={styles.urgentBanner}>
            <Ionicons name="warning" size={14} color={colors.red} />
            <Text style={styles.urgentText}>
              {urgentCount} tâche{urgentCount > 1 ? 's' : ''} urgente{urgentCount > 1 ? 's' : ''} — action requise aujourd'hui
            </Text>
          </View>
        )}

        {/* Phase tracker */}
        <PhaseTracker />

        {/* Task groups */}
        {groups.map((group) => (
          <View key={group.id} style={styles.group}>
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <Text style={styles.groupCount}>
                {group.tasks.filter((t) => t.completed).length}/{group.tasks.length}
              </Text>
            </View>
            <View style={styles.groupCard}>
              {group.tasks.map((task, i) => (
                <View key={task.id}>
                  <TaskRow
                    task={task}
                    onPress={setSelectedTask}
                    onToggle={handleToggle}
                    animValue={animRefs.current[task.id]}
                  />
                  {i < group.tasks.length - 1 && (
                    <View style={styles.taskDivider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Key dates */}
        <Text style={styles.sectionLabel}>Dates clés du contrat</Text>
        <View style={styles.datesCard}>
          {[
            { label: 'Début du bail', value: '1 avr. 2025', icon: 'calendar-outline', color: colors.accent },
            { label: 'Fenêtre de renouvellement', value: '1 oct. 2025', icon: 'refresh-outline', color: colors.blue },
            { label: 'Fermeture résiliation anticipée', value: '1 oct. 2025', icon: 'warning-outline', color: colors.orange },
            { label: '1ère augmentation possible', value: '1 nov. 2025', icon: 'trending-up-outline', color: colors.yellow },
          ].map((d, i, arr) => (
            <View
              key={d.label}
              style={[styles.dateRow, i < arr.length - 1 && styles.dateRowBorder]}
            >
              <View style={[styles.dateIconWrap, { backgroundColor: `${d.color}18` }]}>
                <Ionicons name={d.icon as any} size={15} color={d.color} />
              </View>
              <View style={styles.dateContent}>
                <Text style={styles.dateLabel}>{d.label}</Text>
                <Text style={styles.dateValue}>{d.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={13} color={colors.textDim} />
            </View>
          ))}
        </View>
      </ScrollView>

      <TaskDetailSheet
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl + 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.md,
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
  countdownWrap: {
    backgroundColor: colors.accentDim,
    borderRadius: radius.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.accent}40`,
  },
  countdownNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.accentBright,
    letterSpacing: -1,
    lineHeight: 26,
  },
  countdownLabel: {
    fontSize: 9,
    color: colors.accentBright,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  progressCount: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    flexShrink: 0,
  },
  urgentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.redDim,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginHorizontal: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: `${colors.red}35`,
  },
  urgentText: {
    fontSize: 13,
    color: colors.red,
    fontWeight: '500',
    flex: 1,
  },
  group: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  groupCount: {
    fontSize: 11,
    color: colors.textDim,
    fontWeight: '500',
  },
  groupCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  taskDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 34,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  datesCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.md,
    overflow: 'hidden',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    gap: 12,
  },
  dateRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
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
});
