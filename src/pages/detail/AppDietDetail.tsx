import { ArrowLeft, Home, Utensils, BarChart3, User, Bell, Droplets, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function AppDietDetail() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center">
      {/* Top Info Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#0f172a] border-b border-emerald-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-emerald-200/60 hover:text-emerald-200">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">ChatGPT</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-900/30 text-emerald-400">APP</span>
            <span className="text-sm text-emerald-200/60">饮食健康APP</span>
          </div>
        </div>
      </div>

      {/* Mobile Frame */}
      <div className="w-full max-w-[430px] bg-[#0f172a] min-h-screen shadow-2xl mt-14 relative">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-400/60">下午好，</p>
            <p className="text-lg font-bold text-white">健康达人</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-emerald-900/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-400" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
          </div>
        </div>

        {/* Calorie Ring */}
        <div className="px-5 py-6">
          <div className="flex flex-col items-center">
            <div className="relative w-52 h-52">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="75" fill="none" stroke="#1e293b" strokeWidth="14" />
                <circle cx="90" cy="90" r="75" fill="none" stroke="#10b981" strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={`${(1245 / 2000) * 471} 471`}
                  className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">1,245</span>
                <span className="text-sm text-emerald-400/60">/ 2,000 kcal</span>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">85g</p>
                <p className="text-xs text-gray-500">蛋白质</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">142g</p>
                <p className="text-xs text-gray-500">碳水</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">48g</p>
                <p className="text-xs text-gray-500">脂肪</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="px-5 py-4">
          <h3 className="text-base font-semibold text-white mb-3">今日饮食</h3>
          <div className="space-y-3">
            {[
              { name: '早餐', food: '燕麦粥 + 水煮蛋 + 蓝莓', cal: '320 kcal', time: '08:30', img: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200' },
              { name: '午餐', food: '鸡胸肉沙拉 + 糙米饭', cal: '480 kcal', time: '12:00', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' },
              { name: '晚餐', food: '三文鱼 + 西兰花 + 红薯', cal: '445 kcal', time: '18:30', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200' },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-4 p-3 rounded-xl bg-emerald-900/10 border border-emerald-800/20">
                <img src={m.img} alt={m.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{m.name}</p>
                    <span className="text-xs text-gray-500">{m.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{m.food}</p>
                  <p className="text-xs text-emerald-400 mt-1 font-medium">{m.cal}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Water Tracker */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-semibold text-white">饮水追踪</h3>
            <span className="ml-auto text-sm text-cyan-400 font-medium">5 / 8 杯</span>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <button key={i} className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-colors ${
                i <= 5 ? 'bg-cyan-500/20 border border-cyan-500/40' : 'bg-gray-800/50 border border-gray-700/30'
              }`}>
                <Droplets className={`w-5 h-5 ${i <= 5 ? 'text-cyan-400' : 'text-gray-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Nutrition Chart */}
        <div className="px-5 py-4 pb-24">
          <h3 className="text-base font-semibold text-white mb-3">营养趋势</h3>
          <div className="h-40 flex items-end gap-2">
            {[
              { day: '一', cal: 1800 },
              { day: '二', cal: 2100 },
              { day: '三', cal: 1650 },
              { day: '四', cal: 2300 },
              { day: '五', cal: 1900 },
              { day: '六', cal: 2000 },
              { day: '日', cal: 1245 },
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gray-800/50 rounded-lg relative overflow-hidden" style={{ height: '100px' }}>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-lg" style={{ height: `${(d.cal / 2500) * 100}%` }} />
                </div>
                <span className="text-[10px] text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0f172a] border-t border-gray-800 flex items-center justify-around">
          {[
            { icon: <Home className="w-5 h-5" />, name: '首页', active: true },
            { icon: <Utensils className="w-5 h-5" />, name: '记录', active: false },
            { icon: <BarChart3 className="w-5 h-5" />, name: '分析', active: false },
            { icon: <User className="w-5 h-5" />, name: '我的', active: false },
          ].map((t) => (
            <button key={t.name} className={`flex flex-col items-center gap-0.5 ${t.active ? 'text-emerald-400' : 'text-gray-600'}`}>
              {t.icon}
              <span className="text-[10px]">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
