import { Flex, Form, Switch, Typography } from 'antd';
import { useAppContext } from '../../shared/hooks/useAppContext';
import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { formatTimeDifference } from '../../shared/lib/time';

const TimeDisplay = () => {
  const { timeDifference } = useAppContext();
  const [relative, setRelative] = useState(false);

  const formattedTimeDifference = formatTimeDifference(timeDifference);

  if (!timeDifference || !formattedTimeDifference) {
    return (
      <Flex vertical align='center'>
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
        {relative ? (
          formatRtf(Number(formattedTimeDifference?.days), 'day')
        ) : (
          <>
            Дни:{' '}
            <Typography.Text strong>
              {formattedTimeDifference?.days}
            </Typography.Text>
          </>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative ? (
          formatRtf(Number(formattedTimeDifference?.hours), 'hour')
        ) : (
          <>
            Часы:{' '}
            <Typography.Text strong>
              {formattedTimeDifference?.hours}
            </Typography.Text>
          </>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative ? (
          formatRtf(Number(formattedTimeDifference?.minutes), 'minute')
        ) : (
          <>
            Минуты:{' '}
            <Typography.Text strong>
              {formattedTimeDifference?.minutes}
            </Typography.Text>
          </>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {relative ? (
          formatRtf(Number(formattedTimeDifference?.seconds), 'second')
        ) : (
          <>
            Секунды:{' '}
            <Typography.Text strong>
              {formattedTimeDifference?.seconds}
            </Typography.Text>
          </>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text code>
          Total Milliseconds: {formattedTimeDifference?.totalMilliseconds}
        </Typography.Text>
      </Typography.Paragraph>
      <Form layout={'inline'}>
        <Form.Item className='form-item' name='relative' label='Относительная'>
          <Switch
            id='relative'
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleSwitch}
          />
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default TimeDisplay;
