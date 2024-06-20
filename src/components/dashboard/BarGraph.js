import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { BarChart } from 'react-native-gifted-charts';
import { colors, fontSize, fonts, hp, wp } from '../../utils';

const BarGraph = () => {
  const data = [
    {
      value: 2500,
    },
    {
      value: 3500,
    },
    {
      value: 4500,
    },
    {
      value: 5200,
    },
  ];
  return (
    <View>
      <BarChart
        data={data}
        width={wp(280)}
        barWidth={wp(42)}
        initialSpacing={7}
        spacing={wp(36)}
        barBorderRadius={4}
        showGradient
        frontColor={'#248DDE'}
        gradientColor={'#52B7D8'}
        yAxisThickness={0}
        xAxisType={'solid'}
        xAxisColor={colors.mediumGrey}
        stepValue={1000}
        maxValue={6000}
        noOfSections={7}
        xAxisLabelTexts={[
          'Referral\nReceived',
          'Inspection\nScheduled',
          'Inspection\nDone',
          'Jobs\nSold',
        ]}
        xAxisTextNumberOfLines={2}
        yAxisLabelTexts={['0', '5', '10', '20', '40', '60', '80', '100']}
        yAxisLabelPrefix="$"
        yAxisLabelSuffix="K"
        // yAxisLabelWidth={52}
        yAxisExtraHeight={16}
        labelWidth={42}
        xAxisLabelTextStyle={styles.labelText}
        yAxisTextStyle={styles.labelText}
        activeOpacity={0.9}
        horizontalRulesStyle={{}}
        rulesType="solid"
        rulesColor={colors.mediumGrey}
        autoShiftLabels
        barBorderColor={colors.white}
        xAxisLength={wp(290)}
        rulesLength={wp(290)}
        // color={'red'}
        isAnimated
        // lineBehindBars
        // labelsExtraHeight={6}
        // opacity={0.5}
        parentWidth={10}
        // focusBarOnPress
        // focusedBarConfig={{}}
      />
    </View>
  );
};

export default BarGraph;

const styles = StyleSheet.create({
  labelText: {
    lineHeight: hp(16),
    fontSize: fontSize(12),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
});
