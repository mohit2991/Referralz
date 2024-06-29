import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Header, ItemCard } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { useUser } from '../../contexts/userContext';

const ContactUsScreen = () => {
  const { userData } = useUser();
  const DetailItemView = ({ title, detail, detailTextColor }) => {
    return (
      <View>
        {title && <Text style={styles.itemTitleText}>{title}</Text>}
        <Text style={[styles.itemDetailText, { color: detailTextColor }]}>
          {detail}
        </Text>
      </View>
    );
  };

  const renderContactDetails = ({ item }) => {
    return (
      <ItemCard
        shadowStyle={{ shadowOpacity: 0 }}
        cardContainerStyle={styles.listCardView}
      >
        <Text style={styles.cardTitleTextStyle}>{item?.type == 'ADMIN' ? 'Project Manager' : 'Business Developer'}</Text>
        <View style={styles.height24} />
        <DetailItemView title={'Full name'} detail={`${item?.first_name} ${item?.last_name}`} />
        <View style={styles.height16} />
        <DetailItemView
          title={'Phone number'}
          detail={`+91 ${item?.contact_no}`}
          detailTextColor={colors.blue}
        />
      </ItemCard>
    );
  };

  return (
    <View style={commonStyles.flex}>
      <Header leftIcon={icons.closeLine} isBackButton title={'Contact us'} />
      <ScrollView
        style={styles.scollViewStyle}
        showsVerticalScrollIndicator={false}
      >

        <FlatList
          data={userData?.contact_us}
          renderItem={renderContactDetails}
        // ItemSeparatorComponent={() => (
        //   <View
        //     style={{ height: hp(1), backgroundColor: colors.xLiteGrey }}
        //   />
        // )}
        />
        {/* <ItemCard
          shadowStyle={{ shadowOpacity: 0 }}
          cardContainerStyle={styles.listCardView}
        >
          <Text style={styles.cardTitleTextStyle}>{'Business developer'}</Text>
          <View style={styles.height24} />
          <DetailItemView title={'Full name'} detail={'William Greene'} />
          <View style={styles.height16} />
          <DetailItemView
            title={'Phone number'}
            detail={'(414) 758-0031'}
            detailTextColor={colors.blue}
          />
        </ItemCard> */}
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  scollViewStyle: {
    flex: 1,
    backgroundColor: colors.xLiteGrey,
    paddingHorizontal: wp(16),
    paddingTop: wp(16),
  },
  itemTitleText: {
    fontSize: fontSize(14),
    lineHeight: hp(22),
    fontFamily: fonts.bold,
    color: colors.grey,
  },
  itemDetailText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
    textTransform: 'capitalize',
  },
  cardTitleTextStyle: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  listCardView: {
    borderRadius: wp(8),
    marginBottom: hp(12),
  },
  height16: {
    height: hp(16),
  },
  height24: {
    height: hp(24),
  },
});
