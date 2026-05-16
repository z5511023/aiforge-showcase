import { ArrowLeft, HardHat, Truck, Users, Shield, Wrench, ClipboardCheck, Search, Bell, ChevronDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useState } from 'react'

export default function AdminEngineeringDetail() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('工程总览')

  const navItems = [
    { icon: <HardHat className="w-4 h-4" />, name: '工程总览' },
    { icon: <Truck className="w-4 h-4" />, name: '设备监控' },
    { icon: <Users className="w-4 h-4" />, name: '人员管理' },
    { icon: <ClipboardCheck className="w-4 h-4" />, name: '进度跟踪' },
    { icon: <Shield className="w-4 h-4" />, name: '安全预警' },
    { icon: <Wrench className="w-4 h-4" />, name: '质量检测' },
  ]

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Top Info Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">Gemini</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">后台</span>
            <span className="text-sm text-gray-500">智慧工地后台</span>
          </div>
        </div>
      </div>

      {/* ====== 原型内容 ====== */}
      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-14 flex items-center px-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center mr-3">
              <HardHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-sm">智慧工地</span>
              <span className="text-xs text-blue-500 ml-1">Pro</span>
            </div>
          </div>
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeNav === item.name ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>杭州市 · 西湖区</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <span className="text-sm px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">施工中</span>
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: '施工进度', value: '68%', sub: '预计提前5天', color: 'text-blue-600', bg: 'bg-blue-50', icon: <ClipboardCheck className="w-5 h-5 text-blue-600" /> },
                { label: '设备在线', value: '42/45', sub: '3台离线', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Truck className="w-5 h-5 text-emerald-600" /> },
                { label: '在岗人员', value: '156人', sub: '今日出勤率98%', color: 'text-amber-600', bg: 'bg-amber-50', icon: <Users className="w-5 h-5 text-amber-600" /> },
                { label: '安全指数', value: '98分', sub: '连续30天无事故', color: 'text-purple-600', bg: 'bg-purple-50', icon: <Shield className="w-5 h-5 text-purple-600" /> },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{kpi.label}</span>
                    <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>{kpi.icon}</div>
                  </div>
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* Gantt + Alerts Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Gantt Chart */}
              <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">工程进度</h3>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />进行中</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />已完成</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300" />未开始</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: '地基工程', progress: 100, color: 'bg-emerald-500' },
                    { name: '主体结构', progress: 85, color: 'bg-blue-500' },
                    { name: '管道安装', progress: 60, color: 'bg-blue-500' },
                    { name: '电气布线', progress: 45, color: 'bg-blue-500' },
                    { name: '装修阶段', progress: 20, color: 'bg-blue-400' },
                    { name: '竣工验收', progress: 0, color: 'bg-gray-300' },
                  ].map((task) => (
                    <div key={task.name} className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 w-20 text-right">{task.name}</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${task.color} rounded-full transition-all flex items-center justify-end pr-2`} style={{ width: `${task.progress}%` }}>
                          {task.progress > 15 && <span className="text-xs text-white font-medium">{task.progress}%</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Alerts */}
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">安全预警</h3>
                <div className="space-y-3">
                  {[
                    { level: 'high', msg: '3号塔吊风速超标', time: '10分钟前' },
                    { level: 'medium', msg: 'B区配电箱未上锁', time: '30分钟前' },
                    { level: 'low', msg: '5号摄像头离线', time: '1小时前' },
                    { level: 'resolved', msg: '2号基坑积水已处理', time: '2小时前' },
                  ].map((alert, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.level === 'high' ? 'bg-red-50 border border-red-100' :
                      alert.level === 'medium' ? 'bg-amber-50 border border-amber-100' :
                      alert.level === 'low' ? 'bg-blue-50 border border-blue-100' :
                      'bg-gray-50 border border-gray-100'
                    }`}>
                      {alert.level === 'high' ? <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" /> :
                       alert.level === 'resolved' ? <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" /> :
                       <Clock className="w-4 h-4 text-amber-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{alert.msg}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">设备状态</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />在线 42</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" />离线 3</span>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-50">
                    <th className="text-left px-5 py-3 font-medium">设备名称</th>
                    <th className="text-left px-5 py-3 font-medium">编号</th>
                    <th className="text-left px-5 py-3 font-medium">操作员</th>
                    <th className="text-left px-5 py-3 font-medium">状态</th>
                    <th className="text-left px-5 py-3 font-medium">工作时长</th>
                    <th className="text-left px-5 py-3 font-medium">位置</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '塔吊', id: 'TC-001', operator: '王师傅', status: 'online', hours: '6.5h', location: 'A区主楼' },
                    { name: '挖掘机', id: 'EB-2001', operator: '李师傅', status: 'online', hours: '4.2h', location: 'B区基坑' },
                    { name: '混凝土泵车', id: 'CP-003', operator: '张师傅', status: 'online', hours: '3.8h', location: 'C区' },
                    { name: '升降机', id: 'EL-005', operator: '-', status: 'offline', hours: '-', location: 'A区' },
                    { name: '电焊机', id: 'WL-012', operator: '赵师傅', status: 'online', hours: '2.1h', location: 'D区' },
                  ].map((eq) => (
                    <tr key={eq.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 text-sm text-gray-900">{eq.name}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">{eq.id}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{eq.operator}</td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 text-xs ${eq.status === 'online' ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${eq.status === 'online' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                          {eq.status === 'online' ? '运行中' : '离线'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">{eq.hours}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">{eq.location}</td>
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
