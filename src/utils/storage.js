import { 
  INITIAL_ARTISANS, 
  INITIAL_PRODUCTS, 
  INITIAL_POSTS, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS 
} from '../data/mockData';

const KEYS = {
  ARTISANS: 'origins_artisans',
  PRODUCTS: 'origins_products',
  POSTS: 'origins_posts',
  ORDERS: 'origins_orders',
  REVIEWS: 'origins_reviews',
  CURRENT_USER: 'origins_current_user',
  FOLLOWS: 'origins_follows',
  CART: 'origins_cart'
};

// Initialize Storage with mock data if empty
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.ARTISANS)) {
    localStorage.setItem(KEYS.ARTISANS, JSON.stringify(INITIAL_ARTISANS));
  }
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.POSTS)) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
  if (!localStorage.getItem(KEYS.FOLLOWS)) {
    // Seed initial follow: default customer following artisan_1
    localStorage.setItem(KEYS.FOLLOWS, JSON.stringify([
      { followerId: 'cust_1', followingId: 'artisan_1' }
    ]));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    // Default logged in user is a customer 'cust_1'
    const defaultUser = {
      id: 'cust_1',
      role: 'customer', // customer, artisan
      name: 'Madhav Sharma',
      email: 'madhav@origins.co',
      preferences: ['Pottery', 'Weaving'],
      addresses: [
        {
          id: 'addr_1',
          name: 'Madhav Sharma',
          street: '12, Kasturba Gandhi Marg',
          city: 'New Delhi',
          state: 'Delhi',
          zipCode: '110001',
          phone: '+91 98765 43210',
          isDefault: true
        }
      ]
    };
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(defaultUser));
  }
  if (!localStorage.getItem(KEYS.CART)) {
    localStorage.setItem(KEYS.CART, JSON.stringify([]));
  }
};

// Generic Getter / Setter
const get = (key) => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error('Error reading localStorage key', key, e);
    return [];
  }
};

const set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// API Helpers
export const storage = {
  getArtisans: () => get(KEYS.ARTISANS),
  saveArtisan: (artisan) => {
    const artisans = get(KEYS.ARTISANS);
    const index = artisans.findIndex(a => a.id === artisan.id);
    if (index >= 0) {
      artisans[index] = { ...artisans[index], ...artisan };
    } else {
      artisans.push(artisan);
    }
    set(KEYS.ARTISANS, artisans);
    return artisan;
  },

  getProducts: () => get(KEYS.PRODUCTS),
  saveProduct: (product) => {
    const products = get(KEYS.PRODUCTS);
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...products[index], ...product };
    } else {
      products.push(product);
    }
    set(KEYS.PRODUCTS, products);
    return product;
  },

  getPosts: () => get(KEYS.POSTS),
  savePost: (post) => {
    const posts = get(KEYS.POSTS);
    const index = posts.findIndex(p => p.id === post.id);
    if (index >= 0) {
      posts[index] = { ...posts[index], ...post };
    } else {
      posts.unshift(post); // New posts first
    }
    set(KEYS.POSTS, posts);
    return post;
  },

  getOrders: () => get(KEYS.ORDERS),
  saveOrder: (order) => {
    const orders = get(KEYS.ORDERS);
    const index = orders.findIndex(o => o.id === order.id);
    if (index >= 0) {
      orders[index] = { ...orders[index], ...order };
    } else {
      orders.unshift(order);
    }
    set(KEYS.ORDERS, orders);
    return order;
  },

  getReviews: () => get(KEYS.REVIEWS),
  saveReview: (review) => {
    const reviews = get(KEYS.REVIEWS);
    reviews.unshift(review);
    set(KEYS.REVIEWS, reviews);
    return review;
  },

  getCurrentUser: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
    } catch (e) {
      return null;
    }
  },
  saveCurrentUser: (user) => {
    set(KEYS.CURRENT_USER, user);
    // If the role is artisan, ensure they have an artisan profile in our list
    if (user.role === 'artisan') {
      const artisans = get(KEYS.ARTISANS);
      const exists = artisans.some(a => a.id === user.id);
      if (!exists) {
        const newArtisanProfile = {
          id: user.id,
          displayName: user.name,
          bio: user.bio || 'Co-creating natural products with ancient traditions.',
          craftTypes: user.craftTypes || ['Other'],
          location: user.location || 'India',
          yearsExperience: user.yearsExperience || 0,
          verificationTier: 'new',
          profilePhoto: user.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
          coverPhoto: 'https://images.unsplash.com/photo-1595273670150-db0d3bf3b765?w=1200&h=400&fit=crop&q=80',
          joinedDate: new Date().toISOString().split('T')[0]
        };
        artisans.push(newArtisanProfile);
        set(KEYS.ARTISANS, artisans);
      }
    }
    return user;
  },

  getFollows: () => get(KEYS.FOLLOWS),
  toggleFollow: (followerId, followingId) => {
    const follows = get(KEYS.FOLLOWS);
    const index = follows.findIndex(f => f.followerId === followerId && f.followingId === followingId);
    if (index >= 0) {
      follows.splice(index, 1); // unfollow
      set(KEYS.FOLLOWS, follows);
      return false; // followed is now false
    } else {
      follows.push({ followerId, followingId }); // follow
      set(KEYS.FOLLOWS, follows);
      return true; // followed is now true
    }
  },

  getCart: () => get(KEYS.CART),
  setCart: (cart) => {
    set(KEYS.CART, cart);
  },
  
  clearAll: () => {
    localStorage.removeItem(KEYS.ARTISANS);
    localStorage.removeItem(KEYS.PRODUCTS);
    localStorage.removeItem(KEYS.POSTS);
    localStorage.removeItem(KEYS.ORDERS);
    localStorage.removeItem(KEYS.REVIEWS);
    localStorage.removeItem(KEYS.CURRENT_USER);
    localStorage.removeItem(KEYS.FOLLOWS);
    localStorage.removeItem(KEYS.CART);
    initStorage();
  }
};
