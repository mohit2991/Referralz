import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BarChart } from 'react-native-gifted-charts';
import { colors, fontSize, fonts, hp, wp } from '../../utils';
import { screenWidth } from 'react-native-gifted-charts/src/utils';

const BarGraph = ({ graphData }) => {
  const xAxisLength = screenWidth - screenWidth * 0.26;

  const data = graphData?.map((item) => ({ value: item?.leadsStatusCount }));
  const xAxisLabelTexts = graphData?.map((item) => {
    return item?.leadsStatus
      .toLowerCase()
      .replace('_', ' ')
      .split(' ')
      .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
      .join(' ');
  });

  const maxValue = Math.max(...data?.map((item) => item?.value));
  const noOfSections = 6;
  const stepValue = Math.ceil(maxValue / noOfSections);
  const yAxisLabelTexts = Array.from(
    { length: noOfSections + 1 },
    (_, i) => i * stepValue,
  );

  return (
    <View>
      <BarChart
        data={data}
        width={wp(280)}
        barWidth={wp(42)}
        initialSpacing={15}
        spacing={wp(36)}
        barBorderRadius={4}
        showGradient
        frontColor={'#248DDE'}
        gradientColor={'#52B7D8'}
        yAxisThickness={0}
        xAxisType={'solid'}
        xAxisColor={colors.mediumGrey}
        stepValue={stepValue}
        yAxisLabelPrefix={'$'}
        maxValue={stepValue * noOfSections}
        noOfSections={noOfSections}
        xAxisLabelTexts={xAxisLabelTexts}
        xAxisTextNumberOfLines={2}
        yAxisLabelTexts={yAxisLabelTexts}
        yAxisExtraHeight={16}
        labelWidth={42}
        xAxisLabelTextStyle={styles.labelText}
        yAxisTextStyle={styles.labelText}
        activeOpacity={0.9}
        horizontalRulesStyle={{}}
        rulesType="solid"
        rulesColor={colors.mediumGrey}
        // autoShiftLabels
        barBorderColor={colors.white}
        xAxisLength={xAxisLength}
        rulesLength={xAxisLength}
        isAnimated
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
