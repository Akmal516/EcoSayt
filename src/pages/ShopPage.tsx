import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star, Package, ShoppingBag, Coins } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ShopPageProps {
  onBackToHome: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'drink' | 'bag';
  description: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    deliveryDate: string;
  };
  status: 'pending' | 'processing' | 'completed';
  orderDate: string;
}

// Global Ball Management Functions (same as EcoActionPage)
const getStoredPoints = (): number => {
  const stored = localStorage.getItem('ecoPointsBalance');
  return stored ? parseInt(stored) : 0;
};

const setStoredPoints = (points: number): void => {
  localStorage.setItem('ecoPointsBalance', points.toString());
};

const subtractPoints = (amount: number): number => {
  const currentPoints = getStoredPoints();
  const newPoints = Math.max(0, currentPoints - amount); // Prevent negative balance
  setStoredPoints(newPoints);
  return newPoints;
};

export default function ShopPage({ onBackToHome }: ShopPageProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [userBalance, setUserBalance] = useState(getStoredPoints());
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryDate: ''
  });

  // Load order history from localStorage and update balance on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ecoShopOrderHistory');
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
    setUserBalance(getStoredPoints());
  }, []);

  // Update balance when it changes in localStorage (e.g., from EcoActionPage)
  useEffect(() => {
    const handleStorageChange = () => {
      setUserBalance(getStoredPoints());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const products: Product[] = [
    {
      id: 1,
      name: "Pepsi",
      price: 150,
      image: "https://public.youware.com/users-website-assets/prod/ef7cf6b7-904e-49dd-abd1-7ec03fc635a1/7be182ad84884670aadcde84fabfeace.jpg",
      category: 'drink',
      description: "Sovuq Pepsi - eng yaxshi ichimliklardand biri",
      rating: 4.8
    },
    {
      id: 2,
      name: "Coca Cola",
      price: 150,
      image: "https://public.youware.com/users-website-assets/prod/ef7cf6b7-904e-49dd-abd1-7ec03fc635a1/fb45046529e743c7adb9565d89a289cf.jpg",
      category: 'drink',
      description: "Original Coca Cola klassik ta'mi",
      rating: 4.9
    },
    {
      id: 3,
      name: "Ekologik Shoper",
      price: 500,
      image: "https://public.youware.com/users-website-assets/prod/ef7cf6b7-904e-49dd-abd1-7ec03fc635a1/ab272108a2d549a29caa69aa3cb99344.jpg",
      category: 'bag',
      description: "100% paxta shoper sumkasi - tabiatga zarar yetkazmaydi",
      rating: 4.7
    },
    {
      id: 4,
      name: "Canvas Sumka",
      price: 500,
      image: "https://public.youware.com/users-website-assets/prod/ef7cf6b7-904e-49dd-abd1-7ec03fc635a1/d7cbae97199f4294be5c0641b7160c33.jpg",
      category: 'bag',
      description: "Chidamli canvas sumka - uzoq muddat xizmat qiladi",
      rating: 4.6
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderData.name || !orderData.phone || !orderData.email || !orderData.deliveryDate) {
      alert('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const totalPrice = getTotalPrice();
    
    // Check if user has enough balance
    if (userBalance < totalPrice) {
      alert(`Yetarli balansingiz yo'q!\nKerak: ${totalPrice} ball\nMavjud: ${userBalance} ball\n\nKo'proq ball to'plash uchun "Siz ham ishtirok eting" bo'limiga o'ting.`);
      return;
    }
    
    // Subtract points from user balance
    const newBalance = subtractPoints(totalPrice);
    setUserBalance(newBalance);

    // Create new order object
    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      items: [...cart],
      totalPrice: totalPrice,
      customerInfo: { ...orderData },
      status: 'processing',
      orderDate: new Date().toISOString()
    };
    
    // Add to order history and save to localStorage
    const updatedHistory = [...orderHistory, newOrder];
    setOrderHistory(updatedHistory);
    localStorage.setItem('ecoShopOrderHistory', JSON.stringify(updatedHistory));
    
    // Simulate order processing
    alert(`Buyurtma qabul qilindi!\nIsm: ${orderData.name}\nTelefon: ${orderData.phone}\nEmail: ${orderData.email}\nYetkazish: ${orderData.deliveryDate}\nJami: ${totalPrice} ball\nQolgan balans: ${newBalance} ball\n\nDastavka faqat Yashnobod tumaniga amalga oshiriladi.`);
    
    // Set current order and show success
    setCurrentOrder(newOrder);
    
    // Reset form and cart
    setOrderData({ name: '', phone: '', email: '', deliveryDate: '' });
    setCart([]);
    setShowOrderForm(false);
    setShowCart(true); // Keep cart open to show order status
  };

  // Parallax scroll effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
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
      <header className="relative z-10 flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm">
        <motion.button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Orqaga</span>
        </motion.button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Ekologik Magazin
        </h1>

        <div className="flex items-center gap-4">
          {/* User Balance Display */}
          <motion.div
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full px-4 py-2 border border-yellow-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-yellow-300">{userBalance} ball</span>
          </motion.div>

          <motion.button
            onClick={() => setShowOrderHistory(!showOrderHistory)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Package className="w-5 h-5" />
            <span className="font-semibold">Tarix</span>
          </motion.button>

          <motion.button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {getTotalItems()}
              </motion.span>
            )}
            <span className="font-semibold">Savatcha</span>
          </motion.button>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Mahsulotlarimiz
            </h2>
            <p className="text-xl text-gray-300">
              Ekologik ichimliklar va qayta foydalaniladigan sumkalar
            </p>
          </motion.div>

          {/* Drinks Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold text-white">Ichimliklar</h3>
              <span className="text-green-400 font-semibold">150 ball</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {products.filter(product => product.category === 'drink').map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-6 items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-32 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">{product.name}</h4>
                      <p className="text-gray-300 mb-3">{product.description}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-300 text-sm">{product.rating}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-green-400">
                          {product.price} ball
                        </span>
                        
                        <motion.button
                          onClick={() => addToCart(product)}
                          disabled={userBalance < product.price}
                          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                            userBalance >= product.price
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                          whileHover={userBalance >= product.price ? { scale: 1.05 } : {}}
                          whileTap={userBalance >= product.price ? { scale: 0.95 } : {}}
                        >
                          {userBalance >= product.price ? 'Savatga qo\'shish' : 'Yetarli ball yo\'q'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bags Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="w-8 h-8 text-green-400" />
              <h3 className="text-3xl font-bold text-white">Sumkalar</h3>
              <span className="text-green-400 font-semibold">500 ball</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {products.filter(product => product.category === 'bag').map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-6 items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">{product.name}</h4>
                      <p className="text-gray-300 mb-3">{product.description}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-300 text-sm">{product.rating}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-green-400">
                          {product.price} ball
                        </span>
                        
                        <motion.button
                          onClick={() => addToCart(product)}
                          disabled={userBalance < product.price}
                          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                            userBalance >= product.price
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                          whileHover={userBalance >= product.price ? { scale: 1.05 } : {}}
                          whileTap={userBalance >= product.price ? { scale: 0.95 } : {}}
                        >
                          {userBalance >= product.price ? 'Savatga qo\'shish' : 'Yetarli ball yo\'q'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <motion.div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-sm border-l border-white/20 z-50 transform transition-transform duration-300 ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
        initial={false}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Savatcha</h3>
            <button
              onClick={() => setShowCart(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {currentOrder ? (
            /* Order Status Display */
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Package className="w-12 h-12 text-green-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sizning buyurtmangiz jarayonda
                </h3>
                
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-6">
                  <div className="text-left space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Buyurtma raqami:</span>
                      <span className="text-white font-semibold">{currentOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Holati:</span>
                      <span className="text-orange-400 font-semibold flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 bg-orange-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Jarayonda
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Buyurtma vaqti:</span>
                      <span className="text-white">{currentOrder.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Yetkazish:</span>
                      <span className="text-white">{currentOrder.customerInfo.deliveryDate}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-white">Jami:</span>
                        <span className="text-xl font-bold text-green-400">
                          {currentOrder.totalPrice} ball
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">
                    📞 Tez orada operatorimiz siz bilan bog'lanadi
                  </p>
                  <p className="text-gray-300 text-sm">
                    📍 Dastavka Yashnobod tumaniga amalga oshiriladi
                  </p>
                </div>
                
                <motion.button
                  onClick={() => setCurrentOrder(null)}
                  className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yangi buyurtma berish
                </motion.button>
              </motion.div>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-center">Savatcha bo'sh</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white/10 rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{item.name}</h4>
                        <p className="text-green-400 font-bold">
                          {item.price} ball
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          
                          <span className="text-white font-bold mx-2">{item.quantity}</span>
                          
                          <motion.button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-white">Jami:</span>
                  <span className="text-2xl font-bold text-green-400">
                    {getTotalPrice()} ball
                  </span>
                </div>
                
                {/* Balance Check for Checkout */}
                {getTotalPrice() > userBalance && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-300 text-sm text-center">
                      ⚠️ Yetarli balansingiz yo'q!<br/>
                      Kerak: {getTotalPrice()} ball, Mavjud: {userBalance} ball
                    </p>
                  </div>
                )}
                
                <motion.button
                  onClick={() => setShowOrderForm(true)}
                  disabled={getTotalPrice() > userBalance}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    getTotalPrice() <= userBalance
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={getTotalPrice() <= userBalance ? { scale: 1.02 } : {}}
                  whileTap={getTotalPrice() <= userBalance ? { scale: 0.98 } : {}}
                >
                  {getTotalPrice() <= userBalance ? 'Buyurtma berish' : 'Yetarli ball yo\'q'}
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Buyurtma berish</h3>
              <button
                onClick={() => setShowOrderForm(false)}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 space-y-3">
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Dastavka faqat Yashnobod tumaniga amalga oshiriladi
                </p>
              </div>
              
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-300 text-sm">Sizning balansingiz:</span>
                  <span className="text-blue-200 font-bold">{userBalance} ball</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-300 text-sm">Buyurtma narxi:</span>
                  <span className="text-blue-200 font-bold">{getTotalPrice()} ball</span>
                </div>
                <div className="border-t border-blue-400/30 mt-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Qoladi:</span>
                    <span className={`font-bold ${
                      userBalance >= getTotalPrice() ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {userBalance - getTotalPrice()} ball
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Ismingiz</label>
                <input
                  type="text"
                  value={orderData.name}
                  onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-green-400"
                  placeholder="To'liq ismingizni kiriting"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Telefon raqam</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-green-400"
                  placeholder="+998 90 123 45 67"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email pochta</label>
                <input
                  type="email"
                  value={orderData.email}
                  onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-green-400"
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Yetkazish vaqti</label>
                <input
                  type="datetime-local"
                  value={orderData.deliveryDate}
                  onChange={(e) => setOrderData({...orderData, deliveryDate: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-green-400"
                  required
                />
              </div>

              <div className="border-t border-white/20 pt-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-white">Jami:</span>
                  <span className="text-xl font-bold text-green-400">
                    {getTotalPrice()} ball
                  </span>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buyurtmani tasdiqlash
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Overlay for cart */}
      {showCart && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCart(false)}
        />
      )}

      {/* Order History Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-96 bg-gray-900/95 backdrop-blur-sm border-r border-white/20 z-50 transform transition-transform duration-300 ${
          showOrderHistory ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Buyurtma tarixi</h3>
            <button
              onClick={() => setShowOrderHistory(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {orderHistory.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Hali buyurtmalar yo'q</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {orderHistory.map((order) => (
                <motion.div
                  key={order.id}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{order.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'processing' ? 'bg-orange-500/20 text-orange-400' :
                      order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {order.status === 'processing' ? 'Jarayonda' :
                       order.status === 'completed' ? 'Tayyor' : 'Kutilmoqda'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Mijoz:</span>
                      <span className="text-white">{order.customerInfo.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Sana:</span>
                      <span className="text-white">{order.orderDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Yetkazish:</span>
                      <span className="text-white">{order.customerInfo.deliveryDate}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-3">
                    <div className="space-y-2 mb-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-300">{item.name} × {item.quantity}</span>
                          <span className="text-white">{item.price * item.quantity} ball</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Jami:</span>
                      <span className="text-green-400">{order.totalPrice} ball</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Overlay for order history */}
      {showOrderHistory && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowOrderHistory(false)}
        />
      )}

      {/* Eco Message */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-green-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Tabiatni Asraymiz!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Har bir xarid tabiatni asrashga hissa qo'shadi. Plastik o'rniga qayta foydalaniladigan sumkalardan foydalaning!
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-lg text-white">
                  💚 Bir canvas sumka 1000+ plastik paketni almashtiradi
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}