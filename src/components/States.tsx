import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/tokens';

type Props = {title: string; message: string; actionLabel?: string; onAction?: () => void};
export function EmptyState({title, message, actionLabel, onAction}: Props) { return <View style={styles.state}><View style={styles.mark}><Text style={styles.markText}>-</Text></View><Text style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text>{actionLabel && <Pressable onPress={onAction} style={styles.button}><Text style={styles.buttonText}>{actionLabel}</Text></Pressable>}</View>; }
export function ErrorState(props: Props) { return <EmptyState {...props} title={props.title || 'Something went wrong'} actionLabel={props.actionLabel || 'Try again'} />; }
export function LoadingState() { return <View style={styles.state}><View style={styles.spinner}><Text style={styles.markText}>...</Text></View><Text style={styles.message}>Loading</Text></View>; }
const styles = StyleSheet.create({state: {flex: 1, minHeight: 240, alignItems: 'center', justifyContent: 'center', padding: 24}, mark: {width: 64, height: 64, borderRadius: 32, backgroundColor: colors.blue50, alignItems: 'center', justifyContent: 'center', marginBottom: 16}, spinner: {width: 64, height: 64, borderRadius: 32, backgroundColor: colors.blue100, alignItems: 'center', justifyContent: 'center', marginBottom: 16}, markText: {fontSize: 22, color: colors.blue700, fontWeight: '800'}, title: {fontSize: 18, color: colors.ink, fontWeight: '800', textAlign: 'center'}, message: {fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 8, lineHeight: 20}, button: {height: 44, minWidth: 150, backgroundColor: colors.blue700, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 18}, buttonText: {color: colors.white, fontWeight: '700'}});

