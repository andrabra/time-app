import 'antd/dist/reset.css';
import './App.css';
import TimeDisplay from './components/TimeDisplay/TimeDisplay';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import { Flex, Layout } from 'antd';
import dayjs from 'dayjs';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px - 64px)',
  alignItems: 'center',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: '100vh',
};

function App() {
  return (
    <Layout style={layoutStyle} className='app-layout'>
      <Header style={headerStyle}>
        <h1>Time Diff</h1>
      </Header>
      <Content style={contentStyle} className='app-content'>
        <Flex gap={'middle'} className='app-main'>
          <TimeDisplay />
          <DateRangePicker />
        </Flex>
      </Content>
      <Footer style={footerStyle}>{dayjs().format('YYYY-MM-DD')}</Footer>
    </Layout>
  );
}

export default App;
