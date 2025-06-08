import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { SEOHead } from '@/components/SEOHead';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  
  const router = useRouter();
  const { login } = useAuth();

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  // Confirm password validation
  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  // Handle email change
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  // Handle password change
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
    // Also validate confirm password if it's been touched
    if (touched.confirmPassword && !isLogin) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(value, password));
    }
  };

  // Handle field blur (when user leaves the field)
  const handleBlur = (field: 'email' | 'password' | 'confirmPassword') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    switch (field) {
      case 'email':
        setEmailError(validateEmail(email));
        break;
      case 'password':
        setPasswordError(validatePassword(password));
        break;
      case 'confirmPassword':
        setConfirmPasswordError(validateConfirmPassword(confirmPassword, password));
        break;
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const emailValid = validateEmail(email) === '';
    const passwordValid = validatePassword(password) === '';
    const confirmPasswordValid = isLogin || validateConfirmPassword(confirmPassword, password) === '';
    
    return emailValid && passwordValid && confirmPasswordValid;
  };

  const handleAuth = async () => {
    // Mark all fields as touched to show validation errors
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all fields
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = !isLogin ? validateConfirmPassword(confirmPassword, password) : '';

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    // If there are validation errors, don't proceed
    if (emailValidationError || passwordValidationError || confirmPasswordValidationError) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/onboarding');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset validation when switching between login/signup
  const handleTabSwitch = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setTouched({
      email: false,
      password: false,
      confirmPassword: false,
    });
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const renderValidationError = (error: string) => {
    if (!error) return null;
    
    return (
      <View style={styles.errorContainer}>
        <AlertCircle size={16} color="#EF4444" strokeWidth={2} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  };

  return (
    <>
      <SEOHead
        title={isLogin ? "Sign In - Sanafi Digital Wallet" : "Create Account - Sanafi Digital Wallet"}
        description={isLogin ? "Sign in to your Sanafi account to access your digital wallet, manage cryptocurrencies, and enjoy AI-driven banking features." : "Create your Sanafi account and join the future of ethical onchain banking. Get started with secure digital payments and AI-powered financial insights."}
        keywords="sign in, create account, digital wallet login, cryptocurrency account, secure banking, UAE fintech"
        url="https://sanafi.com/auth"
      />
      
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <Image
                source={require('@/assets/images/android-chrome-512x512.png')}
                style={styles.heroImage}
                resizeMode="contain"
              />
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Sanafi</Text>
                <Text style={styles.tagline}>AI-Driven Ethical Onchain Banking</Text>
              </View>
            </View>

            {/* Auth Form */}
            <View style={styles.formContainer}>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, isLogin && styles.activeTab]}
                  onPress={() => handleTabSwitch(true)}
                >
                  <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, !isLogin && styles.activeTab]}
                  onPress={() => handleTabSwitch(false)}
                >
                  <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <View style={[
                    styles.inputWrapper,
                    emailError && touched.email && styles.inputError
                  ]}>
                    <Mail size={20} color="#666666" strokeWidth={2} />
                    <TextInput
                      style={styles.input}
                      placeholder="Email address"
                      placeholderTextColor="#999999"
                      value={email}
                      onChangeText={handleEmailChange}
                      onBlur={() => handleBlur('email')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {renderValidationError(emailError)}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <View style={[
                    styles.inputWrapper,
                    passwordError && touched.password && styles.inputError
                  ]}>
                    <Lock size={20} color="#666666" strokeWidth={2} />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#999999"
                      value={password}
                      onChangeText={handlePasswordChange}
                      onBlur={() => handleBlur('password')}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff size={20} color="#666666" strokeWidth={2} />
                      ) : (
                        <Eye size={20} color="#666666" strokeWidth={2} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {renderValidationError(passwordError)}
                  
                  {/* Password requirements hint for signup */}
                  {!isLogin && !passwordError && touched.password && (
                    <View style={styles.passwordHint}>
                      <Text style={styles.passwordHintText}>
                        Password must contain at least 8 characters with uppercase, lowercase, and numbers
                      </Text>
                    </View>
                  )}
                </View>

                {/* Confirm Password (Sign Up only) */}
                {!isLogin && (
                  <View style={styles.inputContainer}>
                    <View style={[
                      styles.inputWrapper,
                      confirmPasswordError && touched.confirmPassword && styles.inputError
                    ]}>
                      <Lock size={20} color="#666666" strokeWidth={2} />
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        placeholderTextColor="#999999"
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        onBlur={() => handleBlur('confirmPassword')}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? (
                          <EyeOff size={20} color="#666666" strokeWidth={2} />
                        ) : (
                          <Eye size={20} color="#666666" strokeWidth={2} />
                        )}
                      </TouchableOpacity>
                    </View>
                    {renderValidationError(confirmPasswordError)}
                  </View>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}

                {/* Auth Button */}
                <TouchableOpacity
                  style={[
                    styles.authButton,
                    (isLoading || !isFormValid()) && styles.disabledButton
                  ]}
                  onPress={handleAuth}
                  disabled={isLoading || !isFormValid()}
                >
                  <Text style={styles.authButtonText}>
                    {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                  </Text>
                  {!isLoading && <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />}
                </TouchableOpacity>

                {/* Terms (Sign Up only) */}
                {!isLogin && (
                  <Text style={styles.termsText}>
                    By creating an account, you agree to our{' '}
                    <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </Text>
                )}
              </View>
            </View>

            {/* Features Preview */}
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Why Choose Sanafi?</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Text style={styles.featureIcon}>🤖</Text>
                  </View>
                  <Text style={styles.featureText}>AI-Driven</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Text style={styles.featureIcon}>✅</Text>
                  </View>
                  <Text style={styles.featureText}>100% Ethical</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Text style={styles.featureIcon}>⛓️</Text>
                  </View>
                  <Text style={styles.featureText}>100% Onchain</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    marginTop: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#1B4D3E',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  form: {
    paddingBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Regular',
    marginLeft: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
    gap: 6,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  passwordHint: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  passwordHintText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  authButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  authButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  featuresContainer: {
    padding: 24,
  },
  featuresTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
});