import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, CheckCircle, Camera, Upload, Award, Share2, Users, Target, TreePine, Recycle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface EcoActionPageProps {
  onBackToHome: () => void;
}

// Global Ball Management Functions
const getStoredPoints = (): number => {
  const stored = localStorage.getItem('ecoPointsBalance');
  return stored ? parseInt(stored) : 0;
};

const setStoredPoints = (points: number): void => {
  localStorage.setItem('ecoPointsBalance', points.toString());
};

const addPoints = (amount: number): number => {
  const currentPoints = getStoredPoints();
  const newPoints = currentPoints + amount;
  setStoredPoints(newPoints);
  return newPoints;
};

export default function EcoActionPage({ onBackToHome }: EcoActionPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [points, setPoints] = useState(getStoredPoints());
  const [sessionPoints, setSessionPoints] = useState(0); // Track points earned in this session

  const steps = [
    {
      id: 1,
      title: "Chiqindilarni Ajrating",
      description: "Plastik, qog'oz va organik chiqindilarni alohida ajrating",
      action: "Boshlash",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Suratga Oling",
      description: "Ajratgan chiqindilaringizni suratga olib yuklang",
      action: "Surat Yuklash",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Rag'batlantirish",
      description: "Ishtirok uchun ball to'plang va sovrinlar oling",
      action: "Ball Olish",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const handleStepComplete = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId + 1);
      const newTotal = addPoints(100);
      setPoints(newTotal);
      setSessionPoints(prev => prev + 100);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages(prev => [...prev, e.target!.result as string]);
          const newTotal = addPoints(50);
          setPoints(newTotal);
          setSessionPoints(prev => prev + 50);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Update points display when component mounts
  useEffect(() => {
    setPoints(getStoredPoints());
  }, []);

  // Parallax scroll effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
  const smoothParticlesY = useSpring(particlesY, { stiffness: 120, damping: 35 });

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen text-white relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm">
        <motion.button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Orqaga</span>
        </motion.button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{points} ball</span>
          </div>
        </div>
      </div>

      {/* Parallax Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ y: smoothBackgroundY }}
      >
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'bg-green-400' : 
              i % 4 === 1 ? 'bg-blue-400' : 
              i % 4 === 2 ? 'bg-yellow-400' : 'bg-cyan-400'
            }`}
            style={{
              width: `${15 + i * 5}px`,
              height: `${15 + i * 5}px`,
              left: `${(i * 3.8) % 95}%`,
              top: `${(i * 6.5) % 90}%`,
            }}
            animate={{
              scale: [0.8, 1.4, 0.6, 1.1],
              rotate: [0, 90, -45, 180, 0],
              opacity: [0.1, 0.3, 0.05, 0.2],
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

      {/* Hero Section */}
      <section className="py-16 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Ekologik Harakatlar
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Tabiatni asrash uchun faol ishtirok eting va mukofotlar oling
          </p>
        </motion.div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep > step.id
                      ? 'bg-green-500 border-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-400'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="font-bold">{step.id}</span>
                  )}
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <motion.div
            key={currentStep}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentStep <= 3 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
                <div className={`bg-gradient-to-r ${steps[currentStep - 1]?.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {currentStep === 1 && <Recycle className="w-8 h-8 text-white" />}
                  {currentStep === 2 && <Camera className="w-8 h-8 text-white" />}
                  {currentStep === 3 && <Award className="w-8 h-8 text-white" />}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  {steps[currentStep - 1]?.title}
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  {steps[currentStep - 1]?.description}
                </p>

                {currentStep === 1 && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      { name: "Plastik", icon: "🍶", color: "bg-blue-500" },
                      { name: "Qog'oz", icon: "📰", color: "bg-yellow-500" },
                      { name: "Organik", icon: "🍎", color: "bg-green-500" }
                    ].map((type, index) => (
                      <motion.div
                        key={type.name}
                        className={`${type.color} rounded-xl p-6 text-white text-center cursor-pointer hover:scale-105 transition-transform`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-4xl mb-2">{type.icon}</div>
                        <div className="font-bold">{type.name}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-green-400 rounded-xl p-8 text-center">
                      <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">Chiqindi suratlarini yuklang</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-colors"
                      >
                        Surat Tanlash
                      </label>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedImages.map((image, index) => (
                          <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={image}
                              alt={`Yuklangan ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="w-16 h-16 text-white mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Tabriklaymiz!</h3>
                      <p className="text-white/90">Bu sessiyada {sessionPoints} ball to'pladingiz</p>
                    <p className="text-white/70 text-sm">Jami balansingiz: {points} ball</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "Ekologik Sertifikat", points: 500, icon: "🏆" },
                        { title: "Daraxt Ekish", points: 1000, icon: "🌱" }
                      ].map((reward, index) => (
                        <motion.div
                          key={reward.title}
                          className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
                          initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <div className="text-4xl mb-4">{reward.icon}</div>
                          <h4 className="text-lg font-bold text-white mb-2">{reward.title}</h4>
                          <p className="text-gray-300 mb-4">{reward.points} ball kerak</p>
                          <button
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                              points >= reward.points
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={points < reward.points}
                          >
                            {points >= reward.points ? 'Olish' : 'Yetarli emas'}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep <= 3 && (
                  <motion.button
                    onClick={() => handleStepComplete(currentStep)}
                    className={`bg-gradient-to-r ${steps[currentStep - 1]?.color} hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 mt-8`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentStep === 2 && uploadedImages.length === 0}
                  >
                    {steps[currentStep - 1]?.action}
                  </motion.button>
                )}
              </div>
            )}

            {currentStep > 3 && (
              <motion.div
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-12">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  >
                    <TreePine className="w-24 h-24 text-white mx-auto mb-6" />
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Ajoyib ish!
                  </h2>
                  <p className="text-white/90 text-xl mb-4">
                    Siz tabiatni asrashda faol ishtirok etdingiz!
                  </p>
                  <p className="text-white/80 text-lg mb-4">
                    Bu sessiyada {sessionPoints} ball to'pladingiz
                  </p>
                  <p className="text-white/70 text-base mb-8">
                    Jami balansingiz: {points} ball
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                      Ulashish
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        setCurrentStep(1);
                        setSessionPoints(0); // Reset session points, but keep total balance
                        setUploadedImages([]);
                      }}
                      className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Qayta Boshlash
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Jamiyat Ishtirokchilari
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { name: "Aktiv foydalanuvchilar", count: "1,234", icon: <Users className="w-8 h-8" /> },
                { name: "Yuklangan suratlar", count: "5,678", icon: <Camera className="w-8 h-8" /> },
                { name: "Ekilgan daraxtlar", count: "89", icon: <TreePine className="w-8 h-8" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-green-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.count}</div>
                  <div className="text-gray-300">{stat.name}</div>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Har bir ishtirok tabiatni asrashga hissa qo'shadi!
            </motion.p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}