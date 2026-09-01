export interface CartItem {
  id: string; // unique cart line id
  productId: string;
  name: string;
  categoryName: string;
  packSize: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}

export interface TrackingStep {
  step: string;
  location: string;
  timestamp: string;
  done: boolean;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: 'Order Placed' | 'Quality Inspection' | 'Dispatched' | 'In Transit' | 'Delivered';
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

const STORAGE_KEY_ORDERS = 'latatea_orders_v1';
const STORAGE_KEY_CART = 'latatea_cart_v1';

const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    orderId: 'LT-8842',
    createdAt: '2026-08-30T10:30:00Z',
    customerName: 'Aarav Singhania',
    email: 'aarav@singhaniahotels.com',
    phone: '+91 98200 12345',
    address: 'Grand Royale Hotel, Senapati Bapat Road',
    city: 'Pune',
    pincode: '411016',
    items: [
      {
        id: 'c1',
        productId: 'prod_gud_basundi',
        name: 'Gud Basundi Tea',
        categoryName: 'Gud Tea Range',
        packSize: '1kg Pack',
        unitPrice: 150.0,
        quantity: 10,
        imageUrl: '/assets/images/royal_tea_bowl.jpg'
      },
      {
        id: 'c2',
        productId: 'prod_masala_premix',
        name: 'Masala Tea Premix',
        categoryName: 'Vending Machine Premix',
        packSize: '1kg Pack',
        unitPrice: 170.0,
        quantity: 5,
        imageUrl: '/assets/images/royal_tea_bowl.jpg'
      }
    ],
    subtotal: 2350.0,
    gst: 117.5,
    shipping: 0.0,
    total: 2467.5,
    paymentMethod: 'UPI / NetBanking',
    status: 'In Transit',
    courierName: 'BlueDart Express Commercial',
    trackingNumber: 'BD-77391024IN',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    trackingSteps: [
      { step: 'Order Placed & Confirmed', location: 'LataTea Central Hub, Pune', timestamp: 'Aug 30, 10:30 AM', done: true },
      { step: 'ISO Cleanroom Batch Quality Check', location: 'Plant 2, Pune', timestamp: 'Aug 30, 02:15 PM', done: true },
      { step: 'Commercial Dispatch & Handover', location: 'BlueDart Hub, Pune', timestamp: 'Aug 31, 09:00 AM', done: true },
      { step: 'In Transit to Destination Facility', location: 'Express Cargo Terminal', timestamp: 'Sep 01, 06:45 AM', done: true },
      { step: 'Out for Delivery to Consignee', location: 'Senapati Bapat Road Branch', timestamp: 'Expected Sep 02', done: false }
    ]
  },
  {
    orderId: 'LT-1092',
    createdAt: '2026-08-28T14:10:00Z',
    customerName: 'Meera Deshmukh',
    email: 'meera.d@techcorp.in',
    phone: '+91 97654 32100',
    address: 'Tech Park Tower B, Hinjewadi Phase 1',
    city: 'Pune',
    pincode: '411057',
    items: [
      {
        id: 'c3',
        productId: 'prod_gud_elaichi_kadak_basundi',
        name: 'Gud Elaichi Kadak Basundi',
        categoryName: 'Gud Tea Range',
        packSize: '160g Pack',
        unitPrice: 29.5,
        quantity: 8,
        imageUrl: '/assets/images/royal_tea_bowl.jpg'
      }
    ],
    subtotal: 236.0,
    gst: 11.8,
    shipping: 40.0,
    total: 287.8,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    courierName: 'Delhivery Express',
    trackingNumber: 'DL-99182310',
    estimatedDelivery: 'Delivered on Aug 30',
    trackingSteps: [
      { step: 'Order Placed & Confirmed', location: 'LataTea Hub', timestamp: 'Aug 28, 02:10 PM', done: true },
      { step: 'Quality Inspection Passed', location: 'Pune Cleanroom', timestamp: 'Aug 28, 04:30 PM', done: true },
      { step: 'Dispatched via Courier', location: 'Pune Sorting Hub', timestamp: 'Aug 29, 10:00 AM', done: true },
      { step: 'In Transit', location: 'Hinjewadi Hub', timestamp: 'Aug 30, 08:30 AM', done: true },
      { step: 'Successfully Delivered', location: 'Recipient Handed', timestamp: 'Aug 30, 01:20 PM', done: true }
    ]
  }
];

export const orderStore = {
  getOrders(): OrderRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading orders:', e);
    }
    this.saveOrders(INITIAL_SAMPLE_ORDERS);
    return INITIAL_SAMPLE_ORDERS;
  },

  saveOrders(orders: OrderRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  },

  createOrder(orderData: Omit<OrderRecord, 'orderId' | 'createdAt' | 'status' | 'courierName' | 'trackingNumber' | 'estimatedDelivery' | 'trackingSteps'>): OrderRecord {
    const orders = this.getOrders();
    const orderId = `LT-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const estDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    const newOrder: OrderRecord = {
      ...orderData,
      orderId,
      createdAt: now.toISOString(),
      status: 'Order Placed',
      courierName: 'BlueDart Express Delivery',
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      estimatedDelivery: `Expected ${estDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      trackingSteps: [
        { step: 'Order Placed & Confirmed', location: 'LataTea Central Facility, Pune', timestamp: 'Just now', done: true },
        { step: 'Hygienic Fresh Batch Quality Inspection', location: 'Quality Lab, Pune', timestamp: 'Pending', done: false },
        { step: 'Packaged & Sealed in Tamper-Proof Pouch', location: 'Packaging Dept', timestamp: 'Pending', done: false },
        { step: 'Dispatched & Handed over to Express Courier', location: 'Logistics Center', timestamp: 'Pending', done: false },
        { step: 'Doorstep Delivery to Customer', location: `${orderData.city || 'Destination'}`, timestamp: `Expected ${estDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, done: false }
      ]
    };

    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    return newOrder;
  },

  findOrder(query: string): OrderRecord | null {
    if (!query.trim()) return null;
    const clean = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const orders = this.getOrders();

    return orders.find(o => {
      const idMatch = o.orderId.toLowerCase().replace(/[^a-z0-9]/g, '') === clean;
      const trackMatch = o.trackingNumber.toLowerCase().replace(/[^a-z0-9]/g, '') === clean;
      const phoneMatch = o.phone.replace(/[^0-9]/g, '').includes(clean);
      return idMatch || trackMatch || phoneMatch;
    }) || null;
  },

  // Cart operations
  getCart(): CartItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CART);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    return [];
  },

  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }
};
