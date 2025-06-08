import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, Upload, User, MapPin, Calendar, Phone, Mail, ArrowRight, ArrowLeft, CircleCheck as CheckCircle, CircleAlert as AlertCircle, FileText, Shield } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { SkipKYCModal } from '@/components/SkipKYCModal';

interface KYCData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    emirate: string;
    postalCode: string;
  };
  documents: {
    emiratesId: string | null;
    passport: string | null;
    selfie: string | null;
  };
  verification: {
    phoneVerified: boolean;
    emailVerified: boolean;
    documentsVerified: boolean;
  };
}

const emirates = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah',
];

export default function KYCScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [kycData, setKycData] = useState<KYCData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: 'United Arab Emirates',
      phoneNumber: '',
      email: '',
      address: '',
      city: '',
      emirate: 'Dubai',
      postalCode: '',
    },
    documents: {
      emiratesId: null,
      passport: null,
      selfie: null,
    },
    verification: {
      phoneVerified: false,
      emailVerified: false,
      documentsVerified: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { completeKYC } = useAuth();

  const steps = [
    { title: 'Personal Information', icon: User },
    { title: 'Document Upload', icon: FileText },
    { title: 'Verification', icon: Shield },
    { title: 'Review & Submit', icon: CheckCircle },
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const handleSkipConfirm = () => {
    console.log('Skipping KYC, completing and navigating to tabs');
    setShowSkipModal(false);
    completeKYC();
    // Use replace to ensure we don't go back to KYC
    router.replace('/(tabs)');
  };

  const handleSkipCancel = () => {
    setShowSkipModal(false);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        const { firstName, lastName, dateOfBirth, phoneNumber, email, address } = kycData.personalInfo;
        if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !email || !address) {
          Alert.alert('Error', 'Please fill in all required fields');
          return false;
        }
        break;
      case 1:
        if (!kycData.documents.emiratesId || !kycData.documents.selfie) {
          Alert.alert('Error', 'Please upload all required documents');
          return false;
        }
        break;
      case 2:
        if (!kycData.verification.phoneVerified || !kycData.verification.emailVerified) {
          Alert.alert('Error', 'Please complete all verification steps');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'KYC Submitted Successfully',
        'Your verification documents have been submitted. We will review them within 24-48 hours and notify you of the status.',
        [
          {
            text: 'Continue',
            onPress: () => {
              completeKYC();
              router.replace('/(tabs)');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit KYC. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setKycData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleDocumentUpload = (type: 'emiratesId' | 'passport' | 'selfie') => {
    // Simulate document upload
    const mockImageUrl = `https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1`;
    
    setKycData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: mockImageUrl,
      },
    }));
  };

  const handleVerification = (type: 'phone' | 'email') => {
    // Simulate verification process
    Alert.alert(
      'Verification Code Sent',
      `A verification code has been sent to your ${type}. Please enter the code below.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setKycData(prev => ({
              ...prev,
              verification: {
                ...prev.verification,
                [`${type}Verified`]: true,
              },
            }));
          },
        },
      ]
    );
  };

  const renderPersonalInfoStep = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepDescription}>
        Please provide your personal details as they appear on your official documents.
      </Text>

      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>First Name *</Text>
          <TextInput
            style={styles.textInput}
            value={kycData.personalInfo.firstName}
            onChangeText={(value) => updatePersonalInfo('firstName', value)}
            placeholder="Enter first name"
            placeholderTextColor="#999999"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Last Name *</Text>
          <TextInput
            style={styles.textInput}
            value={kycData.personalInfo.lastName}
            onChangeText={(value) => updatePersonalInfo('lastName', value)}
            placeholder="Enter last name"
            placeholderTextColor="#999999"
          />
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Date of Birth *</Text>
        <TextInput
          style={styles.textInput}
          value={kycData.personalInfo.dateOfBirth}
          onChangeText={(value) => updatePersonalInfo('dateOfBirth', value)}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#999999"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Phone Number *</Text>
        <TextInput
          style={styles.textInput}
          value={kycData.personalInfo.phoneNumber}
          onChangeText={(value) => updatePersonalInfo('phoneNumber', value)}
          placeholder="+971 50 123 4567"
          placeholderTextColor="#999999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Email Address *</Text>
        <TextInput
          style={styles.textInput}
          value={kycData.personalInfo.email}
          onChangeText={(value) => updatePersonalInfo('email', value)}
          placeholder="your.email@example.com"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Address *</Text>
        <TextInput
          style={styles.textInput}
          value={kycData.personalInfo.address}
          onChangeText={(value) => updatePersonalInfo('address', value)}
          placeholder="Enter your full address"
          placeholderTextColor="#999999"
          multiline
        />
      </View>

      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>City</Text>
          <TextInput
            style={styles.textInput}
            value={kycData.personalInfo.city}
            onChangeText={(value) => updatePersonalInfo('city', value)}
            placeholder="Enter city"
            placeholderTextColor="#999999"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Postal Code</Text>
          <TextInput
            style={styles.textInput}
            value={kycData.personalInfo.postalCode}
            onChangeText={(value) => updatePersonalInfo('postalCode', value)}
            placeholder="12345"
            placeholderTextColor="#999999"
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScrollView>
  );

  const renderDocumentUploadStep = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Document Upload</Text>
      <Text style={styles.stepDescription}>
        Please upload clear photos of your identification documents.
      </Text>

      <View style={styles.documentSection}>
        <Text style={styles.documentTitle}>Emirates ID (Required)</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleDocumentUpload('emiratesId')}
        >
          {kycData.documents.emiratesId ? (
            <View style={styles.uploadedDocument}>
              <Image
                source={{ uri: kycData.documents.emiratesId }}
                style={styles.documentImage}
                resizeMode="cover"
              />
              <View style={styles.uploadedOverlay}>
                <CheckCircle size={24} color="#22C55E" strokeWidth={2} />
                <Text style={styles.uploadedText}>Uploaded</Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Upload size={32} color="#666666" strokeWidth={2} />
              <Text style={styles.uploadText}>Upload Emirates ID</Text>
              <Text style={styles.uploadSubtext}>Front and back sides</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.documentSection}>
        <Text style={styles.documentTitle}>Passport (Optional)</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleDocumentUpload('passport')}
        >
          {kycData.documents.passport ? (
            <View style={styles.uploadedDocument}>
              <Image
                source={{ uri: kycData.documents.passport }}
                style={styles.documentImage}
                resizeMode="cover"
              />
              <View style={styles.uploadedOverlay}>
                <CheckCircle size={24} color="#22C55E" strokeWidth={2} />
                <Text style={styles.uploadedText}>Uploaded</Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Upload size={32} color="#666666" strokeWidth={2} />
              <Text style={styles.uploadText}>Upload Passport</Text>
              <Text style={styles.uploadSubtext}>Photo page only</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.documentSection}>
        <Text style={styles.documentTitle}>Selfie Verification (Required)</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleDocumentUpload('selfie')}
        >
          {kycData.documents.selfie ? (
            <View style={styles.uploadedDocument}>
              <Image
                source={{ uri: kycData.documents.selfie }}
                style={styles.documentImage}
                resizeMode="cover"
              />
              <View style={styles.uploadedOverlay}>
                <CheckCircle size={24} color="#22C55E" strokeWidth={2} />
                <Text style={styles.uploadedText}>Uploaded</Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Camera size={32} color="#666666" strokeWidth={2} />
              <Text style={styles.uploadText}>Take Selfie</Text>
              <Text style={styles.uploadSubtext}>Hold your ID next to your face</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderVerificationStep = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Verification</Text>
      <Text style={styles.stepDescription}>
        We need to verify your contact information for security purposes.
      </Text>

      <View style={styles.verificationSection}>
        <View style={styles.verificationItem}>
          <View style={styles.verificationInfo}>
            <Phone size={24} color="#1B4D3E" strokeWidth={2} />
            <View style={styles.verificationDetails}>
              <Text style={styles.verificationTitle}>Phone Number</Text>
              <Text style={styles.verificationSubtitle}>{kycData.personalInfo.phoneNumber}</Text>
            </View>
          </View>
          {kycData.verification.phoneVerified ? (
            <View style={styles.verifiedBadge}>
              <CheckCircle size={20} color="#22C55E" strokeWidth={2} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => handleVerification('phone')}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.verificationItem}>
          <View style={styles.verificationInfo}>
            <Mail size={24} color="#1B4D3E" strokeWidth={2} />
            <View style={styles.verificationDetails}>
              <Text style={styles.verificationTitle}>Email Address</Text>
              <Text style={styles.verificationSubtitle}>{kycData.personalInfo.email}</Text>
            </View>
          </View>
          {kycData.verification.emailVerified ? (
            <View style={styles.verifiedBadge}>
              <CheckCircle size={20} color="#22C55E" strokeWidth={2} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => handleVerification('email')}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.securityNote}>
        <AlertCircle size={20} color="#F59E0B" strokeWidth={2} />
        <Text style={styles.securityNoteText}>
          Your information is encrypted and stored securely in compliance with UAE data protection regulations.
        </Text>
      </View>
    </ScrollView>
  );

  const renderReviewStep = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      <Text style={styles.stepDescription}>
        Please review your information before submitting for verification.
      </Text>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Personal Information</Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Name:</Text>
          <Text style={styles.reviewValue}>
            {kycData.personalInfo.firstName} {kycData.personalInfo.lastName}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Date of Birth:</Text>
          <Text style={styles.reviewValue}>{kycData.personalInfo.dateOfBirth}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Phone:</Text>
          <Text style={styles.reviewValue}>{kycData.personalInfo.phoneNumber}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Email:</Text>
          <Text style={styles.reviewValue}>{kycData.personalInfo.email}</Text>
        </View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Documents</Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Emirates ID:</Text>
          <View style={styles.reviewStatus}>
            <CheckCircle size={16} color="#22C55E" strokeWidth={2} />
            <Text style={styles.reviewStatusText}>Uploaded</Text>
          </View>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Selfie:</Text>
          <View style={styles.reviewStatus}>
            <CheckCircle size={16} color="#22C55E" strokeWidth={2} />
            <Text style={styles.reviewStatusText}>Uploaded</Text>
          </View>
        </View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Verification Status</Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Phone Verified:</Text>
          <View style={styles.reviewStatus}>
            <CheckCircle size={16} color="#22C55E" strokeWidth={2} />
            <Text style={styles.reviewStatusText}>Verified</Text>
          </View>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Email Verified:</Text>
          <View style={styles.reviewStatus}>
            <CheckCircle size={16} color="#22C55E" strokeWidth={2} />
            <Text style={styles.reviewStatusText}>Verified</Text>
          </View>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By submitting this information, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>. Your data will be processed in accordance with UAE regulations.
        </Text>
      </View>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfoStep();
      case 1:
        return renderDocumentUploadStep();
      case 2:
        return renderVerificationStep();
      case 3:
        return renderReviewStep();
      default:
        return renderPersonalInfoStep();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.activeDot,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.placeholder} />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <Text style={styles.headerSubtitle}>Step {currentStep + 1} of {steps.length}</Text>
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.progressStep}>
            <View style={[
              styles.progressCircle,
              index <= currentStep && styles.activeProgressCircle,
              index < currentStep && styles.completedProgressCircle,
            ]}>
              {index < currentStep ? (
                <CheckCircle size={16} color="#FFFFFF" strokeWidth={2} />
              ) : (
                <step.icon 
                  size={16} 
                  color={index <= currentStep ? "#FFFFFF" : "#CCCCCC"} 
                  strokeWidth={2} 
                />
              )}
            </View>
            <Text style={[
              styles.progressLabel,
              index <= currentStep && styles.activeProgressLabel,
            ]}>
              {step.title}
            </Text>
            {index < steps.length - 1 && (
              <View style={[
                styles.progressLine,
                index < currentStep && styles.completedProgressLine,
              ]} />
            )}
          </View>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderCurrentStep()}
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePrevious}
          style={[styles.navButton, styles.previousButton]}
          disabled={currentStep === 0}
        >
          <ArrowLeft 
            size={20} 
            color={currentStep === 0 ? '#CCCCCC' : '#1B4D3E'} 
            strokeWidth={2} 
          />
          <Text style={[
            styles.navButtonText,
            currentStep === 0 && styles.disabledText
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.navButton, styles.nextButton]}
          disabled={isLoading}
        >
          <Text style={styles.nextButtonText}>
            {isLoading ? 'Submitting...' : 
             currentStep === steps.length - 1 ? 'Submit KYC' : 'Next'}
          </Text>
          {!isLoading && <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />}
        </TouchableOpacity>
      </View>

      {/* Skip KYC Modal */}
      <SkipKYCModal
        visible={showSkipModal}
        onConfirm={handleSkipConfirm}
        onCancel={handleSkipCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
  },
  activeDot: {
    backgroundColor: '#1B4D3E',
    width: 24,
  },
  placeholder: {
    width: 60,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  stepsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeProgressCircle: {
    backgroundColor: '#1B4D3E',
  },
  completedProgressCircle: {
    backgroundColor: '#22C55E',
  },
  progressLabel: {
    fontSize: 10,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  activeProgressLabel: {
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  progressLine: {
    position: 'absolute',
    top: 20,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: '#CCCCCC',
    zIndex: -1,
  },
  completedProgressLine: {
    backgroundColor: '#22C55E',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepTitle: {
    fontSize: 24,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
    marginBottom: 32,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formField: {
    flex: 1,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentSection: {
    marginBottom: 24,
  },
  documentTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  uploadButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  uploadedDocument: {
    position: 'relative',
  },
  documentImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  uploadedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 8,
  },
  verificationSection: {
    gap: 16,
    marginBottom: 32,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  verificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  verificationDetails: {
    marginLeft: 16,
    flex: 1,
  },
  verificationTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedText: {
    fontSize: 14,
    color: '#22C55E',
    fontFamily: 'Poppins-SemiBold',
  },
  verifyButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  verifyButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  securityNoteText: {
    fontSize: 14,
    color: '#92400E',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    flex: 1,
  },
  reviewSection: {
    marginBottom: 24,
  },
  reviewSectionTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  reviewLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  reviewValue: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
    textAlign: 'right',
  },
  reviewStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewStatusText: {
    fontSize: 14,
    color: '#22C55E',
    fontFamily: 'Poppins-SemiBold',
  },
  termsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    textAlign: 'center',
  },
  termsLink: {
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
  },
  previousButton: {
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: '#1B4D3E',
  },
  navButtonText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  disabledText: {
    color: '#CCCCCC',
  },
});