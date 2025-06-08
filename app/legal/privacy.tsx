import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe, Settings, CircleAlert as AlertCircle, FileText } from 'lucide-react-native';
import { SEOHead } from '@/components/SEOHead';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: <Shield size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `Sanafi Technologies LLC ("we", "us", or "our") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Sanafi digital wallet application and related services.

This policy applies to all users of our services and is designed to comply with UAE data protection laws, GDPR requirements, and international privacy standards.`
    },
    {
      id: 'information',
      title: '2. Information We Collect',
      icon: <Database size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `2.1 Personal Information:
• Full name, date of birth, and nationality
• Government-issued identification documents (Emirates ID, passport)
• Contact information (email, phone number, address)
• Biometric data for authentication (fingerprints, facial recognition)
• Employment and income information for KYC compliance

2.2 Financial Information:
• Bank account details and payment methods
• Transaction history and patterns
• Digital asset holdings and balances
• Credit and risk assessment data

2.3 Technical Information:
• Device information (model, operating system, unique identifiers)
• IP address and geolocation data
• App usage patterns and preferences
• Log files and error reports
• Cookies and similar tracking technologies

2.4 AI and Analytics Data:
• Spending patterns and financial behavior
• Risk assessment metrics
• Personalization preferences
• Machine learning model inputs and outputs`
    },
    {
      id: 'collection',
      title: '3. How We Collect Information',
      icon: <Eye size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `3.1 Direct Collection:
• Information you provide during account registration
• KYC verification documents and data
• Customer support interactions
• Survey responses and feedback

3.2 Automatic Collection:
• App usage data through analytics tools
• Device and network information
• Location data when using location-based features
• Biometric data through authentication systems

3.3 Third-Party Sources:
• Identity verification services
• Credit bureaus and financial institutions
• Blockchain networks and transaction data
• Regulatory databases and sanctions lists

3.4 AI-Powered Collection:
• Behavioral pattern analysis
• Fraud detection algorithms
• Personalization engines
• Risk assessment models`
    },
    {
      id: 'usage',
      title: '4. How We Use Your Information',
      icon: <Settings size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `4.1 Service Provision:
• Account creation and management
• Transaction processing and settlement
• Digital asset custody and security
• Customer support and assistance

4.2 Compliance and Security:
• KYC and AML compliance
• Fraud detection and prevention
• Risk assessment and monitoring
• Regulatory reporting requirements

4.3 AI-Powered Features:
• Personalized financial insights
• Intelligent spending categorization
• Predictive analytics and recommendations
• Automated risk assessment

4.4 Communication:
• Service updates and notifications
• Security alerts and warnings
• Marketing communications (with consent)
• Educational content and resources

4.5 Business Operations:
• Service improvement and development
• Analytics and performance monitoring
• Legal compliance and dispute resolution
• Business intelligence and reporting`
    },
    {
      id: 'sharing',
      title: '5. Information Sharing and Disclosure',
      icon: <Users size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `5.1 We may share your information with:

Service Providers:
• Cloud hosting and infrastructure providers
• Payment processors and financial institutions
• Identity verification and KYC service providers
• Customer support and communication platforms

Regulatory Authorities:
• UAE Central Bank and financial regulators
• Law enforcement agencies (when legally required)
• Tax authorities for reporting obligations
• International sanctions and compliance bodies

Business Partners:
• Card issuers and payment networks
• Cryptocurrency exchanges and liquidity providers
• Technology partners for AI and analytics
• Audit firms and compliance consultants

5.2 We do NOT sell your personal information to third parties for marketing purposes.

5.3 All sharing is subject to strict confidentiality agreements and data protection requirements.`
    },
    {
      id: 'protection',
      title: '6. Data Protection and Security',
      icon: <Lock size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `6.1 Technical Safeguards:
• End-to-end encryption for sensitive data
• Multi-factor authentication systems
• Secure cloud infrastructure with redundancy
• Regular security audits and penetration testing

6.2 Organizational Measures:
• Employee training on data protection
• Access controls and need-to-know principles
• Incident response and breach notification procedures
• Regular compliance assessments

6.3 AI Security:
• Secure model training and deployment
• Privacy-preserving machine learning techniques
• Data anonymization and pseudonymization
• Algorithmic bias detection and mitigation

6.4 Physical Security:
• Secure data centers with 24/7 monitoring
• Biometric access controls
• Environmental controls and disaster recovery
• Hardware security modules for key management`
    },
    {
      id: 'retention',
      title: '7. Data Retention',
      icon: <Database size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `7.1 Retention Periods:
• Account information: Retained while account is active plus 7 years
• Transaction records: 10 years as required by UAE regulations
• KYC documents: 5 years after account closure
• Technical logs: 2 years for security and troubleshooting

7.2 Deletion Procedures:
• Secure deletion using industry-standard methods
• Verification of complete data removal
• Certificate of destruction for sensitive documents
• Retention of minimal data for legal compliance only

7.3 Backup and Archive:
• Encrypted backups with same retention periods
• Secure archive storage for compliance records
• Regular backup testing and validation
• Automated deletion from backup systems`
    },
    {
      id: 'rights',
      title: '8. Your Privacy Rights',
      icon: <Shield size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `8.1 Access Rights:
• Request copies of your personal information
• Obtain information about how your data is processed
• Receive data in a portable format
• Access AI decision-making information

8.2 Correction Rights:
• Update or correct inaccurate information
• Complete incomplete personal data
• Request verification of data accuracy
• Appeal automated decision outcomes

8.3 Deletion Rights:
• Request deletion of personal information (subject to legal requirements)
• Withdraw consent for processing
• Object to certain types of processing
• Request restriction of processing

8.4 Control Rights:
• Opt-out of marketing communications
• Manage privacy settings and preferences
• Control biometric data collection
• Disable certain AI features

To exercise these rights, contact us at privacy@sanafi.com or through the app settings.`
    },
    {
      id: 'international',
      title: '9. International Data Transfers',
      icon: <Globe size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `9.1 Transfer Mechanisms:
• Adequacy decisions by UAE authorities
• Standard contractual clauses
• Binding corporate rules
• Explicit user consent where required

9.2 Safeguards:
• Equivalent level of protection in destination countries
• Regular monitoring of transfer arrangements
• Suspension of transfers if protections are inadequate
• Notification of any changes to transfer arrangements

9.3 Data Localization:
• UAE resident data primarily stored within UAE
• Compliance with local data residency requirements
• Cross-border transfer logs and documentation
• Regular review of data location and processing`
    },
    {
      id: 'ai',
      title: '10. AI and Automated Decision Making',
      icon: <Settings size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `10.1 AI Systems We Use:
• Fraud detection and risk assessment
• Personalized financial recommendations
• Transaction categorization and insights
• Customer support chatbots and assistance

10.2 Automated Decisions:
• Transaction approval/denial based on risk scores
• Account restrictions for suspicious activity
• Personalized content and feature recommendations
• Credit and lending decisions (where applicable)

10.3 Your Rights Regarding AI:
• Explanation of automated decision logic
• Human review of automated decisions
• Challenge or appeal automated outcomes
• Opt-out of certain automated processing

10.4 AI Transparency:
• Regular algorithm audits for bias and fairness
• Clear disclosure of AI-powered features
• User control over AI personalization
• Continuous monitoring and improvement`
    },
    {
      id: 'children',
      title: '11. Children\'s Privacy',
      icon: <Users size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `11.1 Age Restrictions:
• Our services are not intended for individuals under 18
• We do not knowingly collect information from minors
• Parental consent required for users under 21 in certain jurisdictions
• Age verification as part of KYC process

11.2 Protection Measures:
• Enhanced privacy protections for young adults (18-21)
• Parental notification for certain account activities
• Restricted access to high-risk features
• Educational resources about financial privacy

11.3 Discovery of Minor Data:
• Immediate deletion upon discovery
• Notification to parents/guardians
• Account suspension until age verification
• Compliance with applicable child protection laws`
    },
    {
      id: 'changes',
      title: '12. Changes to This Privacy Policy',
      icon: <FileText size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `12.1 Policy Updates:
• We may update this policy to reflect changes in our practices
• Material changes will be communicated with 30 days' notice
• Continued use constitutes acceptance of updated policy
• Previous versions available upon request

12.2 Notification Methods:
• In-app notifications for significant changes
• Email notifications to registered addresses
• Website posting with effective date
• Push notifications for critical privacy updates

12.3 Version Control:
• Clear version numbering and dating
• Summary of changes for each update
• Archive of previous policy versions
• Change log available upon request`
    },
    {
      id: 'contact',
      title: '13. Contact Information',
      icon: <Globe size={20} color="#1B4D3E" strokeWidth={2} />,
      content: `For privacy-related questions or concerns, please contact us:

Data Protection Officer
Sanafi Technologies LLC
Dubai International Financial Centre
Level 3, Gate Village Building 10
Dubai, United Arab Emirates

Privacy Email: privacy@sanafi.com
General Email: support@sanafi.com
Phone: +971 4 123 4567

Response Times:
• Privacy requests: Within 30 days
• Data breach notifications: Within 72 hours
• General inquiries: Within 48 hours
• Urgent security matters: Within 24 hours

You also have the right to lodge a complaint with the UAE Data Protection Authority or other relevant supervisory authorities.`
    }
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy - Sanafi Digital Wallet"
        description="Learn how Sanafi protects your privacy and personal data. Our comprehensive privacy policy covers data collection, AI usage, security measures, and your rights in our digital banking platform."
        keywords="privacy policy, data protection, personal information, AI privacy, digital wallet security, UAE data protection"
        url="https://sanafi.com/legal/privacy"
      />
      
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1B4D3E" strokeWidth={2} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Introduction */}
          <View style={styles.introSection}>
            <View style={styles.introHeader}>
              <Shield size={32} color="#1B4D3E" strokeWidth={2} />
              <Text style={styles.introTitle}>Privacy Policy</Text>
            </View>
            
            <Text style={styles.introText}>
              Your privacy is fundamental to our mission of providing ethical, AI-driven banking services. 
              This Privacy Policy explains how we collect, protect, and use your personal information 
              while delivering secure and intelligent financial services.
            </Text>
            
            <View style={styles.lastUpdated}>
              <Text style={styles.lastUpdatedText}>Last Updated: December 19, 2024</Text>
              <Text style={styles.effectiveText}>Effective Date: December 19, 2024</Text>
            </View>
          </View>

          {/* Privacy Highlights */}
          <View style={styles.highlightsSection}>
            <Text style={styles.highlightsTitle}>Privacy Highlights</Text>
            <View style={styles.highlightsList}>
              <View style={styles.highlightItem}>
                <Lock size={20} color="#22C55E" strokeWidth={2} />
                <Text style={styles.highlightText}>End-to-end encryption for all sensitive data</Text>
              </View>
              <View style={styles.highlightItem}>
                <Shield size={20} color="#22C55E" strokeWidth={2} />
                <Text style={styles.highlightText}>UAE Central Bank compliant data protection</Text>
              </View>
              <View style={styles.highlightItem}>
                <Eye size={20} color="#22C55E" strokeWidth={2} />
                <Text style={styles.highlightText}>Transparent AI decision-making processes</Text>
              </View>
              <View style={styles.highlightItem}>
                <Users size={20} color="#22C55E" strokeWidth={2} />
                <Text style={styles.highlightText}>No selling of personal data to third parties</Text>
              </View>
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

          {/* Privacy Commitment */}
          <View style={styles.commitmentSection}>
            <View style={styles.commitmentHeader}>
              <Shield size={24} color="#1B4D3E" strokeWidth={2} />
              <Text style={styles.commitmentTitle}>Our Privacy Commitment</Text>
            </View>
            
            <Text style={styles.commitmentText}>
              At Sanafi, we believe that privacy is a fundamental right. We are committed to being 
              transparent about our data practices, giving you control over your information, and 
              continuously improving our privacy protections as technology and regulations evolve.
            </Text>
            
            <Text style={styles.commitmentSubtext}>
              We regularly review and update our privacy practices to ensure they meet the highest 
              standards of data protection and align with our values of ethical, responsible banking.
            </Text>
          </View>

          {/* Contact CTA */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Questions About Your Privacy?</Text>
            <Text style={styles.ctaText}>
              Our Data Protection Officer is here to help. Contact us anytime with questions 
              about your privacy rights or how we handle your personal information.
            </Text>
            
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Contact Privacy Team</Text>
            </TouchableOpacity>
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
  highlightsSection: {
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
  highlightsTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  highlightsList: {
    gap: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  highlightText: {
    fontSize: 14,
    color: '#166534',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 12,
    flex: 1,
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
  commitmentSection: {
    backgroundColor: '#F0FDF4',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  commitmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commitmentTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginLeft: 12,
  },
  commitmentText: {
    fontSize: 14,
    color: '#166534',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  commitmentSubtext: {
    fontSize: 12,
    color: '#166534',
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  ctaSection: {
    backgroundColor: '#1B4D3E',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  ctaButtonText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  bottomSpacing: {
    height: 20,
  },
});