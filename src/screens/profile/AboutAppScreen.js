import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { commonStyles } from '../../styles/styles';
import { Header } from '../../components';
import { colors, fontSize, fonts, hp } from '../../utils';

const AboutAppScreen = () => {
  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'About Referralz'} />
      <View style={commonStyles.container}>
        <ScrollView style={styles.contentContainer} bounces={false}>
          <Text style={styles.versionText}>{'V 0.0.1'}</Text>
          <Text
            style={styles.descText}
          >{`Welcome to Referralz, the innovative app designed to revolutionize the way you manage and create leads. Our application is tailored for professionals who understand the power of networking and referrals in today's dynamic market.
At Referralz, we believe in simplifying the lead generation process. Our user-friendly interface allows you to effortlessly track, manage, and nurture your leads, ensuring that no opportunity slips through the cracks. Whether you're a seasoned marketer, a salesperson, or an entrepreneur, Referralz provides you with the tools to expand your network and grow your business.`}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: hp(16),
  },
  versionText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  descText: {
    fontSize: fontSize(14),
    lineHeight: hp(22),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
    marginTop: hp(24),
  },
});
