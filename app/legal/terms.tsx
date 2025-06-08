import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, FileText, Shield, Scale, Globe, Users, CircleAlert as AlertCircle } from 'lucide-react-native';
import { SEOHead } from '@/components/SEOHead';

export default function TermsOfServiceScreen() {
  const router = useRouter();

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: <FileText size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `By accessing or using the Sanafi digital wallet application ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.

These Terms constitute a legally binding agreement between you and Sanafi Technologies LLC ("Company", "we", "us", or "our"), a company incorporated under the laws of the United Arab Emirates.`
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      icon: <Globe size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `• "Service" refers to the Sanafi digital wallet application and related services
• "User" or "you" refers to any individual or entity using our Service
• "Digital Assets" refers to cryptocurrencies, tokens, and other digital currencies supported by our platform
• "Wallet" refers to the digital wallet functionality provided through our Service
• "KYC" refers to Know Your Customer verification procedures
• "AML" refers to Anti-Money Laundering compliance measures`
    },
    {
      id: 'eligibility',
      title: '3. Eligibility and Account Registration',
      icon: <Users size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `3.1 Eligibility Requirements:
• You must be at least 18 years old
• You must be a legal resident of the United Arab Emirates
• You must have the legal capacity to enter into binding agreements
• You must not be on any sanctions lists or prohibited persons lists

3.2 Account Registration:
• You must provide accurate, current, and complete information during registration
• You are responsible for maintaining the confidentiality of your account credentials
• You must complete our KYC verification process as required by UAE regulations
• One account per person is permitted`
    },
    {
      id: 'services',
      title: '4. Description of Services',
      icon: <Shield size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `4.1 Digital Wallet Services:
• Secure storage and management of supported digital assets
• Send and receive transactions in supported cryptocurrencies
• Real-time balance tracking and transaction history
• Multi-signature security features

4.2 AI-Powered Features:
• Intelligent financial insights and recommendations
• Automated transaction categorization
• Personalized spending analysis
• Risk assessment and fraud detection

4.3 Additional Services:
• Virtual and physical debit cards
• Rewards and loyalty programs
• Customer support and assistance
• Educational resources and market insights`
    },
    {
      id: 'compliance',
      title: '5. Regulatory Compliance',
      icon: <Scale size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `5.1 UAE Central Bank Compliance:
• Our services are designed to comply with UAE Central Bank regulations
• We maintain appropriate licenses and registrations as required
• We implement robust AML and CTF (Counter-Terrorism Financing) measures

5.2 KYC Requirements:
• All users must complete identity verification
• We may request additional documentation as required by law
• Enhanced due diligence may apply for high-value transactions

5.3 Reporting Obligations:
• We may report suspicious activities to relevant authorities
• We comply with all applicable tax reporting requirements
• We cooperate with law enforcement investigations as required by law`
    },
    {
      id: 'prohibited',
      title: '6. Prohibited Activities',
      icon: <AlertCircle size={20} color="#EF4444" strokeWidth={2} />,
      content: `You agree not to use our Service for:
• Money laundering or terrorist financing
• Fraud, theft, or other illegal activities
• Circumventing sanctions or export controls
• Market manipulation or insider trading
• Unauthorized access to our systems
• Violating intellectual property rights
• Transmitting malware or harmful code
• Creating multiple accounts to evade restrictions`
    },
    {
      id: 'fees',
      title: '7. Fees and Charges',
      icon: <FileText size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `7.1 Service Fees:
• Transaction fees may apply for certain operations
• Currency conversion fees for cross-border transactions
• Premium service fees for enhanced features
• Card issuance and maintenance fees

7.2 Fee Disclosure:
• All applicable fees will be clearly disclosed before transactions
• Fee schedules are available in the app and on our website
• We reserve the right to modify fees with 30 days' notice`
    },
    {
      id: 'risks',
      title: '8. Risk Disclosure',
      icon: <AlertCircle size={20} color="#F59E0B" strokeWidth={2} />,
      content: `8.1 Digital Asset Risks:
• Digital assets are volatile and may lose value
• Transactions are generally irreversible
• Regulatory changes may affect digital asset value
• Technology risks including smart contract vulnerabilities

8.2 Platform Risks:
• Service interruptions or technical failures
• Cybersecurity threats and potential breaches
• Third-party service provider risks
• Force majeure events beyond our control

8.3 User Responsibilities:
• Secure storage of private keys and credentials
• Regular monitoring of account activity
• Prompt reporting of suspicious activities
• Understanding of digital asset mechanics`
    },
    {
      id: 'liability',
      title: '9. Limitation of Liability',
      icon: <Shield size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `9.1 Service Availability:
• We provide services on an "as is" and "as available" basis
• We do not guarantee uninterrupted or error-free service
• Scheduled maintenance may temporarily affect service availability

9.2 Liability Limitations:
• Our liability is limited to the maximum extent permitted by UAE law
• We are not liable for indirect, consequential, or punitive damages
• Our total liability shall not exceed the fees paid by you in the preceding 12 months

9.3 Indemnification:
• You agree to indemnify us against claims arising from your use of the Service
• This includes legal fees and damages resulting from your violations of these Terms`
    },
    {
      id: 'termination',
      title: '10. Account Termination',
      icon: <AlertCircle size={20} color="#EF4444" strokeWidth={2} />,
      content: `10.1 Termination by User:
• You may close your account at any time
• Outstanding balances must be withdrawn before closure
• Some restrictions may apply during the closure process

10.2 Termination by Company:
• We may suspend or terminate accounts for Terms violations
• We may terminate accounts for regulatory compliance reasons
• We will provide reasonable notice except in cases of immediate risk

10.3 Effect of Termination:
• Access to the Service will be discontinued
• You remain liable for any outstanding obligations
• Certain provisions of these Terms survive termination`
    },
    {
      id: 'governing',
      title: '11. Governing Law and Dispute Resolution',
      icon: <Scale size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `11.1 Governing Law:
• These Terms are governed by the laws of the United Arab Emirates
• Dubai International Financial Centre (DIFC) courts have jurisdiction
• UAE federal laws apply where DIFC laws do not cover specific matters

11.2 Dispute Resolution:
• We encourage resolution through direct communication
• Mediation through DIFC-Lcia Arbitration Centre if needed
• Arbitration proceedings will be conducted in English
• Class action lawsuits are waived to the extent permitted by law`
    },
    {
      id: 'changes',
      title: '12. Changes to Terms',
      icon: <FileText size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `12.1 Modification Rights:
• We may modify these Terms at any time
• Material changes will be communicated with 30 days' notice
• Continued use of the Service constitutes acceptance of modified Terms

12.2 Notification Methods:
• In-app notifications for important changes
• Email notifications to registered addresses
• Website posting of updated Terms
• Push notifications for critical updates`
    },
    {
      id: 'contact',
      title: '13. Contact Information',
      icon: <Globe size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `For questions about these Terms of Service, please contact us:

Sanafi Technologies LLC
Dubai International Financial Centre
Level 3, Gate Village Building 10
Dubai, United Arab Emirates

Email: legal@sanafi.com
Phone: +971 4 123 4567
Website: https://sanafi.com

Customer Support:
Email: support@sanafi.com
In-app chat support available 24/7`
    }
  ];

  return (
    <>
      <SEOHead
        title="Terms of Service - Sanafi Digital Wallet"
        description="Read Sanafi's Terms of Service for our AI-driven ethical onchain banking platform. Understand your rights and obligations when using our digital wallet services in the UAE."
        keywords="terms of service, legal agreement, digital wallet terms, UAE banking regulations, cryptocurrency terms"
        url="https://sanafi.com/legal/terms"
      />
      
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1B4D3E" strokeWidth={2} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Terms of Service</Text>
          
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Introduction */}
          <View style={styles.introSection}>
            <View style={styles.introHeader}>
              <FileText size={32} color="#1B4D3E" strokeWidth={2} />
              <Text style={styles.introTitle}>Terms of Service</Text>
            </View>
            
            <Text style={styles.introText}>
              Welcome to Sanafi, the world's first AI-driven ethical onchain banking platform. 
              These Terms of Service govern your use of our digital wallet services and outline 
              the legal agreement between you and Sanafi Technologies LLC.
            </Text>
            
            <View style={styles.lastUpdated}>
              <Text style={styles.lastUpdatedText}>Last Updated: December 19, 2024</Text>
              <Text style={styles.effectiveText}>Effective Date: December 19, 2024</Text>
            </View>
          </View>

          {/* Table of Contents */}
          <View style={styles.tocSection}>
            <Text style={styles.tocTitle}>Table of Contents</Text>
            <View style={styles.tocList}>
              {sections.map((section, index) => (
                <TouchableOpacity key={section.id} style={styles.tocItem}>
                  <Text style={styles.tocNumber}>{index + 1}.</Text>
                  <Text style={styles.tocText}>{section.title.substring(3)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sections */}
          {sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  {section.icon}
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          {/* Important Notice */}
          <View style={styles.noticeSection}>
            <View style={styles.noticeHeader}>
              <AlertCircle size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.noticeTitle}>Important Notice</Text>
            </View>
            
            <Text style={styles.noticeText}>
              These Terms of Service are legally binding. By using Sanafi's services, you acknowledge 
              that you have read, understood, and agree to be bound by these terms. If you do not 
              agree with any part of these terms, please do not use our services.
            </Text>
            
            <Text style={styles.noticeSubtext}>
              For questions or clarifications about these terms, please contact our legal team at 
              legal@sanafi.com or through our in-app support system.
            </Text>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  introSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 28,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginTop: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  lastUpdated: {
    backgroundColor: '#F0EADA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  effectiveText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  tocSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tocTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  tocList: {
    gap: 8,
  },
  tocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  tocNumber: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginRight: 12,
    minWidth: 20,
  },
  tocText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    flex: 1,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  noticeSection: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  noticeTitle: {
    fontSize: 18,
    color: '#92400E',
    fontFamily: 'Poppins-Bold',
    marginLeft: 12,
  },
  noticeText: {
    fontSize: 14,
    color: '#92400E',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  noticeSubtext: {
    fontSize: 12,
    color: '#92400E',
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 20,
  },
});