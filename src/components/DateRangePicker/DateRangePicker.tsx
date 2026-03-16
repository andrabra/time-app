import {
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  type CheckboxProps,
} from 'antd';
import dayjs from 'dayjs';
import { calculateTimeDifference } from '../../shared/hooks/useTimeDifference';
import type { valuesType } from '../../types/types';
import { useAppContext } from '../../shared/hooks/useAppContext';
import { useEffect, useRef, useState } from 'react';

const DateRangePicker = () => {
  const { setTimeDifference, setFinished, finished } = useAppContext();
  const [useCurrentDate, setUseCurrentDate] = useState(false);

  const [form] = Form.useForm();

  const startDate = Form.useWatch('startDate', form);
  const endDate = Form.useWatch('endDate', form);

  const intervalIdRef = useRef<number | null>(null);
  const intervalIdNowRef = useRef<number | null>(null);

  const updateTimeDifference = (
    startDate: Date | dayjs.Dayjs,
    endDate: Date | dayjs.Dayjs,
  ) => {
    const { days, hours, minutes, seconds, totalMilliseconds } =
      calculateTimeDifference(startDate, endDate);

    setTimeDifference({ days, hours, minutes, seconds, totalMilliseconds });
  };

  const onFinish = (values: valuesType) => {
    const startDate = values.startDate || dayjs();
    const endDate = values.endDate || dayjs();

    updateTimeDifference(startDate, endDate);
    setFinished(true);

    if (useCurrentDate) {
      updateTimeDifference(dayjs(), endDate);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: CheckboxProps['onChange'] = (e) => {
    // console.log(`checked = ${e.target.checked}`);
    const checked = e.target.checked;
    setUseCurrentDate(checked);
  };

  useEffect(() => {
    form.setFieldValue('startDate', dayjs());
  }, []);

  useEffect(() => {
    if (useCurrentDate) {
      form.setFieldValue('startDate', dayjs());

      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }

      if (intervalIdNowRef.current !== null) {
        clearInterval(intervalIdNowRef.current);
      }

      intervalIdRef.current = window.setInterval(() => {
        form.setFieldValue('startDate', dayjs());
        const startDate = form.getFieldValue('startDate');

        if (finished && startDate && endDate) {
          updateTimeDifference(startDate, endDate);
        }
      }, 1000);
    } else if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [useCurrentDate, form, finished]);

  return (
    <Form
      form={form}
      name='date-range-picker'
      labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
      style={{ maxWidth: 600, width: '100%', marginTop: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Flex vertical>
        <Form.Item
          label='Стартовая дата'
          name='startDate'
          rules={[{ required: true, message: 'Пожалуйста, введите дату!123' }]}
        >
          <DatePicker
            disabled={useCurrentDate}
            showTime
            style={{ width: '100%', maxWidth: 180 }}
          />
        </Form.Item>
        <Form.Item
          name='useCurrentDate'
          valuePropName='checked'
          wrapperCol={{ xs: { span: 24 }, sm: { offset: 8, span: 16 } }}
        >
          <Checkbox onChange={onChange} checked={useCurrentDate}>
            От текущей даты
          </Checkbox>
        </Form.Item>
        <Form.Item
          label='Конечная дата'
          name='endDate'
          rules={[{ required: true, message: 'Пожалуйста, введите дату!' }]}
        >
          <DatePicker showTime style={{ width: '100%', maxWidth: 180 }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ xs: { span: 24 }, sm: { offset: 8, span: 16 } }}
        >
          <Button
            type='primary'
            htmlType='submit'
            disabled={!startDate || !endDate}
          >
            Рассчитать
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default DateRangePicker;
