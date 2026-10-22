import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {dashboardApi} from '../../api/endpoints';
import {useApi} from '../../hooks/useApi';
import {ApiConnectionBanner} from '../../components/ApiConnectionBanner';
import {ListRow, PrimaryButton, ScreenHeader} from '../../components/Primitives';
import {colors} from '../../theme/tokens';

export function InstructorDashboardScreen({onOpenGrading}: {onOpenGrading: () => void}) {
  const api = useApi(dashboardApi.instructor, false);
  const summary = api.data || {activeLearners: 1284, completionRate: 72, averageGrade: 81, pendingGrades: 6};
  const metrics = [['Active learners', String(summary.activeLearners), '+12% this month'], ['Completion', `${summary.completionRate}%`, '+3 points'], ['Avg. grade', `${summary.averageGrade}%`, 'All courses'], ['To grade', String(summary.pendingGrades), '2 overdue']];
  return <ScrollView contentContainerStyle={styles.content}><ScreenHeader eyebrow="INSTRUCTOR" title="Dashboard" /><ApiConnectionBanner /><View style={styles.grid}>{metrics.map(item => <View key={item[0]} style={styles.metric}><Text style={styles.label}>{item[0]}</Text><Text style={styles.value}>{item[1]}</Text><Text style={styles.note}>{item[2]}</Text></View>)}</View><View style={styles.card}><Text style={styles.cardTitle}>Engagement, last 7 days</Text><View style={styles.chart}>{[40, 62, 48, 72, 57, 84, 65].map((height, index) => <View key={index} style={styles.track}><View style={[styles.bar, {height}]} /></View>)}</View></View><View style={styles.section}><Text style={styles.sectionTitle}>To grade</Text><Pressable onPress={onOpenGrading}><Text style={styles.link}>See all</Text></Pressable></View><ListRow title="Assignment 1" detail="Mercy Ibe, 2h ago" badge="Pending" onPress={onOpenGrading} /><ListRow title="Assignment 1" detail="Chi Eze, 5h ago" badge="Pending" onPress={onOpenGrading} /><PrimaryButton label="Refresh dashboard data" outline onPress={() => void api.refresh()} /></ScrollView>;
}

const styles = StyleSheet.create({content: {padding: 16, paddingBottom: 32}, grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24}, metric: {width: '47.8%', minHeight: 92, padding: 12, borderRadius: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line}, label: {fontSize: 12, color: colors.muted, marginBottom: 8}, value: {fontSize: 24, color: colors.ink, fontWeight: '800'}, note: {fontSize: 11, color: colors.blue700, marginTop: 4}, card: {backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.line, padding: 14, marginBottom: 24}, cardTitle: {fontSize: 14, color: colors.ink, fontWeight: '700'}, chart: {height: 112, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: 18}, track: {height: 84, width: 26, justifyContent: 'flex-end', backgroundColor: colors.blue50, borderRadius: 5}, bar: {width: '100%', backgroundColor: colors.blue600, borderRadius: 5}, section: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}, sectionTitle: {fontSize: 18, color: colors.ink, fontWeight: '800'}, link: {fontSize: 12, color: colors.blue700, fontWeight: '700'}});

