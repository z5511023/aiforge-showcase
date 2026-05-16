import { ArrowLeft, Car, Shield, Zap, Globe, ChevronRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function WebsiteCarDetail() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Top Info Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">KIMI</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">官网</span>
            <span className="text-sm text-gray-500">驰骋汽车官网</span>
          </div>
        </div>
      </div>

      {/* ====== 原型内容开始 ====== */}
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">驰骋汽车</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">首页</a>
            <a href="#" className="hover:text-blue-600">车型</a>
            <a href="#" className="hover:text-blue-600">配置</a>
            <a href="#" className="hover:text-blue-600">服务</a>
            <a href="#" className="hover:text-blue-600">关于我们</a>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">预约试驾</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              驭见未来，<br />驰骋天地
            </h1>
            <p className="text-lg text-blue-100 max-w-md">
              驰骋汽车，融合前沿科技与极致工艺，为您带来前所未有的驾驭体验。每一次出发，都是对未来的探索。
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50">探索车型</button>
              <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10">了解更多</button>
            </div>
          </div>
          <div className="flex-1">
            <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800" alt="Sports Car" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '128+', label: '门店' },
              { num: '50万+', label: '车主' },
              { num: '15', label: '年品牌历史' },
              { num: '4.9', label: '用户评分' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600">{s.num}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">核心优势</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-8 h-8 text-blue-600" />, title: '智能驾驶', desc: 'L3级自动驾驶辅助系统，让驾驶更安全、更轻松。' },
              { icon: <Shield className="w-8 h-8 text-blue-600" />, title: '安全防护', desc: '全方位安全气囊与车身结构，守护每一次出行。' },
              { icon: <Globe className="w-8 h-8 text-blue-600" />, title: '绿色出行', desc: '纯电驱动，零排放，为地球减负。' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Models */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">热门车型</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '驰骋 S9', price: '¥29.98万起', tag: '纯电轿车', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500' },
              { name: '驰骋 X7', price: '¥39.98万起', tag: '豪华SUV', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500' },
              { name: '驰骋 GT', price: '¥59.98万起', tag: '性能跑车', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500' },
            ].map((car) => (
              <div key={car.name} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{car.tag}</span>
                  </div>
                  <p className="text-blue-600 font-semibold">{car.price}</p>
                  <button className="mt-3 w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1">
                    了解详情 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">车主评价</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '张先生', role: 'S9 车主', comment: '续航里程真的很惊喜，日常通勤一周充一次就够了。' },
              { name: '李女士', role: 'X7 车主', comment: '空间大，智能驾驶辅助非常好用，全家出行很放心。' },
              { name: '王先生', role: 'GT 车主', comment: '加速性能太棒了，操控感一流，真正的高性能电动跑车。' },
            ].map((t) => (
              <div key={t.name} className="p-6 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 mb-4">{t.comment}</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">驰骋汽车</span>
          </div>
          <p className="text-sm text-gray-400 mb-6">让每一次出行都成为享受</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">联系我们</a>
            <a href="#" className="hover:text-white">门店查询</a>
            <a href="#" className="hover:text-white">售后服务</a>
            <a href="#" className="hover:text-white">隐私政策</a>
          </div>
          <p className="text-xs text-gray-600 mt-8"> 2025 驰骋汽车 版权所有</p>
        </div>
      </footer>
    </div>
  )
}
