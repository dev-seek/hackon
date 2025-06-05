import UserProfileTest from '../components/UserProfileTest';
import UserOrdersTest from '../components/UserOrdersTest';
import '../globals.css';

export default function ApiTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#18181b', padding: '2rem 0' }}>
      <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: 40, fontSize: '2.2rem', fontWeight: 800 }}>
        API Tester: User Profile & Orders
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center' }}>
        <UserProfileTest />
        <UserOrdersTest />
      </div>
    </div>
  );
}
