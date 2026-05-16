import { ArrowLeft, LayoutDashboard, ShoppingCart, Package, Users, Megaphone, FileText, Search, Bell, Settings, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useState } from 'react'

export default function AdminEcommerceDetail() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('运营总览')

  const navItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, name: '运营总览' },
    { icon: <Package className="w-4 h-4" />, name: '商品管理' },
    { icon: <ShoppingCart className="w-4 h-4" />, name: '订单中心' },
    { icon: <Users className="w-4 h-4" />, name: '客户分析' },
    { icon: <Megaphone className="w-4 h-4" />, name: '营销活动' },
    { icon: <FileText className="w-4 h-4" />, name: '财务报表' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Info Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">KIMI</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">后台</span>
            <span className="text-sm text-gray-500">电商运营后台</span>
          </div>
        </div>
      </div>

      {/* ====== 原型内容 ====== */}
      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="w-56 bg-slate-900 text-gray-300 flex flex-col">
          <div className="h-14 flex items-center px-4 border-b border-slate-800">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center mr-3">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">商城运营</span>
          </div>
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeNav === item.name ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
              <div>
                <p className="text-sm text-white font-medium">管理员</p>
                <p className="text-xs text-gray-500">admin@shop.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>首页</span>
              <span>/</span>
              <span className="text-gray-900">{activeNav}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-500">
                <Search className="w-4 h-4" />
                <span>搜索...</span>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center relative">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: '今日订单金额', value: '¥128,456', change: '+12.5%', up: true, icon: <ShoppingCart className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
                { label: '今日访客', value: '42,680', change: '+8.3%', up: true, icon: <Users className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
                { label: '转化率', value: '3.2%', change: '-0.4%', up: false, icon: <TrendingUp className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50' },
                { label: '客单价', value: '¥186', change: '+5.2%', up: true, icon: <FileText className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{kpi.label}</span>
                    <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>{kpi.icon}</div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.up ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                    <span className={`text-xs ${kpi.up ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.change}</span>
                    <span className="text-xs text-gray-400">较昨日</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart + Products Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Sales Chart */}
              <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">销售趋势</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600">本周</button>
                    <button className="px-3 py-1 text-xs rounded-md text-gray-500 hover:bg-gray-100">本月</button>
                  </div>
                </div>
                <div className="h-48 flex items-end gap-2">
                  {[
                    { day: '周一', val: 35 },
                    { day: '周二', val: 55 },
                    { day: '周三', val: 42 },
                    { day: '周四', val: 68 },
                    { day: '周五', val: 85 },
                    { day: '周六', val: 72 },
                    { day: '周日', val: 58 },
                  ].map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gray-50 rounded-md relative overflow-hidden" style={{ height: '120px' }}>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-md" style={{ height: `${d.val}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot Products */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">热销商品</h3>
                <div className="space-y-3">
                  {[
                    { name: '无线蓝牙耳机', sales: '2,345件', price: '¥299' },
                    { name: '智能手表 Pro', sales: '1,876件', price: '¥1,299' },
                    { name: '便携充电宝', sales: '1,654件', price: '¥89' },
                    { name: '机械键盘 RGB', sales: '1,234件', price: '¥459' },
                    { name: '降噪耳机 Max', sales: '987件', price: '¥1,899' },
                  ].map((p, i) => (
                    <div key={p.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.sales}</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">最新订单</h3>
                <button className="text-sm text-blue-600">查看全部</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-50">
                    <th className="text-left px-5 py-3 font-medium">订单号</th>
                    <th className="text-left px-5 py-3 font-medium">商品</th>
                    <th className="text-left px-5 py-3 font-medium">客户</th>
                    <th className="text-left px-5 py-3 font-medium">金额</th>
                    <th className="text-left px-5 py-3 font-medium">状态</th>
                    <th className="text-left px-5 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'ORD-2025-001', product: '无线蓝牙耳机', customer: '张三', amount: '¥299', status: 'completed' },
                    { id: 'ORD-2025-002', product: '智能手表 Pro', customer: '李四', amount: '¥1,299', status: 'pending' },
                    { id: 'ORD-2025-003', product: '便携充电宝', customer: '王五', amount: '¥89', status: 'processing' },
                    { id: 'ORD-2025-004', product: '机械键盘 RGB', customer: '赵六', amount: '¥459', status: 'completed' },
                    { id: 'ORD-2025-005', product: '降噪耳机 Max', customer: '孙七', amount: '¥1,899', status: 'pending' },
                  ].map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 text-sm text-gray-600">{order.id}</td>
                      <td className="px-5 py-3 text-sm text-gray-900">{order.product}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{order.customer}</td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-900">{order.amount}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                          order.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {order.status === 'completed' ? '已完成' : order.status === 'pending' ? '待发货' : '处理中'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
