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
        style={styles.taskRow}
        onPress={() => onPress(task)}
        activeOpacity={0.75}
      >
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxDone]}
          onPress={handleToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={11} color={colors.primary} />
          )}
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text
            style={[styles.taskTitle, task.completed && styles.taskTitleDone]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
        </View>

        <View style={styles.taskRight}>
          {task.dueBg ? (
            <View style={[styles.dueBadge, { backgroundColor: task.dueBg }]}>
              <Text style={[styles.dueText, { color: task.dueColor }]}>
                {task.dueLabel}
              </Text>
            </View>
          ) : (
            <Text style={[styles.duePlain, { color: task.dueColor }]}>
              {task.dueLabel}
            </Text>
          )}
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.textDim}
            style={{ marginLeft: 4 }}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface TaskDetailSheetProps {
  task: Task | null;
  onClose: () => void;
}

function TaskDetailSheet({ task, onClose }: TaskDetailSheetProps) {
  const insets = useSafeAreaInsets();

  if (!task) return null;

  return (
    <Modal
      visible={task !== null}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.md }]}
          onPress={() => {}}
        >
          {/* Grab handle */}
          <View style={styles.grabHandle} />

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{task.title}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {task.dueLabel && (
            <View style={styles.sheetDueRow}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text
                style={[styles.sheetDue, { color: task.dueColor }]}
              >
                {task.dueLabel}
              </Text>
            </View>
          )}

          <View style={styles.sheetSection}>
            <Text style={styles.sheetSectionLabel}>What to do</Text>
            <Text style={styles.sheetBody}>{task.description}</Text>
          </View>

          <View style={styles.sheetSection}>
            <Text style={styles.sheetSectionLabel}>Why it matters</Text>
            <Text style={styles.sheetBody}>{task.whyItMatters}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.sheetActionBtn,
              task.completed && styles.sheetActionBtnDone,
            ]}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Text
              style={[
                styles.sheetActionText,
                task.completed && styles.sheetActionTextDone,
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

export default function TimelineScreen() {
  const [groups, setGroups] = useState<TaskGroup[]>(initialTimelineGroups);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const animRefs = useRef<Record<string, Animated.Value>>({});

  // Initialize animation values
  const allTasks = groups.flatMap((g) => g.tasks);
  allTasks.forEach((t) => {
    if (!animRefs.current[t.id]) {
      animRefs.current[t.id] = new Animated.Value(1);
    }
  });

  const completedCount = allTasks.filter((t) => t.completed).length;
  const progress = completedCount / allTasks.length;

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
            <Text style={styles.subtitle}>8 days to move-in</Text>
          </View>
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressRow}>
          <ProgressBar value={progress} />
          <Text style={styles.progressCount}>
            {completedCount}/{allTasks.length}
          </Text>
        </View>

        {/* Task Groups */}
        {groups.map((group) => (
          <View key={group.id} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl + 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  progressBadge: {
    backgroundColor: 'rgba(200,169,122,0.15)',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(200,169,122,0.3)',
  },
  progressBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -0.3,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.lg,
  },
  progressCount: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    flexShrink: 0,
  },
  group: {
    marginBottom: spacing.md,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginLeft: 2,
  },
  groupCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  taskDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 28,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  taskContent: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 19,
  },
  taskTitleDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  taskRight: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
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
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 24,
  },
  sheetDueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing.md,
  },
  sheetDue: {
    fontSize: 13,
    fontWeight: '600',
  },
  sheetSection: {
    marginBottom: spacing.md,
  },
  sheetSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  sheetBody: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 21,
  },
  sheetActionBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  sheetActionBtnDone: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sheetActionText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  sheetActionTextDone: {
    color: colors.textMuted,
  },
});
