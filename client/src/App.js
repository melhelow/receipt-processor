import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddReceipt from './pages/AddReceipt';
import ReceiptDetail from './pages/ReceiptDetail';

export default function App() {
  const [page, setPage]               = useState('dashboard');
  const [selectedReceiptId, setSelected] = useState(null);

  function navigate(to, id = null) {
    setSelected(id);
    setPage(to);
  }

  function renderPage() {
    if (page === 'add')    return <AddReceipt onSuccess={() => navigate('dashboard')} onCancel={() => navigate('dashboard')} />;
    if (page === 'detail') return <ReceiptDetail receiptId={selectedReceiptId} onBack={() => navigate('dashboard')} />;
    return <Dashboard onAddNew={() => navigate('add')} onViewReceipt={(id) => navigate('detail', id)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Navbar page={page} navigate={navigate} />
      <main style={{ paddingTop: '80px' }}>
        {renderPage()}
      </main>
    </div>
  );
}
