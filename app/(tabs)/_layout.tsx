import { Tabs } from 'expo-router';
import { colors } from '../../constants/theme';
import {
  HomeIcon,
  SearchIcon,
  PlanIcon,
  AIIcon,
  TimelineIcon,
} from '../../components/TabIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 82,
          paddingBottom: 18,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.accentBright,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.25)',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color }) => <SearchIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'Services',
          tabBarIcon: ({ color }) => <PlanIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'IA',
          tabBarIcon: ({ color }) => <AIIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color }) => <TimelineIcon color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
