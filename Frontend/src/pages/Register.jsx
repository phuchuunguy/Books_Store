import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setMsg('🎉 Đăng ký thành công!');
      nav('/dashboard');
    } catch {
      setMsg('❌ Có lỗi khi đăng ký');
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký</h2>
      <form onSubmit={submit}>
        <input placeholder="Tên đăng nhập" value={username} onChange={e => setU(e.target.value)} />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setP(e.target.value)} />
        <button>Đăng ký</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
