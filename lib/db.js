import { connectToDatabase } from "./mongodb";
import Order from "../models/Order";

// HYBRID DB FALLBACK
let localOrders = [];
let localUsers = [];

// Hardcoded menu array for instant load times (as per blueprint)
export const MENU_ITEMS = [
  { _id: "1", img: "🍉", category: "Sides", name: { th: "แตงโมหั่นชิ้น", en: "Fresh Watermelon" }, price: 40, desc: { th: "หวานฉ่ำ ดับกระหาย", en: "Sweet & juicy" }, is_available: true },
  { _id: "2", img: "🥭", category: "Sides", name: { th: "มะม่วงน้ำปลาหวาน", en: "Mango & Sweet Sauce" }, price: 55, desc: { th: "เปรี้ยวอมหวาน เครื่องแน่น", en: "Sour with spicy dip" }, is_available: true },
  { _id: "3", img: "🍍", category: "Sides", name: { th: "สับปะรดภูแล", en: "Phulae Pineapple" }, price: 45, desc: { th: "กรอบ หวานอมเปรี้ยว", en: "Crispy & sweet" }, is_available: true },
  { _id: "4", img: "🍈", category: "Sides", name: { th: "แคนตาลูป", en: "Cantaloupe" }, price: 50, desc: { th: "หอมหวาน ชื่นใจ", en: "Aromatic & sweet" }, is_available: true },
  { _id: "5", img: "🍓", category: "Sides", name: { th: "สตรอว์เบอร์รีคลุกพริกเกลือ", en: "Strawberry with Dip" }, price: 65, desc: { th: "เปรี้ยวจี๊ดจ๊าด โดนใจ", en: "Sour & spicy" }, is_available: true },
  { _id: "6", img: "🍏", category: "Sides", name: { th: "ฝรั่งแช่บ๊วย", en: "Guava Plum" }, price: 40, desc: { th: "กรอบอร่อย คลุกผงบ๊วย", en: "Crispy with plum powder" }, is_available: true },
];

export async function createOrder(orderData) {
  try {
    await connectToDatabase();
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
  } catch (error) {
    console.warn("MongoDB Failed. Falling back to local memory DB.", error);
    const localOrder = { ...orderData, _id: Date.now().toString(), status: "Pending", created_at: new Date() };
    localOrders.push(localOrder);
    return localOrder;
  }
}

export async function getOrders() {
  try {
    await connectToDatabase();
    return await Order.find({}).sort({ created_at: -1 });
  } catch (error) {
    console.warn("MongoDB Failed. Fetching from local memory DB.");
    return localOrders;
  }
}
