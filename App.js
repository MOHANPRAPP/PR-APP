import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [role, setRole] = useState(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [details, setDetails] = useState('');

  const login = () => {
    if (role === 'editor') {
      if (password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 digits');
        return;
      }
    } else if (phone.length < 10) {
      Alert.alert('Error', 'Enter a 10-digit mobile number');
      return;
    }

    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.loginContent}>
          <Text style={styles.title}>PR App</Text>
          <Text style={styles.subtitle}>Smart Quotations</Text>

          <View style={styles.roleRow}>
            {['customer', 'vendor', 'editor'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.roleButton, role === item && styles.roleButtonActive]}
                onPress={() => setRole(item)}
              >
                <Text style={[styles.roleText, role === item && styles.roleTextActive]}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {role === 'editor' ? (
            <TextInput
              style={styles.input}
              placeholder="Editor Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={login}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>PR App</Text>
            <Text style={styles.subtitle}>Welcome</Text>
          </View>
          <TouchableOpacity onPress={() => setLoggedIn(false)}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {role === 'customer' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Request a quotation</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Requirement details"
              value={details}
              onChangeText={setDetails}
              multiline
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                if (!details.trim()) {
                  Alert.alert('Error', 'Enter requirement details');
                  return;
                }
                Alert.alert('Success', 'Quotation request submitted');
                setDetails('');
              }}
            >
              <Text style={styles.primaryButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        )}

        {role !== 'customer' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {role === 'editor' ? 'Editor Dashboard' : 'Vendor Dashboard'}
            </Text>
            <Text style={styles.bodyText}>
              {role === 'editor'
                ? 'Manage quotations, vendors, payments, and settings.'
                : 'View customer requests and submit quotations.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },
  loginContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  mainContent: { padding: 20 },
  title: { color: '#111827', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#6B7280', fontSize: 16, marginBottom: 24 },
  roleRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  roleButton: { flex: 1, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingVertical: 12, alignItems: 'center', backgroundColor: '#FFF' },
  roleButtonActive: { borderColor: '#2563EB', backgroundColor: '#DBEAFE' },
  roleText: { color: '#374151', fontWeight: '600', fontSize: 12 },
  roleTextActive: { color: '#1D4ED8' },
  input: { width: '100%', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, backgroundColor: '#FFF', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16, color: '#111827' },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  primaryButton: { backgroundColor: '#2563EB', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  logoutText: { color: '#DC2626', fontWeight: '700', padding: 8 },
  card: { backgroundColor: '#FFF', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  cardTitle: { color: '#111827', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  bodyText: { color: '#4B5563', lineHeight: 22 },
});
