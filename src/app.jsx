import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Plus, List, Wallet, Target, TrendingUp, 
  FileText, PieChart, Cpu, BookOpen, RefreshCw, Maximize, 
  Moon, Sun, AlertCircle, Eye, CheckCircle
} from 'lucide-react';

const KPI_DATA = {
  totalSaldo: "Rp 25.785.000",
  pemasukan: "Rp 0",
  pengeluaran: "Rp 940.000",
  rasioTabungan: "0.0%",
  nilaiKekayaan: "Rp 25.785.000",
  statusKeuangan: 20
};

const UPCOMING_BILLS = [
  { id: 1, name: "Netflix", amount: "Rp 57.000", due: "Due in 2d", progress: 80, color: "bg-red-500" },
  { id: 2, name: "Cicilan Nmax", amount: "Rp 1.785.000", due: "Due in 3d", progress: 60, color: "bg-blue-500" }
];

const RECENT_TRANSACTIONS = [
  { id: 1, date: "10 Jul", category: "Belanja", amount: "-Rp 450.000", color: "text-red-500" },
  { id: 2, date: "Kemarin", category: "Lainnya", amount: "-Rp 210.000", color: "text-red-500" },
  { id: 3, date: "1 Jul", category: "Makan & M...", amount: "-Rp 280.000", color: "text-red-500" }
];

const ACCOUNT_BALANCES = [
  { id: 1, name: "BCA", amount: "Rp 18.060.000", logo: "bg-blue-600" },
  { id: 2, name: "Gopay", amount: "Rp 7.725.000", logo: "bg-green-500" }
];

const EXPENSE_DETAILS = [
  { label: 'Belanja', value: 50, color: '#3b82f6' },
  { label: 'Lainnya', value: 20, color: '#ef4444' },
  { label: 'Makan & Minum', value: 30, color: '#10b981' },
];

const CustomDonutChart = ({ data, size = 120, strokeWidth = 15, innerText = "" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  let currentOffset = 0;

  return (
    <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          currentOffset += (item.value / 100) * circumference;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
      </svg>
      {innerText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-white">{innerText}</span>
        </div>
      )}
    </div>
  );
};

const CustomLineChart = ({ type = 'arusKas' }) => {
  const incomePath = type === 'arusKas' 
    ? "M 0,60 L 20,60 L 40,60 L 60,60 L 80,10 L 100,60 L 120,60 L 140,60 L 160,60 L 180,60 L 200,60 L 220,60 L 240,60 L 260,60 L 280,60"
    : "M 0,80 L 40,80 L 80,80 L 120,80 L 160,80 L 200,80 L 240,80";
    
  const expensePath = type === 'arusKas'
    ? "M 0,60 L 20,80 L 40,60 L 60,60 L 80,90 L 100,60 L 120,60 L 140,60 L 160,60 L 180,60 L 200,60 L 220,60 L 240,60 L 260,60 L 280,60"
    : "M 0,80 L 40,80 L 80,80 L 120,80 L 160,80 L 200,80 L 240,100";

  return (
    <div className="w-full h-full min-h-[150px] relative">
      <svg className="w-full h-full" viewBox="0 0 280 120" preserveAspectRatio="none">
        <line x1="0" y1="10" x2="280" y2="10" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="0" y1="60" x2="280" y2="60" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="0" y1="110" x2="280" y2="110" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
        
        <path d={incomePath} fill="none" stroke="#10b981" strokeWidth="2" className="drop-shadow-md" />
        <circle cx="80" cy="10" r="3" fill="#10b981" />
        
        <path d={expensePath} fill="none" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="80" cy="90" r="3" fill="#3b82f6" />
        
        {type !== 'arusKas' && (
           <>
            <circle cx="0" cy="80" r="4" fill="#3b82f6" />
            <circle cx="40" cy="80" r="4" fill="#3b82f6" />
            <circle cx="80" cy="80" r="4" fill="#3b82f6" />
            <circle cx="120" cy="80" r="4" fill="#3b82f6" />
            <circle cx="160" cy="80" r="4" fill="#3b82f6" />
            <circle cx="200" cy="80" r="4" fill="#3b82f6" />
            <circle cx="240" cy="100" r="4" fill="#3b82f6" />
           </>
        )}
      </svg>
    </div>
  );
};

