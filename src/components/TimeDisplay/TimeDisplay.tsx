import { Flex, Form, Switch, Typography } from 'antd';
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
          Выберите даты и нажмите на кнопку{' '}
          <Typography.Text strong>Рассчитать</Typography.Text>
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
          : `Дни: ${timeDifference.days.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.hours.toFixed(2)), 'hour')
          : `Часы: ${timeDifference.hours.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.minutes.toFixed(2)), 'minute')
          : `Минуты: ${timeDifference.minutes.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative
          ? formatRtf(Number(timeDifference.seconds.toFixed(2)), 'second')
          : `Секунды: ${timeDifference.seconds.toFixed(2)}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Total Milliseconds: {timeDifference.totalMilliseconds.toFixed(2)}
      </Typography.Paragraph>
      <Form.Item name='relative' label='Относительная'>
        <Switch
          id='relative'
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={handleSwitch}
        />
      </Form.Item>
    </Flex>
  );
};

export default TimeDisplay;
