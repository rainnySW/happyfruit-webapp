"use client";

import { useState, useEffect } from "react";

// --- Mock Data (Fruit Menu) ---
const MENU = [
  { id: 1, imgSrc: "/images/watermelon.jpg", name: { th: "แตงโมหั่นชิ้น", en: "Fresh Watermelon" }, price: 20, desc: { th: "หวานฉ่ำ ดับกระหาย", en: "Sweet & juicy" } },
  { id: 2, imgSrc: "/images/mango_sweet_sauce.jpg", name: { th: "มะม่วงน้ำปลาหวาน", en: "Mango & Sweet Sauce" }, price: 35, desc: { th: "เปรี้ยวอมหวาน เครื่องแน่น", en: "Sour with spicy dip" } },
  { id: 3, imgSrc: "/images/pineapple.jpg", name: { th: "สับปะรดภูแล", en: "Phulae Pineapple" }, price: 25, desc: { th: "กรอบ หวานอมเปรี้ยว", en: "Crispy & sweet" } },
  { id: 4, imgSrc: "/images/cantaloupe.jpg", name: { th: "แคนตาลูป", en: "Cantaloupe" }, price: 30, desc: { th: "หอมหวาน ชื่นใจ", en: "Aromatic & sweet" } },
  { id: 5, imgSrc: "/images/strawberry_dip.jpg", name: { th: "สตรอว์เบอร์รีคลุกพริกเกลือ", en: "Strawberry with Dip" }, price: 45, desc: { th: "เปรี้ยวจี๊ดจ๊าด โดนใจ", en: "Sour & spicy" } },
  { id: 6, imgSrc: "/images/guava_plum.jpg", name: { th: "ฝรั่งแช่บ๊วย", en: "Guava Plum" }, price: 25, desc: { th: "กรอบอร่อย คลุกผงบ๊วย", en: "Crispy with plum powder" } },
  { id: 7, imgSrc: "/images/coconut.jpg", name: { th: "มะพร้าวน้ำหอม", en: "Fresh Coconut" }, price: 40, desc: { th: "หอมหวานชื่นใจ", en: "Refreshing sweet coconut water" } },
  { id: 8, imgSrc: "/images/orange.jpg", name: { th: "ส้มเขียวหวาน", en: "Sweet Orange" }, price: 30, desc: { th: "ปอกเปลือกพร้อมทาน", en: "Peeled and ready to eat" } },
];

// --- Dictionaries (i18n) ---
const DICT = {
  th: {
    appName: "สุขสันผลไม้",
    menuTitle: "ผลไม้สดวันนี้",
    cartTitle: "ตะกร้าของคุณ",
    emptyCart: "ยังไม่มีผลไม้ในตะกร้า",
    total: "รวมทั้งสิ้น",
    checkout: "ชำระเงิน",
    payTitle: "ชำระเงิน",
    qrInfo: "สแกน QR เพื่อชำระเงิน",
    bankTransfer: "หรือโอนผ่านบัญชีธนาคาร",
    bankName: "ธ.กสิกรไทย (บจก. สุขสันผลไม้)",
    accNumber: "012-3-45678-9",
    uploadSlip: "แนบสลิปโอนเงิน",
    confirmPay: "ยืนยันการสั่งซื้อ",
    success: "สั่งซื้อสำเร็จ!",
    queueIs: "หมายเลขคิวของคุณ",
    waitMsg: "กรุณารอเรียกคิวเพื่อรับผลไม้สดๆ ของคุณ",
    backHome: "กลับหน้าหลัก",
    baht: "฿",
    addToCart: "ใส่ตะกร้า",
  },
  en: {
    appName: "HappyFruit",
    menuTitle: "Fresh Menu",
    cartTitle: "Your Cart",
    emptyCart: "Cart is empty",
    total: "Total",
    checkout: "Checkout",
    payTitle: "Payment",
    qrInfo: "Scan QR to Pay",
    bankTransfer: "Or Bank Transfer",
    bankName: "KBank (HappyFruit Co.,Ltd)",
    accNumber: "012-3-45678-9",
    uploadSlip: "Upload Slip",
    confirmPay: "Confirm Order",
    success: "Order Successful!",
    queueIs: "Your Queue No.",
    waitMsg: "Please wait while we prepare your fresh fruits.",
    backHome: "Back to Home",
    baht: "฿",
    addToCart: "Add to Cart",
  },
};