const Card = ({ title, children, action, className = "" }) => (
  <div className={`bg-[#1c2438] rounded-xl border border-slate-700/50 p-5 flex flex-col ${className}`}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-slate-200 font-semibold text-sm">{title}</h3>
      {action && <div className="text-xs text-blue-500 cursor-pointer hover:text-blue-400">{action}</div>}
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const AuthPage = ({ type, onLogin, onNavigate }) => {
  const [email, setEmail] = useState('admin@financeflow.pro');
  const [password, setPassword] = useState('superadmin');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      if (type === 'login' && email === 'admin@financeflow.pro' && password === 'superadmin') {
         onLogin({ name: "Super Admin", email: "admin@financeflow.pro", role: "admin" });
         return;
      }

      if (email && password) {
         if(type === 'register' && !fullName) {
            setError('Nama lengkap wajib diisi');
            return;
         }
         onLogin({ name: fullName || "Boss", email });
      } else {
         setError('Email dan Password wajib diisi');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0b101a] flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md bg-[#1c2438] rounded-2xl shadow-2xl border border-slate-700/50 p-8 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="text-center mb-8 mt-2">
           <h1 className="text-2xl font-bold text-white tracking-wide flex items-center justify-center gap-2 mb-2">
            FinanceFlow
            <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">PRO</span>
          </h1>
          <p className="text-slate-400 text-sm">
            {type === 'login' ? 'Selamat datang kembali!' : 'Mulai perjalanan finansial Anda'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {type === 'login' && (
           <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-xs flex flex-col gap-1 items-center justify-center text-center">
             <span className="font-semibold flex items-center gap-1"><CheckCircle size={12}/> Mode Pengujian Aktif</span>
             <span className="text-slate-400">Gunakan kredensial bawaan di bawah untuk langsung masuk.</span>
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0b101a] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Budi Santoso"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0b101a] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="boss@email.com"
            />
          </div>
          <div>
             <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                {type === 'login' && <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-blue-500 hover:text-blue-400">Lupa password?</a>}
             </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b101a] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6 flex justify-center items-center shadow-lg shadow-blue-500/20"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : (type === 'login' ? 'Masuk ke Dashboard' : 'Daftar Sekarang')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {type === 'login' ? (
            <p>Belum punya akun? <button onClick={() => { onNavigate('register'); setEmail(''); setPassword(''); }} className="text-blue-500 hover:text-blue-400 font-medium">Daftar sekarang</button></p>
          ) : (
            <p>Sudah punya akun? <button onClick={() => { onNavigate('login'); setEmail('admin@financeflow.pro'); setPassword('superadmin'); }} className="text-blue-500 hover:text-blue-400 font-medium">Masuk di sini</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false, user: null, currentView: 'login' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setCurrentDate(`${dateString}\n${timeString}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (user) => {
     setAuthStatus({ isAuthenticated: true, user, currentView: 'dashboard' });
  };

  const navigateTo = (view) => {
     setAuthStatus(prev => ({ ...prev, currentView: view }));
  };

  const handleLogout = () => {
     setAuthStatus({ isAuthenticated: false, user: null, currentView: 'login' });
  };

  const bgTheme = isDarkMode ? "bg-[#0b101a]" : "bg-slate-50";
  const textTheme = isDarkMode ? "text-slate-300" : "text-slate-800";
  const sidebarBg = isDarkMode ? "bg-[#131927]" : "bg-white";

  if (!authStatus.isAuthenticated) {
     return <AuthPage type={authStatus.currentView} onLogin={handleLogin} onNavigate={navigateTo} />;
  }

  return (
    <div className={`min-h-screen ${bgTheme} ${textTheme} font-sans flex overflow-hidden w-full transition-colors duration-300`}>
      
      {/* Sidebar */}
      <aside className={`${sidebarBg} w-64 border-r border-slate-800/60 flex flex-col hidden md:flex transition-all duration-300 z-20`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            FinanceFlow
            <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">PRO</span>
          </h1>
        </div>
        <div className="px-6 py-2 text-[10px] text-slate-500 font-semibold tracking-wider">ULTIMATE OS V1.5</div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div>
            <p className="px-3 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Menu Utama</p>
            <nav className="space-y-1">
              <a href="#dashboard" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/50 text-white font-medium">
                <LayoutDashboard size={18} className="text-slate-400" /> Dashboard
              </a>
              <a href="#tambah" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <Plus size={18} /> Tambah Transaksi
              </a>
              <a href="#riwayat" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <List size={18} /> Riwayat Transaksi
              </a>
            </nav>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Modul</p>
            <nav className="space-y-1">
              <a href="#akun" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <Wallet size={18} /> Daftar Akun
              </a>
              <a href="#target" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <Target size={18} /> Target & Tagihan
              </a>
              <a href="#investasi" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <TrendingUp size={18} /> Portofolio Investasi
              </a>
              <a href="#laporan" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <FileText size={18} /> Laporan Keuangan
              </a>
              <a href="#budgeting" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <PieChart size={18} /> Budgeting & Prediksi
              </a>
            </nav>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Bantuan</p>
            <nav className="space-y-1">
              <a href="#ai" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <Cpu size={18} /> FlowAI Config
              </a>
              <a href="#panduan" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/30 hover:text-white transition-colors">
                <BookOpen size={18} /> Panduan
              </a>
               <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left mt-4">
                 Logout
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="h-20 px-8 flex justify-between items-center border-b border-slate-800/40 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Selamat Pagi, {authStatus.user?.name || 'Boss'}!</h2>
            <p className="text-sm text-slate-400 mt-1">Berikut ringkasan finansial kamu hari ini.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-300">{currentDate.split('\n')[0]}</p>
              <p className="text-xs text-slate-500">{currentDate.split('\n')[1] || "03:07 AM"}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-[#1c2438] hover:bg-slate-700 text-green-500 transition-colors">
                <RefreshCw size={18} />
              </button>
              <button className="p-2 rounded-lg bg-[#1c2438] hover:bg-slate-700 text-slate-400 transition-colors hidden sm:block">
                <Maximize size={18} />
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-[#1c2438] hover:bg-slate-700 text-slate-400 transition-colors"
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </header>

        {}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-[#1c2438] p-4 rounded-xl border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">TOTAL SALDO <AlertCircle size={12}/></p>
              <h3 className="text-xl font-bold text-white">{KPI_DATA.totalSaldo}</h3>
            </div>
            <div className="bg-[#1c2438] p-4 rounded-xl border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium mb-1">TOTAL PEMASUKAN <br/><span className="text-[10px]">(BULAN INI)</span></p>
              <h3 className="text-xl font-bold text-green-500">{KPI_DATA.pemasukan}</h3>
            </div>
            <div className="bg-[#1c2438] p-4 rounded-xl border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium mb-1">TOTAL PENGELUARAN <br/><span className="text-[10px]">(BULAN INI)</span></p>
              <h3 className="text-xl font-bold text-red-500">{KPI_DATA.pengeluaran}</h3>
            </div>
            <div className="bg-[#1c2438] p-4 rounded-xl border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">RASIO TABUNGAN <AlertCircle size={12}/></p>
              <h3 className="text-xl font-bold text-green-500">{KPI_DATA.rasioTabungan}</h3>
            </div>
            <div className="bg-[#1c2438] p-4 rounded-xl border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">NILAI KEKAYAAN <AlertCircle size={12}/></p>
              <h3 className="text-xl font-bold text-white">{KPI_DATA.nilaiKekayaan}</h3>
            </div>
            <div className="bg-[#1c2438] p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center relative">
               <p className="text-xs text-slate-400 font-medium absolute top-4 left-4">STATUS KEUANGAN</p>
               <div className="mt-4">
                  <CustomDonutChart 
                    data={[{value: 20, color: '#ef4444'}, {value: 80, color: '#334155'}]} 
                    size={60} 
                    strokeWidth={6}
                    innerText="20"
                  />
               </div>
               <p className="text-xs font-semibold text-red-500 mt-2">Critical</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            <Card title="Arus Kas (Bulan Ini)" className="lg:col-span-5 h-64">
              <div className="flex gap-4 mb-2 justify-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 border border-slate-700"></span> Income</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 border border-slate-700"></span> Expense</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 border border-slate-700"></span> Net</span>
              </div>
              <div className="relative h-40 mt-4 flex">
                <div className="flex flex-col justify-between text-[10px] text-slate-500 pr-2 pb-6">
                  <span>500k</span>
                  <span>0</span>
                  <span>-500000</span>
                </div>
                <div className="flex-1 relative">
                  <CustomLineChart type="arusKas" />
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
                    <span>1 Jul</span><span>6 Jul</span><span>11 Jul</span><span>16 Jul</span><span>21 Jul</span><span>26 Jul</span><span>31 Jul</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Rincian Pengeluaran" action="Lihat semua" className="lg:col-span-3 h-64">
              <div className="flex h-full items-center justify-center gap-4">
                <CustomDonutChart data={EXPENSE_DETAILS} size={110} strokeWidth={18} />
                <div className="space-y-3">
                  {EXPENSE_DETAILS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Tagihan Mendatang" action="Lihat semua" className="lg:col-span-2 h-64">
              <div className="space-y-5 mt-2">
                {UPCOMING_BILLS.map(bill => (
                  <div key={bill.id}>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="text-slate-200 font-medium">{bill.name}</span>
                      <span className="text-slate-300">{bill.amount}</span>
                    </div>
                    <div className="text-xs text-orange-400 mb-2">{bill.due}</div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                      <div className={`${bill.color} h-1.5 rounded-full`} style={{ width: `${bill.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Progres Target" action="Lihat semua" className="lg:col-span-2 h-64">
              <div className="mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-200 font-medium text-sm flex items-center gap-1">Umroh <Plus size={12} className="text-slate-500"/></span>
                  <span className="text-white font-bold">16%</span>
                </div>
                <div className="text-xs text-slate-400 mb-3">Rp 4.700.000 / Rp 30.000.000</div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full relative" style={{ width: '16%' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  </div>
                </div>
              </div>
            </Card>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-10">
            
            <Card title={<span className="flex items-center gap-2 text-yellow-500"><Cpu size={16}/> AI Insight</span>} className="lg:col-span-3">
              <div className="space-y-4 text-sm mt-2">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5 text-lg">💡</span>
                  <p className="text-slate-300">Kategori <span className="font-semibold text-white">Belanja</span> adalah pengeluaran terbesar (50.3%).</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 text-lg">📈</span>
                  <p className="text-slate-300">Fokus tabungan bulan ini: <br/><span className="font-semibold text-white">Umroh. You can do it!</span></p>
                </div>
              </div>
            </Card>

            <Card title="Tren Bulanan" className="lg:col-span-5 relative">
               <div className="flex gap-4 mb-2 justify-center text-xs text-slate-400 absolute top-5 right-5">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Income</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Expense</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Net</span>
              </div>
              <div className="relative h-36 mt-8 flex">
                 <div className="flex flex-col justify-between text-[10px] text-slate-500 pr-2 pb-6">
                  <span>1 Jt</span>
                  <span>500k</span>
                  <span>0</span>
                  <span>-500000</span>
                  <span>-1000000</span>
                </div>
                <div className="flex-1 relative">
                  <CustomLineChart type="tren" />
                  <div className="absolute top-0 right-4 h-[100px] w-4 bg-red-500 opacity-80 rounded-sm"></div>
                  <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
                    <span>Feb '26</span><span>Mar '26</span><span>Apr '26</span><span>Mei '26</span><span>Jun '26</span><span>Jul '26</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Transaksi Terakhir" action="Lihat semua" className="lg:col-span-2">
              <div className="space-y-4 mt-2">
                {RECENT_TRANSACTIONS.map(tx => (
                  <div key={tx.id} className="flex justify-between items-center text-sm border-b border-slate-700/30 pb-2 last:border-0">
                    <div>
                      <div className="text-slate-400 text-xs mb-0.5">{tx.date}</div>
                      <div className="text-slate-200 font-medium">{tx.category}</div>
                    </div>
                    <div className={`${tx.color} font-semibold`}>{tx.amount}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Saldo Akun" action={<Eye size={16} className="text-slate-400 hover:text-white" />} className="lg:col-span-2">
              <div className="space-y-4 mt-2">
                {ACCOUNT_BALANCES.map(acc => (
                  <div key={acc.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${acc.logo} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                        {acc.name[0]}
                      </div>
                      <span className="text-slate-200 font-medium text-sm">{acc.name}</span>
                    </div>
                    <span className="text-white font-semibold text-sm">{acc.amount}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </main>

    </div>
  );
};

export default App;
