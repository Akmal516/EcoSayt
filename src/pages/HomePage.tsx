import { motion } from 'framer-motion';
import { Play, ChevronDown, Smartphone, Recycle, QrCode, Gift } from 'lucide-react';
import { useState, useRef } from 'react';

interface HomePageProps {
  onStartProcess: () => void;
}

const HomePage = ({ onStartProcess }: HomePageProps) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const partnerLogos = [
    { name: 'Coca-Cola', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pepsi_2023.svg/1200px-Pepsi_2023.svg.png' },
    { name: 'Pepsi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pepsi_2023.svg/1200px-Pepsi_2023.svg.png' },
    { name: 'Assalom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pepsi_2023.svg/1200px-Pepsi_2023.svg.png' },
    { name: "Do'stlik", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pepsi_2023.svg/1200px-Pepsi_2023.svg.png' },
  ];

  const processSteps = [
    {
      id: 1,
      title: 'Sotib olish',
      description: 'Ichimlik butilkasi yoki cola',
      icon: '🥤',
      image: 'https://cocacolaunited-old.s3.amazonaws.com/wp-content/uploads/2024/01/Stroud-0019-scaled.jpg'
    },
    {
      id: 2,
      title: 'Qaytarish',
      description: 'Idishni savatga yoki mashinaga tashlash',
      icon: '♻️',
      image: 'https://allaboutberlin.com/images/pfandautomat-edeka-bottle-return-machine.jpg'
    },
    {
      id: 3,
      title: 'Bonus olish',
      description: 'Telefon ekranida +10% bonus',
      icon: '💰',
      image: 'https://static.vecteezy.com/system/resources/previews/036/627/108/non_2x/rewards-mockup-for-smartphone-casino-bonus-casino-icon-vector.jpg'
    }
  ];

  const features = [
    {
      id: 'mobile',
      title: 'Mobil ilova',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'Bonus tushayotgan animatsiya bilan',
      animation: 'phone'
    },
    {
      id: 'ecosavat',
      title: 'EkoSavat',
      icon: <Recycle className="w-8 h-8" />,
      description: '3D savat aylanib, idishlar tushadi',
      animation: 'basket'
    },
    {
      id: 'qrcode',
      title: 'QR kod',
      icon: <QrCode className="w-8 h-8" />,
      description: 'Telefon uni skaner qiladi',
      animation: 'qr'
    },
    {
      id: 'bonus',
      title: 'Bonus',
      icon: <Gift className="w-8 h-8" />,
      description: 'Pul belgisi sharshara bo\'lib tushadi',
      animation: 'money'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      {/* 1. Katta intro video */}
      <section className="h-screen relative overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://www.greenmax-machine.com/pics/bottle-recycling-machine.png"
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        >
          <ChevronDown className="w-8 h-8 text-white animate-bounce mx-auto" />
        </motion.div>
      </section>

      {/* 2. Jarayon (gorizontal slayd) */}
      <section className="py-20 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Qanday ishlaydi?
          </motion.h2>
          
          <div className="flex justify-center items-center space-x-8 overflow-x-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <motion.img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Harakat boshlash tugmasi */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={onStartProcess}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 font-bold text-2xl px-16 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 mx-auto"
          >
            <Play className="w-8 h-8" />
            Harakatni Boshlash
          </motion.button>
        </motion.div>
      </section>

      {/* 3. Hamkorlar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Hamkor Brendlar
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateZ: 5,
                  transition: { duration: 0.3 }
                }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => {
                  // Animatsiya bilan "hamkor bonuslari" ko'rsatish
                  setActiveFeature(partner.name);
                  setTimeout(() => setActiveFeature(null), 2000);
                }}
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-20 object-contain mb-4"
                />
                <h3 className="text-center font-semibold text-gray-700">{partner.name}</h3>
                
                {activeFeature === partner.name && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                  >
                    🎁 Hamkor Bonusi!
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Texnik xususiyatlar */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Interaktiv Xususiyatlar
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                onClick={() => {
                  setActiveFeature(feature.id);
                  setTimeout(() => setActiveFeature(null), 3000);
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-blue-500 mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                {/* Animatsiya effektlari */}
                {activeFeature === feature.id && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {feature.animation === 'phone' && (
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                      >
                        📱💰
                      </motion.div>
                    )}
                    {feature.animation === 'basket' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                      >
                        🗑️
                      </motion.div>
                    )}
                    {feature.animation === 'qr' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0] }}
                        transition={{ duration: 2 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                      >
                        📷
                      </motion.div>
                    )}
                    {feature.animation === 'money' && (
                      <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 100 }}
                        transition={{ duration: 2, repeat: 2 }}
                        className="absolute left-1/2 transform -translate-x-1/2 text-4xl"
                      >
                        💰💰💰
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3D Slogan */}
      <section className="py-32 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
          whileInView={{ 
            scale: 1, 
            opacity: 1, 
            rotateX: 0,
            transition: { duration: 1.5, type: "spring" }
          }}
          className="text-center relative z-10"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-8"
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transform: "perspective(1000px) rotateX(15deg)"
            }}
          >
            <motion.span
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block"
            >
              Qaytar
            </motion.span>
            {" "}
            <motion.span
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-block"
            >
              - Yut
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white font-light"
          >
            Tabiatni asra, bonusni ol!
          </motion.p>
        </motion.div>
        
        {/* 3D effekt uchun background elementlar */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;