export default function Home() {
  const [lang, setLang] = useState("th");
  const [isDark, setIsDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu"); // menu, cart (mobile only), checkout, receipt
  const [queue, setQueue] = useState(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const [renderView, setRenderView] = useState("menu");

  const t = DICT[lang];

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const changeView = (newView) => {
    if (view === newView) return;
    setIsAnimating(true);
    setTimeout(() => {
      setView(newView);
      setRenderView(newView);
      setIsAnimating(false);
    }, 300);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const completeOrder = () => {
    setQueue(Math.floor(Math.random() * 90) + 10);
    changeView("receipt");
    setTimeout(() => setCart([]), 500);
  };

  const Navbar = () => (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-slate-100 dark:border-dark-border px-4 py-3 lg:px-8 flex justify-between items-center transition-colors duration-400">
      <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => changeView("menu")}>
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-50 dark:bg-brand-500/10 rounded-full flex items-center justify-center text-2xl lg:text-3xl pb-1">
          🍓
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{t.appName}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button
          onClick={() => setLang(lang === "th" ? "en" : "th")}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 dark:bg-dark-card flex items-center justify-center text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 active:scale-95 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
        >
          {lang.toUpperCase()}
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 dark:bg-dark-card flex items-center justify-center text-lg lg:text-xl active:scale-95 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300"
        >
          {isDark ? <i className="ph-fill ph-moon"></i> : <i className="ph-bold ph-sun"></i>}
        </button>
      </div>
    </nav>
  );

  const MenuView = () => (
    <div className={`pb-32 lg:pb-12 px-4 lg:px-8 pt-6 w-full ${isAnimating ? "animate-leave" : "animate-enter"}`}>
      <h2 className="text-xl lg:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <i className="ph-fill ph-sparkle text-brand-500"></i>
        {t.menuTitle}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {MENU.map((item) => {
          const qtyInCart = cart.find((i) => i.id === item.id)?.qty || 0;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-dark-card rounded-[2rem] lg:rounded-3xl p-4 lg:p-6 shadow-card dark:shadow-card-dark flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-full aspect-square bg-brand-50/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-6xl lg:text-8xl mb-4 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                <img src={item.imgSrc} alt={item.name.en} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold lg:text-xl text-slate-800 dark:text-slate-100 leading-tight mb-1">
                  {item.name[lang]}
                </h3>
                <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 line-clamp-2">
                  {item.desc[lang]}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-brand-500 text-lg lg:text-2xl">
                    {t.baht}
                    {item.price}
                  </span>

                  {qtyInCart > 0 ? (
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full h-10 w-[72px] justify-between px-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 rounded-full active:bg-slate-200 dark:active:bg-slate-700 transition-colors"
                      >
                        <i className="ph-bold ph-minus text-sm"></i>
                      </button>
                      <span className="font-semibold text-sm w-4 text-center">{qtyInCart}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-brand-500 rounded-full active:bg-slate-200 dark:active:bg-slate-700 transition-colors"
                      >
                        <i className="ph-bold ph-plus text-sm"></i>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center active:scale-95 transition-all hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white shadow-sm"
                    >
                      <i className="ph-bold ph-plus text-xl"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CartView = ({ isDesktop = false }) => (
    <div
      className={`${
        isDesktop ? "sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto" : "pb-32 px-4 pt-6 min-h-[80vh]"
      } flex flex-col w-full max-w-lg mx-auto lg:max-w-none ${!isDesktop && (isAnimating ? "animate-leave" : "animate-enter")}`}
    >
      <div className="flex items-center mb-6">
        {!isDesktop && (
          <button
            onClick={() => changeView("menu")}
            className="w-10 h-10 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 mr-4 active:scale-90 transition-transform"
          >
            <i className="ph-bold ph-arrow-left text-lg"></i>
          </button>
        )}
        <h2 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 flex-1">{t.cartTitle}</h2>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 pb-20">
          <i className="ph-thin ph-basket text-7xl mb-4 opacity-50"></i>
          <p>{t.emptyCart}</p>
          {!isDesktop && (
            <button
              onClick={() => changeView("menu")}
              className="mt-6 px-6 py-2 rounded-full bg-slate-100 dark:bg-dark-card font-medium text-slate-600 dark:text-slate-300"
            >
              {t.backHome}
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-dark-card rounded-2xl lg:rounded-3xl p-3 shadow-sm flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-brand-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl overflow-hidden shrink-0">
                  <img src={item.imgSrc} alt={item.name.en} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 truncate">{item.name[lang]}</h4>
                  <div className="text-brand-500 font-medium">
                    {t.baht}
                    {item.price * item.qty}
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-full p-1 border border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 shadow-sm active:scale-90 transition-all"
                  >
                    {item.qty === 1 ? <i className="ph-bold ph-trash text-red-400"></i> : <i className="ph-bold ph-minus"></i>}
                  </button>
                  <span className="w-6 text-center font-medium text-sm text-slate-800 dark:text-slate-200">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 shadow-sm active:scale-90 transition-all"
                  >
                    <i className="ph-bold ph-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white dark:bg-dark-card rounded-3xl p-6 shadow-card dark:shadow-card-dark lg:mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{t.total}</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                {t.baht}
                {cartTotal}
              </span>
            </div>
            <button
              onClick={() => changeView("checkout")}
              className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-semibold shadow-floating active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {t.checkout}
              <i className="ph-bold ph-arrow-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );

  const CheckoutView = ({ isDesktop = false }) => (
    <div className={`${isDesktop ? "sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto" : "pb-24 px-4 pt-6 max-w-lg mx-auto"} flex flex-col w-full lg:max-w-none ${!isDesktop && (isAnimating ? "animate-leave" : "animate-enter")}`}>
      <div className="flex items-center mb-6">
        <button
          onClick={() => changeView("cart")}
          className="w-10 h-10 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 mr-4 active:scale-90 transition-transform"
        >
          <i className="ph-bold ph-arrow-left text-lg"></i>
        </button>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.payTitle}</h2>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-[2rem] p-6 shadow-card dark:shadow-card-dark text-center lg:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 mb-4">
          <i className="ph-fill ph-qr-code text-2xl"></i>
        </div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6">{t.qrInfo}</h3>

        <div className="w-48 h-48 bg-white p-3 mx-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6 relative overflow-hidden">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HappyFruitPromptPay&color=${
              isDark ? "1e293b" : "0f172a"
            }`}
            alt="QR Code"
            className="w-full h-full object-contain opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl p-1 shadow-md w-10 h-10 flex items-center justify-center pb-1">
              🍓
            </div>
          </div>
        </div>

        <div className="text-slate-500 dark:text-slate-400 text-sm mb-2">{t.bankTransfer}</div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
          <p className="font-medium text-slate-800 dark:text-slate-200">{t.bankName}</p>
          <p className="text-lg font-mono tracking-widest text-brand-500 mt-1">{t.accNumber}</p>
        </div>

        <div className="flex justify-between items-center bg-brand-50 dark:bg-brand-500/10 p-4 rounded-xl mb-6 border border-brand-100 dark:border-brand-900">
          <span className="font-medium text-brand-600 dark:text-brand-400">{t.total}</span>
          <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
            {t.baht}
            {cartTotal}
          </span>
        </div>

        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-8 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 active:bg-slate-50 dark:active:bg-slate-800 cursor-pointer transition-colors">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1">
            <i className="ph-bold ph-image text-xl"></i>
          </div>
          <span className="font-medium text-sm">{t.uploadSlip}</span>
        </div>

        <button
          onClick={completeOrder}
          className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-semibold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <i className="ph-fill ph-check-circle text-lg"></i>
          <span className="hidden lg:inline">{t.confirmPay}</span>
          <span className="lg:hidden">{t.confirmPay}</span>
        </button>
      </div>
    </div>
  );

  const ReceiptView = () => (
    <div
      className={`px-4 pt-10 pb-24 w-full flex flex-col items-center justify-center min-h-[85vh] text-center ${
        isAnimating ? "animate-leave" : "animate-enter"
      }`}
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(34,197,94,0.4)] z-10 relative animate-pop">
          <i className="ph-bold ph-check"></i>
        </div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-[ping_1s_ease-out_forwards]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-400 rounded-full animate-[ping_1.5s_ease-out_forwards]"></div>
      </div>

      <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2">{t.success}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs lg:max-w-md lg:text-lg">{t.waitMsg}</p>

      <div className="bg-white dark:bg-dark-card rounded-[2rem] w-full max-w-xs lg:max-w-sm relative drop-shadow-xl">
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 bg-slate-50 dark:bg-dark-bg rounded-full"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 bg-slate-50 dark:bg-dark-bg rounded-full"></div>

        <div className="p-8 border-b-2 border-dashed border-slate-100 dark:border-slate-700">
          <p className="text-slate-400 dark:text-slate-500 font-medium mb-2 uppercase tracking-wider text-sm lg:text-base">
            {t.queueIs}
          </p>
          <h1 className="text-7xl lg:text-8xl font-black text-brand-500 tracking-tighter">Q{queue}</h1>
        </div>
        <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-b-[2rem]">
          <p className="text-xs lg:text-sm font-mono text-slate-400 dark:text-slate-500">
            {new Date().toLocaleString(lang === "th" ? "th-TH" : "en-US", { dateStyle: "long", timeStyle: "short" })}
          </p>
        </div>
      </div>

      <button
        onClick={() => changeView("menu")}
        className="mt-12 px-8 py-4 bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-200 rounded-full font-semibold active:scale-95 transition-all flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        <i className="ph-bold ph-house text-lg"></i>
        {t.backHome}
      </button>
    </div>
  );

  const FloatingCart = () => {
    if (cartItemsCount === 0 || renderView !== "menu") return null;
    return (
      <div className="fixed bottom-6 left-0 right-0 px-4 z-50 max-w-lg mx-auto animate-enter lg:hidden">
        <button
          onClick={() => changeView("cart")}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] p-4 shadow-xl flex items-center justify-between active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 dark:bg-slate-900/10 rounded-full flex items-center justify-center">
                <i className="ph-bold ph-shopping-bag text-2xl"></i>
              </div>
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-slate-900 dark:border-white">
                {cartItemsCount}
              </span>
            </div>
            <span className="font-semibold text-lg">{t.cartTitle}</span>
          </div>
          <span className="font-bold text-xl mr-2">
            {t.baht}
            {cartTotal}
          </span>
        </button>
      </div>
    );
  };

  // Main Desktop/Mobile unified layout
  return (
    <div className="w-full h-full relative font-[family-name:var(--font-noto-sans-thai)] overflow-x-hidden min-h-screen flex flex-col">
      {["menu", "cart", "checkout"].includes(renderView) && <Navbar />}

      {/* Mobile Layout (Default) */}
      <main className="flex-1 w-full no-scrollbar lg:hidden">
        {renderView === "menu" && <MenuView />}
        {renderView === "cart" && <CartView />}
        {renderView === "checkout" && <CheckoutView />}
        {renderView === "receipt" && <ReceiptView />}
      </main>

      {/* Desktop Layout (lg and above) */}
      <main className="hidden lg:flex flex-1 w-full max-w-7xl mx-auto no-scrollbar pb-12">
        {renderView === "receipt" ? (
          <ReceiptView />
        ) : (
          <>
            {/* Left side: Menu */}
            <div className="flex-1 pr-8 border-r border-slate-200 dark:border-dark-border min-h-full">
              <MenuView />
            </div>
            {/* Right side: Cart or Checkout Panel */}
            <div className="w-[450px] pl-8 shrink-0">
              {renderView === "checkout" ? <CheckoutView isDesktop={true} /> : <CartView isDesktop={true} />}
            </div>
          </>
        )}
      </main>

      <FloatingCart />
    </div>
  );
}
