import { Flex, Switch, Typography } from 'antd';
import { useAppContext } from '../../hooks/useAppContext';
import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const TimeDisplay = () => {
  const { timeDifference } = useAppContext();
  const [relative, setRelative] = useState(false);

  if (!timeDifference) {
    return (
      <Flex vertical align='center'>
        <Typography.Title level={2}>Time Difference</Typography.Title>
        <Typography.Paragraph>
          Select dates and click Submit
        </Typography.Paragraph>
      </Flex>
    );
  }

  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });

  const formatRtf = (value: number, unit: Intl.RelativeTimeFormatUnit) => {
    const text = rtf.format(value, unit);
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setRelative(checked);
  };

  return (
    <Flex vertical className='time-display-wrapper'>
      <Typography.Title level={2}>Time Difference</Typography.Title>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.days.toFixed(2)), 'day')
          : `Days: ${timeDifference.days.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.hours.toFixed(2)), 'hour')
          : `Hours: ${timeDifference.hours.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.minutes.toFixed(2)), 'minute')
          : `Minutes: ${timeDifference.minutes.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.seconds.toFixed(2)), 'second')
          : `Seconds: ${timeDifference.seconds.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Total Milliseconds: {timeDifference.totalMilliseconds.toFixed(2)}
      </Typography.Paragraph>

      <Flex gap={'small'}>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={handleSwitch}
        />
        <Typography.Paragraph>
          Relative: {relative ? 'Yes' : 'No'}
        </Typography.Paragraph>
      </Flex>
    </Flex>
  );
};

export default TimeDisplay;
