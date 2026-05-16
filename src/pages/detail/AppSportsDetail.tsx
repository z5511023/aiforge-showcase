import { ArrowLeft, Home, Dumbbell, Users, User, Bell, Flame, Route, TrendingUp, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function AppSportsDetail() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Top Info Bar - Desktop */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">KIMI</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">APP</span>
            <span className="text-sm text-gray-500">运动健身APP</span>
          </div>
        </div>
      </div>

      {/* Mobile Frame */}
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-2xl mt-14 relative">
        {/* Status Bar */}
        <div className="h-12 bg-white flex items-center justify-between px-6">
          <span className="text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 border-gray-900" />
            <div className="w-4 h-4 rounded-full border-2 border-gray-900" />
          </div>
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">早上好，</p>
            <p className="text-lg font-bold text-gray-900">运动家</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
          </div>
        </div>

        {/* Steps Ring */}
        <div className="px-5 py-4">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(8532 / 10000) * 440} 440`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">8,532</span>
                <span className="text-sm text-gray-400">/ 10,000 步</span>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2 font-medium">目标完成 85%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Route className="w-6 h-6" />, name: '跑步', color: 'bg-blue-50 text-blue-600' },
              { icon: <Flame className="w-6 h-6" />, name: '骑行', color: 'bg-orange-50 text-orange-500' },
              { icon: <Dumbbell className="w-6 h-6" />, name: '游泳', color: 'bg-cyan-50 text-cyan-500' },
              { icon: <TrendingUp className="w-6 h-6" />, name: '瑜伽', color: 'bg-purple-50 text-purple-500' },
            ].map((a) => (
              <button key={a.name} className="flex flex-col items-center gap-2 py-3 rounded-xl hover:bg-gray-50">
                <div className={`w-14 h-14 rounded-2xl ${a.color} flex items-center justify-center`}>{a.icon}</div>
                <span className="text-xs text-gray-600 font-medium">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="px-5 py-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">本周运动</h3>
          <div className="flex items-end gap-2 h-32">
            {[
              { day: '一', val: 60 },
              { day: '二', val: 80 },
              { day: '三', val: 45 },
              { day: '四', val: 90 },
              { day: '五', val: 70 },
              { day: '六', val: 100 },
              { day: '日', val: 85 },
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gray-100 rounded-lg relative overflow-hidden" style={{ height: '80px' }}>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all" style={{ height: `${d.val}%` }} />
                </div>
                <span className="text-xs text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="px-5 py-4 pb-24">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">最近运动</h3>
            <button className="text-sm text-blue-600">查看全部</button>
          </div>
          <div className="space-y-3">
            {[
              { name: '晨间跑步', time: '45 分钟', cal: '320 kcal', icon: <Route className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
              { name: '力量训练', time: '60 分钟', cal: '450 kcal', icon: <Dumbbell className="w-5 h-5" />, color: 'bg-orange-50 text-orange-500' },
              { name: '游泳', time: '30 分钟', cal: '280 kcal', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-cyan-50 text-cyan-500' },
            ].map((w) => (
              <div key={w.name} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                <div className={`w-12 h-12 rounded-xl ${w.color} flex items-center justify-center`}>{w.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{w.name}</p>
                  <p className="text-xs text-gray-400">{w.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{w.cal}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around">
          {[
            { icon: <Home className="w-5 h-5" />, name: '首页', active: true },
            { icon: <Dumbbell className="w-5 h-5" />, name: '运动', active: false },
            { icon: <Users className="w-5 h-5" />, name: '社区', active: false },
            { icon: <User className="w-5 h-5" />, name: '我的', active: false },
          ].map((t) => (
            <button key={t.name} className={`flex flex-col items-center gap-0.5 ${t.active ? 'text-blue-600' : 'text-gray-400'}`}>
              {t.icon}
              <span className="text-[10px]">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
