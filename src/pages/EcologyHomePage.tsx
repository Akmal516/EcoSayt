import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, ArrowDown, Recycle, TreePine, Factory, Users, Camera, Target, Sparkles, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface EcologyHomePageProps {
  onStartAction: () => void;
  onGoToShop: () => void;
  onGoToPartners: () => void;
}

export default function EcologyHomePage({ onStartAction, onGoToShop, onGoToPartners }: EcologyHomePageProps) {
  const [countPlastic, setCountPlastic] = useState(0);
  const [countWaste, setCountWaste] = useState(0);
  const [countRecycled, setCountRecycled] = useState(0);
  
  // Parallax scroll effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  // Smooth spring animations for parallax
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 80, damping: 25 });
  const smoothParticlesY = useSpring(particlesY, { stiffness: 120, damping: 35 });

  // Animated counters
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countPlastic < 73) setCountPlastic(prev => prev + 1);
      if (countWaste < 450) setCountWaste(prev => prev + 10);
      if (countRecycled < 10) setCountRecycled(prev => prev + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [countPlastic, countWaste, countRecycled]);

  return (
    <div ref={containerRef} className="min-h-screen text-white relative overflow-x-hidden">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            EkoSayt
          </motion.div>
          
          <nav className="flex items-center space-x-6">
            <motion.button
              className="text-white hover:text-green-400 transition-colors font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Bosh sahifa
            </motion.button>
            
            <motion.button
              onClick={onGoToPartners}
              className="text-white hover:text-blue-400 transition-colors font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hamkorlar
            </motion.button>
            
            <motion.button
              onClick={onGoToShop}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Magazin
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Parallax Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-110"
          style={{
            backgroundImage: `url('https://public.youware.com/users-website-assets/prod/ef7cf6b7-904e-49dd-abd1-7ec03fc635a1/c86c03b6cd5a46e7900f33848fd577b6.jpg')`,
            y: smoothBackgroundY
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-black opacity-50"
          style={{ y: smoothBackgroundY }}
        />
        
        {/* Enhanced Floating particles with parallax */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: smoothParticlesY }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-40 ${
                i % 3 === 0 ? 'w-3 h-3 bg-green-400' : 
                i % 3 === 1 ? 'w-2 h-2 bg-blue-400' : 
                'w-4 h-4 bg-cyan-300'
              }`}
              animate={{
                x: [0, 120 + (i * 20), -80],
                y: [0, -120 - (i * 15), 100],
                scale: [1, 1.8, 0.5, 1.2],
                rotate: [0, 360, -180, 0],
                opacity: [0.2, 0.6, 0.3, 0.5]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                left: `${5 + (i * 3.2) % 90}%`,
                top: `${10 + (i * 2.8) % 80}%`,
              }}
            />
          ))}
          
          {/* Additional depth particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`depth-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              animate={{
                x: [0, -50, 80, 0],
                y: [0, 60, -40, 0],
                scale: [0.5, 1.5, 0.8, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                delay: i * 0.8,
              }}
              style={{
                left: `${15 + (i * 5.5) % 70}%`,
                top: `${25 + (i * 4.2) % 50}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          style={{ 
            y: smoothHeroY,
            opacity: heroOpacity 
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ 
              textShadow: [
                "0 0 0px rgba(34, 197, 94, 0)",
                "0 0 20px rgba(34, 197, 94, 0.3)",
                "0 0 0px rgba(34, 197, 94, 0)"
              ]
            }}
          >
            Biz qayerda yashayapmiz?
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            O'zbekiston va dunyo bo'ylab chiqindi muammosini ko'ring
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold flex items-center gap-3 mx-auto transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6" />
            Videoni ko'ring
          </motion.button>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 text-green-400 drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </section>

      {/* Video Section with Parallax */}
      <motion.section 
        className="py-24 px-6 bg-gradient-to-b from-gray-900 to-green-900 relative overflow-hidden"
        style={{
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Parallax background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            y: useTransform(scrollYProgress, [0.1, 0.4], ["50%", "-50%"])
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 2 === 0 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{
                width: `${40 + i * 15}px`,
                height: `${40 + i * 15}px`,
                left: `${10 + (i * 12) % 80}%`,
                top: `${20 + (i * 8) % 60}%`,
              }}
              animate={{
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            />
          ))}
        </motion.div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Haqiqat va Faktlar
            </h2>
            <p className="text-xl text-gray-300">
              Dunyodagi eng dahshatli ekologik hujjatlar va ma'lumotlar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/RS7IzU2VJIQ"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Ekologiya haqida video"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-green-400 mb-3">Plastik Butilka</h3>
                <p className="text-gray-300">
                  Bir plastik butilka tabiatda <span className="text-red-400 font-bold">450 yil</span> davomida parchalanmaydi
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-blue-400 mb-3">Germaniya-Yaponiya</h3>
                <p className="text-gray-300">
                  Bu mamlakatlar chiqindilarning <span className="text-green-400 font-bold">95%</span>ni qayta ishlaydi
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">O'zbekiston</h3>
                <p className="text-gray-300">
                  Bizda faqat <span className="text-red-400 font-bold">10%</span> chiqindi qayta ishlanadi
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>



      {/* Enhanced Statistics Section with More Information */}
      <section className="py-32 px-6 bg-gradient-to-b from-blue-900 to-gray-900 relative overflow-hidden">
        {/* Background particles for statistics */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            y: useTransform(scrollYProgress, [0.1, 0.5], ["20%", "-20%"])
          }}
        >
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 5 === 0 ? 'bg-red-400' : 
                i % 5 === 1 ? 'bg-yellow-400' : 
                i % 5 === 2 ? 'bg-green-400' : 
                i % 5 === 3 ? 'bg-blue-400' : 'bg-purple-400'
              }`}
              style={{
                width: `${15 + i * 6}px`,
                height: `${15 + i * 6}px`,
                left: `${(i * 3.8) % 95}%`,
                top: `${(i * 4.2) % 85}%`,
              }}
              animate={{
                scale: [0.8, 1.4, 0.6, 1.1],
                opacity: [0.05, 0.2, 0.02, 0.15],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              Ekologik Faktlar va Ma'lumotlar
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              O'zbekiston va dunyo bo'ylab chiqindi muammosi haqida to'liq ma'lumotlar, statistikalar va tahlillar
            </p>
          </motion.div>

          {/* Main Statistics Grid */}
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <motion.div
              className="text-center bg-gradient-to-b from-red-900/40 to-red-800/20 backdrop-blur-sm rounded-3xl p-10 border-2 border-red-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                className="text-7xl font-bold text-red-400 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {countPlastic}%
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Tabiatni Ifloslantiradi</h3>
              <p className="text-gray-300 text-lg mb-6">O'zbekistonda chiqindilar tabiatni ifloslantiradi</p>
              
              {/* Additional details */}
              <div className="bg-red-500/20 rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-300 font-semibold">Kunlik chiqindi:</span>
                  <span className="text-white font-bold">15,000 tonna</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-300 font-semibold">Yillik hajm:</span>
                  <span className="text-white font-bold">5.5 mln tonna</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-300 font-semibold">Ifloslanish darajasi:</span>
                  <span className="text-white font-bold">Yuqori</span>
                </div>
                <div className="mt-4 p-3 bg-red-600/30 rounded-xl">
                  <p className="text-red-200 text-sm font-medium">
                    💡 Har bir oila kuniga 2.5 kg chiqindi ishlab chiqaradi
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center bg-gradient-to-b from-yellow-900/40 to-orange-800/20 backdrop-blur-sm rounded-3xl p-10 border-2 border-yellow-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                className="text-7xl font-bold text-yellow-400 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {countWaste}
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Yil Parchalanish</h3>
              <p className="text-gray-300 text-lg mb-6">Plastik butilka tabiatda yashash muddati</p>
              
              {/* Additional details */}
              <div className="bg-yellow-500/20 rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-300 font-semibold">Plastik paket:</span>
                  <span className="text-white font-bold">10-20 yil</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-300 font-semibold">Alyuminiy quti:</span>
                  <span className="text-white font-bold">80-100 yil</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-300 font-semibold">Shisha idish:</span>
                  <span className="text-white font-bold">1000+ yil</span>
                </div>
                <div className="mt-4 p-3 bg-yellow-600/30 rounded-xl">
                  <p className="text-yellow-200 text-sm font-medium">
                    ⚠️ Har bir plastik mahsulot asrlar davomida tabiatda qoladi
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center bg-gradient-to-b from-green-900/40 to-emerald-800/20 backdrop-blur-sm rounded-3xl p-10 border-2 border-green-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                className="text-7xl font-bold text-green-400 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {countRecycled}%
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Qayta Ishlanadi</h3>
              <p className="text-gray-300 text-lg mb-6">O'zbekistonda chiqindi qayta ishlash foizi</p>
              
              {/* Additional details */}
              <div className="bg-green-500/20 rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-300 font-semibold">Qayishlarin:</span>
                  <span className="text-white font-bold">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-300 font-semibold">Plastik:</span>
                  <span className="text-white font-bold">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-300 font-semibold">Organik:</span>
                  <span className="text-white font-bold">15%</span>
                </div>
                <div className="mt-4 p-3 bg-green-600/30 rounded-xl">
                  <p className="text-green-200 text-sm font-medium">
                    🎯 Maqsad: 2030 yilgacha 50% qayta ishlash
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Information Section */}
          <motion.div
            className="bg-gradient-to-r from-gray-900/60 to-blue-900/60 backdrop-blur-sm rounded-3xl p-12 border-2 border-white/20 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-4xl font-bold text-center text-white mb-10">Batafsil Ma'lumotlar va Tahlillar</h3>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* O'zbekiston ma'lumotlari */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                  <Factory className="w-8 h-8" />
                  O'zbekiston Holati
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-blue-500/20 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-300 font-semibold">Aholi soni:</span>
                      <span className="text-white font-bold">35+ million</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-300 font-semibold">Kunlik chiqindi/kishi:</span>
                      <span className="text-white font-bold">0.8 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 font-semibold">Qayta ishlash markazlari:</span>
                      <span className="text-white font-bold">12 ta</span>
                    </div>
                  </div>
                  
                  <div className="bg-red-500/20 rounded-xl p-5">
                    <h5 className="text-red-300 font-bold mb-3">Asosiy Muammolar:</h5>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        Chiqindilarni ajratmaslik (90%)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        Kam qayta ishlash zavodlari
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        Xalq o'rtasida kam ma'lumot
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        Plastik ishlatish ko'payishi
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Dunyo ma'lumotlari */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8" />
                  Dunyo Statistikasi
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-green-500/20 rounded-xl p-5">
                    <h5 className="text-green-300 font-bold mb-3">Eng Yaxshi Natijalar:</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">🇩🇪 Germaniya:</span>
                        <span className="text-white font-bold">95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">🇯🇵 Yaponiya:</span>
                        <span className="text-white font-bold">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">🇰🇷 Janubi Koreya:</span>
                        <span className="text-white font-bold">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">🇸🇪 Shvetsiya:</span>
                        <span className="text-white font-bold">87%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/20 rounded-xl p-5">
                    <h5 className="text-purple-300 font-bold mb-3">Global Faktlar:</h5>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Yiliga 2.01 milliard tonna chiqindi
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Okeanga 8 mln tonna plastik
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        2050 da 12 mlrd tonna landfillda
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        300 mln tonna plastik/yil ishlab chiqish
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action in Statistics */}
          <motion.div
            className="text-center bg-gradient-to-r from-red-600/30 to-green-600/30 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Vaziyatni o'zgartirishga vaqt keldi!</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Bu statistikalar shuni ko'rsatadiki, O'zbekiston chiqindi muammosini hal qilish uchun jiddiy choralar ko'rishi kerak. 
              Har birimiz o'z hissamizni qo'shishimiz zarur - chiqindilarni to'g'ri ajratish, qayta ishlash va tabiatni asrash.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 rounded-full px-6 py-3">
                <span className="text-blue-300 font-semibold">🎯 Maqsad: 50% qayta ishlash</span>
              </div>
              <div className="bg-green-500/20 rounded-full px-6 py-3">
                <span className="text-green-300 font-semibold">🌱 Natija: Toza tabiat</span>
              </div>
              <div className="bg-purple-500/20 rounded-full px-6 py-3">
                <span className="text-purple-300 font-semibold">👥 Usul: Birgalikda harakat</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-green-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Galereya
            </h2>
            <p className="text-xl text-gray-300">
              Tabiat va chiqindi kontrastini ko'ring
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://public.youware.com/users-website-assets/prod/3a562e8b-5665-4d0c-9190-9bc4a1be8ad4/23b4519044d4412ba063afc71ca973e2.jpg",
                title: "Buxoro - Plastik Chiqindilar",
                description: "O'zbekistondagi plastik butilka chiqindilar muammosi"
              },
              {
                image: "https://public.youware.com/users-website-assets/prod/3a562e8b-5665-4d0c-9190-9bc4a1be8ad4/902e94485c0443928d13983553fe6b7f.jpg",
                title: "Toshkent - Ekologik Himoya",
                description: "Tabiatni muhofaza qilish va ekologik xavfsizlik"
              },
              {
                image: "https://public.youware.com/users-website-assets/prod/3a562e8b-5665-4d0c-9190-9bc4a1be8ad4/f4b4ff26642c42fbac8f58a612574b86.jpg",
                title: "Ekologik Ta'lim",
                description: "Tabiatni asrash bo'yicha ta'lim va targ'ibot"
              },
              {
                image: "https://public.youware.com/users-website-assets/prod/3a562e8b-5665-4d0c-9190-9bc4a1be8ad4/c58ab229f7594e26a8a668748cd1fe81.jpg",
                title: "O'zbekiston Qayta Ishlash",
                description: "Mamlakatimizda qayta ishlash sanoatini rivojlantirish"
              },
              {
                image: "https://public.youware.com/users-website-assets/prod/3a562e8b-5665-4d0c-9190-9bc4a1be8ad4/6d8e27f6369640fc8d318b5e621b5eb8.jpg",
                title: "Ifloslanishga Qarshi Kurash",
                description: "Plastik ifloslanishini kamaytirishning zamonaviy usullari"
              },
              {
                image: "https://public.youware.com/users-website-assets/prod/3a562e8b-5665-4d0c-9190-9bc4a1be8ad4/3f0a681194ae4af380d1dee00e04a739.jpg",
                title: "Xalqaro Qayta Ishlash",
                description: "Dunyodagi eng yaxshi qayta ishlash tajribalari"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-green-900 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Yechim
            </h2>
            <p className="text-xl text-gray-300">
              Tabiatni asrash uchun nima qilishimiz mumkin
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Recycle className="w-12 h-12" />,
                title: "Qayta ishlash",
                description: "Chiqindilarni to'g'ri ajratish va qayta ishlash"
              },
              {
                icon: <TreePine className="w-12 h-12" />,
                title: "Ko'kalamzorlashtirish",
                description: "Daraxtlar ekish va tabiatni asrash"
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Ta'lim berish",
                description: "Odamlarni ekologiya haqida xabardor qilish"
              }
            ].map((solution, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-green-400 mb-6 flex justify-center"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {solution.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-300">{solution.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={onStartAction}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold flex items-center gap-3 mx-auto transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="w-6 h-6" />
              Siz ham ishtirok eting
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Partner Brands Section with Enhanced Parallax - Moved to End */}
      <motion.section 
        className="py-32 px-6 bg-gradient-to-b from-green-900 to-blue-900 overflow-hidden relative"
        style={{
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Deep parallax background layers */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            y: useTransform(scrollYProgress, [0.2, 0.8], ["30%", "-30%"])
          }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'bg-blue-400' : 
                i % 4 === 1 ? 'bg-red-400' : 
                i % 4 === 2 ? 'bg-cyan-400' : 'bg-green-400'
              }`}
              style={{
                width: `${20 + i * 8}px`,
                height: `${20 + i * 8}px`,
                left: `${(i * 4.5) % 95}%`,
                top: `${(i * 7.2) % 85}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.8, 1.2],
                rotate: [0, 180, -90, 270, 0],
                opacity: [0.05, 0.15, 0.03, 0.1],
              }}
              transition={{
                duration: 25 + i * 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bizning Hamkor Brendlarimiz
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Katta hajmli mahsulotlar bilan ekologik muhitni asrash yo'lida hamkorlik qilayotgan brendlar
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="grid md:grid-cols-3 gap-16 py-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Pepsi Brand - Much Larger */}
              <motion.div
                className="text-center bg-gradient-to-b from-blue-900/30 to-blue-800/20 rounded-3xl p-12 border-2 border-blue-400/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="relative mb-8"
                  animate={{
                    y: [0, -15, 0],
                    rotateY: [0, 8, -8, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src="https://public.youware.com/users-website-assets/prod/613f21f3-3a0f-4d5a-bb62-6225722725a8/13098977cd984ed6bae80935b09dac19.jpeg"
                    alt="Pepsi Katta Hajm"
                    className="w-64 h-80 object-contain mx-auto shadow-2xl drop-shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                    HAMKOR BREND
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    1.25L KATTA HAJM
                  </div>
                </motion.div>
                <h3 className="text-4xl font-bold text-blue-400 mb-4">PEPSI</h3>
                <p className="text-lg text-gray-300 mb-4">Katta hajmli ekologik mahsulotlar</p>
                <div className="bg-blue-500/20 rounded-xl p-4">
                  <p className="text-blue-300 text-sm font-semibold">
                    ✓ Qayta ishlanadigan plastik
                  </p>
                  <p className="text-blue-300 text-sm font-semibold">
                    ✓ Ekologik toza mahsulot
                  </p>
                </div>
              </motion.div>

              {/* Coca-Cola Brand - Much Larger */}
              <motion.div
                className="text-center bg-gradient-to-b from-red-900/30 to-red-800/20 rounded-3xl p-12 border-2 border-red-400/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="relative mb-8"
                  animate={{
                    y: [0, -20, 0],
                    rotateY: [0, -10, 10, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <img
                    src="https://public.youware.com/users-website-assets/prod/613f21f3-3a0f-4d5a-bb62-6225722725a8/2d16bd3a353f48bfba0801b87165451c.jpg"
                    alt="Coca-Cola Katta Hajm"
                    className="w-64 h-80 object-contain mx-auto shadow-2xl drop-shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                    HAMKOR BREND
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    2L KATTA HAJM
                  </div>
                </motion.div>
                <h3 className="text-4xl font-bold text-red-400 mb-4">COCA-COLA</h3>
                <p className="text-lg text-gray-300 mb-4">Tabiatni asrash uchun katta hajm</p>
                <div className="bg-red-500/20 rounded-xl p-4">
                  <p className="text-red-300 text-sm font-semibold">
                    ✓ 100% qayta ishlanadigan
                  </p>
                  <p className="text-red-300 text-sm font-semibold">
                    ✓ Ekologik packaging
                  </p>
                </div>
              </motion.div>

              {/* Water Brand - Much Larger */}
              <motion.div
                className="text-center bg-gradient-to-b from-cyan-900/30 to-cyan-800/20 rounded-3xl p-12 border-2 border-cyan-400/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="relative mb-8"
                  animate={{
                    y: [0, -12, 0],
                    rotateY: [0, 12, -12, 0],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <img
                    src="https://public.youware.com/users-website-assets/prod/613f21f3-3a0f-4d5a-bb62-6225722725a8/369133014e934a17862b48b37e7c9f0f.jpeg"
                    alt="Toza Suv Katta Hajm"
                    className="w-64 h-80 object-contain mx-auto shadow-2xl drop-shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                    HAMKOR BREND
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    5L KATTA HAJM
                  </div>
                </motion.div>
                <h3 className="text-4xl font-bold text-cyan-400 mb-4">TOZA SUV</h3>
                <p className="text-lg text-gray-300 mb-4">Katta hajmli toza suv yechimlari</p>
                <div className="bg-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold">
                    ✓ Qayta ishlatilgan plastiksiz
                  </p>
                  <p className="text-cyan-300 text-sm font-semibold">
                    ✓ Ekologik toza suv
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Partnership Message */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-3xl p-12 border-2 border-white/20 max-w-6xl mx-auto shadow-2xl">
                <h3 className="text-4xl font-bold text-white mb-6">Bizning Katta Hajmli Hamkorlarimiz</h3>
                <p className="text-gray-300 text-xl leading-relaxed mb-8">
                  Pepsi, Coca-Cola va boshqa katta brendlar bilan birgalikda ekologik toza muhit uchun ishlayapmiz. 
                  Katta hajmli mahsulotlar orqali kam plastik ishlatish va qayta ishlanadigan materiallar bilan tabiatni asraymiz.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                  <div className="bg-blue-500/20 rounded-xl p-4">
                    <h4 className="text-lg font-bold text-blue-300 mb-2">Katta Hajm</h4>
                    <p className="text-sm text-gray-300">Kam plastik, ko'proq mahsulot</p>
                  </div>
                  <div className="bg-green-500/20 rounded-xl p-4">
                    <h4 className="text-lg font-bold text-green-300 mb-2">Qayta Ishlash</h4>
                    <p className="text-sm text-gray-300">100% qayta ishlanadigan materiallar</p>
                  </div>
                  <div className="bg-purple-500/20 rounded-xl p-4">
                    <h4 className="text-lg font-bold text-purple-300 mb-2">Ekologik</h4>
                    <p className="text-sm text-gray-300">Tabiatga zarar yetkazmaydigan</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={onGoToPartners}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hamkorlar haqida batafsil
                </motion.button>
              </div>
            </motion.div>

            {/* Floating brand elements */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ translateZ: -50 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-6 h-6 rounded-full opacity-20 ${
                    i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  animate={{
                    x: [0, 150, -150, 0],
                    y: [0, -80, 80, 0],
                    scale: [1, 1.3, 0.7, 1],
                  }}
                  transition={{
                    duration: 12 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                  style={{
                    left: `${8 + (i * 7) % 84}%`,
                    top: `${15 + (i * 5) % 70}%`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bizga Qo'shiling
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ekologiya uchun birgalikda kurashaylik
            </p>

            <div className="flex justify-center space-x-6 mb-12">
              {[
                { name: "Instagram", color: "from-pink-500 to-purple-500" },
                { name: "Telegram", color: "from-blue-500 to-cyan-500" },
                { name: "YouTube", color: "from-red-500 to-pink-500" }
              ].map((social, index) => (
                <motion.button
                  key={index}
                  className={`bg-gradient-to-r ${social.color} text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.name}
                </motion.button>
              ))}
            </div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Fikr-mulohaza bildiring</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ismingiz"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-green-400"
                />
                <textarea
                  placeholder="Sizning fikringiz..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-green-400 h-32"
                />
                <motion.button
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yuborish
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}