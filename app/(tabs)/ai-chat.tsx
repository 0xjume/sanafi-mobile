import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Bot, User, Sparkles, TrendingUp, DollarSign, CircleHelp as HelpCircle } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  prompt: string;
}

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sanafi AI, your personal financial assistant. I can help you with transactions, market insights, portfolio analysis, and answer any questions about your digital wallet. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Portfolio Analysis',
      subtitle: 'Get insights on your holdings',
      icon: <TrendingUp size={20} color="#1B4D3E" strokeWidth={2} />,
      prompt: 'Can you analyze my current portfolio and provide insights?',
    },
    {
      id: '2',
      title: 'Market Trends',
      subtitle: 'Latest crypto market updates',
      icon: <DollarSign size={20} color="#1B4D3E" strokeWidth={2} />,
      prompt: 'What are the current market trends for my tokens?',
    },
    {
      id: '3',
      title: 'Transaction Help',
      subtitle: 'Guide me through transfers',
      icon: <HelpCircle size={20} color="#1B4D3E" strokeWidth={2} />,
      prompt: 'How do I send money to someone using Sanafi?',
    },
    {
      id: '4',
      title: 'Smart Suggestions',
      subtitle: 'Optimize my wallet',
      icon: <Sparkles size={20} color="#1B4D3E" strokeWidth={2} />,
      prompt: 'What are some smart suggestions to optimize my wallet?',
    },
  ];

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      portfolio: "Based on your current holdings, you have a well-diversified portfolio with AED Sanafi (65%), USDC (15%), and other tokens (20%). Your portfolio has grown 12.5% this month. Consider rebalancing if you want to reduce exposure to any single asset.",
      market: "Current market trends show AED Sanafi is up 2.3% today, with strong support at AED 3.60. USDC remains stable, while SANA token is showing bullish momentum with 8.2% gains this week. The overall crypto market is in a consolidation phase.",
      transaction: "To send money with Sanafi: 1) Go to the Send tab, 2) Select your token, 3) Enter the amount, 4) Add recipient's wallet address or select from contacts, 5) Review details and confirm with biometric authentication. Transactions typically complete within seconds.",
      suggestions: "Here are some smart suggestions: 1) Enable auto-savings to set aside 10% of incoming transfers, 2) Consider staking your SANA tokens for 8% APY, 3) Set up price alerts for your favorite tokens, 4) Use our DCA feature for regular investments.",
      default: "I understand you're asking about financial matters. As your AI assistant, I can help with portfolio analysis, market insights, transaction guidance, and wallet optimization. Could you be more specific about what you'd like to know?",
    };

    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('holding') || lowerMessage.includes('balance')) {
      return responses.portfolio;
    } else if (lowerMessage.includes('market') || lowerMessage.includes('trend') || lowerMessage.includes('price')) {
      return responses.market;
    } else if (lowerMessage.includes('send') || lowerMessage.includes('transfer') || lowerMessage.includes('transaction')) {
      return responses.transaction;
    } else if (lowerMessage.includes('suggest') || lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
      return responses.suggestions;
    } else {
      return responses.default;
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.prompt);
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View style={styles.messageHeader}>
        <View style={[
          styles.avatar,
          message.isUser ? styles.userAvatar : styles.aiAvatar,
        ]}>
          {message.isUser ? (
            <User size={16} color="#FFFFFF" strokeWidth={2} />
          ) : (
            <Bot size={16} color="#FFFFFF" strokeWidth={2} />
          )}
        </View>
        <Text style={styles.senderName}>
          {message.isUser ? 'You' : 'Sanafi AI'}
        </Text>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString('en-AE', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.aiBubble,
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.aiText,
        ]}>
          {message.text}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.aiMessage]}>
      <View style={styles.messageHeader}>
        <View style={[styles.avatar, styles.aiAvatar]}>
          <Bot size={16} color="#FFFFFF" strokeWidth={2} />
        </View>
        <Text style={styles.senderName}>Sanafi AI</Text>
        <Text style={styles.typingText}>typing...</Text>
      </View>
      <View style={[styles.messageBubble, styles.aiBubble]}>
        <View style={styles.typingContainer}>
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={[
                styles.typingDot,
                {
                  opacity: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                  transform: [{
                    translateY: typingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -3],
                    }),
                  }],
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.aiIndicator}>
              <Bot size={24} color="#1B4D3E" strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Sanafi AI</Text>
              <Text style={styles.headerSubtitle}>Your Financial Assistant</Text>
            </View>
          </View>
          <View style={styles.statusIndicator}>
            <View style={styles.onlineStatus} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.quickActionCard}
                  onPress={() => handleQuickAction(action)}
                >
                  <View style={styles.quickActionIcon}>
                    {action.icon}
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
          {isTyping && renderTypingIndicator()}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about your finances..."
              placeholderTextColor="#999999"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
            >
              <Send size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHint}>
            AI can make mistakes. Verify important information.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  statusText: {
    fontSize: 12,
    color: '#22C55E',
    fontFamily: 'Poppins-SemiBold',
  },
  quickActionsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  quickActionsTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 20,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: '#1B4D3E',
  },
  aiAvatar: {
    backgroundColor: '#3B82F6',
  },
  senderName: {
    fontSize: 12,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  timestamp: {
    fontSize: 10,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
  },
  typingText: {
    fontSize: 10,
    color: '#3B82F6',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userBubble: {
    backgroundColor: '#1B4D3E',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#1B4D3E',
  },
  typingContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666666',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0EADA',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Regular',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1B4D3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  inputHint: {
    fontSize: 10,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});