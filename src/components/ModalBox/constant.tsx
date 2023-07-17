export const changeFontSize = (
  basicWidth: number,
  width: number,
  chartType: string,
) => {
  let scale = Number((width / basicWidth).toFixed(1));
  let textFont = Math.floor(18 * scale);
  let subtextFont = Math.floor(12 * scale);
  let axisFont = Math.floor(10 * scale);
  let emphasisFont = Math.floor(20 * scale);
  console.log(
    chartType,
    width,
    basicWidth,
    textFont,
    subtextFont,
    axisFont,
    emphasisFont,
    'change',
  );
  switch (chartType) {
    case 'bar':
      return {
        title: {
          textStyle: {
            fontSize: textFont,
          },
          subtextStyle: {
            fontSize: subtextFont,
          },
        },
        xAxis: {
          axisLabel: { fontSize: axisFont },
        },
        yAxis: {
          axisLabel: { fontSize: axisFont },
        },
      };
    case 'pie':
      return {
        title: {
          textStyle: {
            fontSize: textFont,
          },
          subtextStyle: {
            fontSize: subtextFont,
          },
        },
        legend: {
          textStyle: {
            fontSize: subtextFont,
          },
        },
        label: {
          fontSize: subtextFont,
        },
        series: [
          {
            emphasis: {
              label: {
                show: true,
                fontSize: emphasisFont,
              },
            },
          },
        ],
      };
    case 'map':
      return {
        title: {
          textStyle: {
            fontSize: textFont,
          },
          subtextStyle: {
            fontSize: subtextFont,
          },
        },
        visualMap: {
          textStyle: {
            fontSize: subtextFont,
          },
        },
      };
    default:
      return {
        title: {
          textStyle: {
            fontSize: textFont,
          },
          subtextStyle: {
            fontSize: subtextFont,
          },
        },
      };
  }
};
