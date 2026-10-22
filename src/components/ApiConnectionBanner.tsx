import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {API_BASE_URL} from '../api/client';
import {colors} from '../theme/tokens';

export function ApiConnectionBanner() { return <View style={styles.banner}><View style={styles.dot} /><View><Text style={styles.title}>API foundation ready</Text><Text style={styles.detail}>{API_BASE_URL}</Text></View></View>; }
const styles = StyleSheet.create({banner: {flexDirection: 'row', alignItems: 'center', backgroundColor: colors.blue50, borderRadius: 10, padding: 12, marginBottom: 16}, dot: {width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success, marginRight: 10}, title: {fontSize: 12, color: colors.ink, fontWeight: '700'}, detail: {fontSize: 10, color: colors.muted, marginTop: 2}});

