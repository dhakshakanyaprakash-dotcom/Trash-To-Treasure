export const INITIAL_ARTISANS = [
  {
    id: "artisan_1",
    displayName: "Ananya Sen",
    bio: "I am a third-generation clay artist based in Kumartuli. My craft focuses on reviving ancient terracotta molding techniques, blending them with minimalist contemporary forms. Every piece is shaped by hand using clay sourced from the banks of the Ganges, then sun-dried and wood-fired in a traditional kiln.",
    craftTypes: ["Pottery", "Ceramics"],
    location: "Kolkata, West Bengal",
    yearsExperience: 14,
    verificationTier: "master", // new, verified, master, heritage_keeper
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=600&fit=crop&q=80",
    payoutDetails: "GPay / UPI: ananyasen@oksbi",
    joinedDate: "2024-02-15"
  },
  {
    id: "artisan_2",
    displayName: "Kabir Khan",
    bio: "Specializing in handloom wool and linen weaving, I work from a small cooperative workshop in the hills of Himachal. I believe in preserving the rhythmic patience of the handloom, creating textiles that carry the breath of the weaver.",
    craftTypes: ["Weaving", "Textiles"],
    location: "Kullu, Himachal Pradesh",
    yearsExperience: 22,
    verificationTier: "heritage_keeper",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=600&fit=crop&q=80",
    payoutDetails: "UPI: kabirweaver@okaxis",
    joinedDate: "2023-11-10"
  },
  {
    id: "artisan_3",
    displayName: "Meera Dev",
    bio: "Working with native timber and hand tools, I craft wooden bowls, utensils, and boxes that celebrate the natural grain, knots, and imperfections of reclaimed teak and rosewood.",
    craftTypes: ["Woodwork", "Home Decor"],
    location: "Mysuru, Karnataka",
    yearsExperience: 8,
    verificationTier: "verified",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=600&fit=crop&q=80",
    payoutDetails: "UPI: meeracrafts@okicici",
    joinedDate: "2024-05-01"
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod_1",
    artisanId: "artisan_1",
    title: "Ganges Clay Terracotta Pitcher",
    description: "A hand-thrown pitcher crafted from raw, unglazed riverbed clay. Perfect for serving cool water or holding dry botanicals. Its porous wall allows the water to breathe and naturally cool itself, carrying the subtle, refreshing aroma of wet earth.",
    price: 1850,
    stock: 5,
    category: "Pottery",
    materials: ["Ganges Silt Clay", "Natural Oxide Stains"],
    timeToCreate: "3 days (throwing, sun-drying, and 12-hour wood firing)",
    craftTechnique: "Wheel-thrown, pit-fired terracotta",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop&q=80"
    ],
    isMadeToOrder: false,
    status: "active"
  },
  {
    id: "prod_2",
    artisanId: "artisan_1",
    title: "Minimalist Earth Ochre Bowl Set",
    description: "A pair of shallow ceramic bowls finished in a warm, textured iron ochre glaze. These bowls are double-fired to ensure durability while retaining a highly organic, sand-like surface texture on the exterior.",
    price: 2400,
    stock: 3,
    category: "Pottery",
    materials: ["Stoneware Clay", "Local Ochre Glaze"],
    timeToCreate: "5 days including glaze testing",
    craftTechnique: "Hand-pinched and slab-formed stoneware",
    images: [
      "https://images.unsplash.com/photo-1535401991746-da3d9055713e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=600&fit=crop&q=80"
    ],
    isMadeToOrder: false,
    status: "active"
  },
  {
    id: "prod_3",
    artisanId: "artisan_2",
    title: "Indigo Herringbone Linen Throw",
    description: "Woven in the traditional herringbone pattern, this versatile linen and merino wool throw is naturally dyed using local Himalayan wild indigo. The edges are finished with hand-knotted fringe detailing.",
    price: 4200,
    stock: 2,
    category: "Weaving",
    materials: ["Organic Linen Yarn", "Himalayan Merino Wool", "Natural Indigo dye"],
    timeToCreate: "14 hours on a manual 4-shaft countermarch loom",
    craftTechnique: "Handloom shuttle-weaving",
    images: [
      "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop&q=80"
    ],
    isMadeToOrder: true,
    status: "active"
  },
  {
    id: "prod_4",
    artisanId: "artisan_3",
    title: "Reclaimed Rosewood Live-Edge Tray",
    description: "Carved from solid slabs of reclaimed Southern Indian rosewood, this tray retains the raw, organic live edge on one side. The surface is polished with pure, food-safe beeswax and walnut oil to accentuate the dark, deep grain.",
    price: 3100,
    stock: 4,
    category: "Woodwork",
    materials: ["Reclaimed Rosewood", "Natural Beeswax", "Walnut Oil"],
    timeToCreate: "1.5 days of hand carving and fine sanding",
    craftTechnique: "Gouge-carving and hand-planing",
    images: [
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop&q=80"
    ],
    isMadeToOrder: false,
    status: "active"
  }
];

export const INITIAL_POSTS = [
  {
    id: "post_1",
    artisanId: "artisan_1",
    type: "making_diary", // photo, video, making_diary
    media: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop&q=80"
    ],
    caption: "Working on the new summer terracotta collection. Clay prep is where the soul of the pottery lies.",
    craftStory: "Today I am preparing a special silt blend. Silt clay is rich in iron minerals, giving our terracotta its characteristic fiery red tone. After mixing, the clay is left to age for three days, enhancing its elasticity so it can withstand high centrifugal force on the wheel.",
    linkedProductId: "prod_1",
    createdAt: "2026-08-14T09:30:00Z",
    likesCount: 142,
    savesCount: 38,
    comments: [
      { id: "c1", userName: "Aravind K.", text: "The color is absolutely gorgeous, can't wait to see the finished pitchers!", createdAt: "2026-08-14T10:15:00Z" },
      { id: "c2", userName: "Elena Rostova", text: "Do you offer international shipping for these?", createdAt: "2026-08-14T12:00:00Z" }
    ],
    // Making Diary Day entries
    diaryEntries: [
      {
        dayNumber: 1,
        title: "Clay Preparation & Wedging",
        media: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=450&fit=crop&q=80",
        caption: "Removing air pockets from the wet silt clay through a circular wedging pattern. The consistency needs to feel like stiff bread dough."
      },
      {
        dayNumber: 2,
        title: "Centering & Throwing",
        media: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=450&fit=crop&q=80",
        caption: "Pulling the clay upwards on the kick-wheel. Centering takes years of muscle memory; even a millimeter of offset can cause collapse."
      },
      {
        dayNumber: 3,
        title: "Trim & Firing",
        media: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&h=450&fit=crop&q=80",
        caption: "Entering the wood-fired kiln. We keep it burning at 950°C for 12 hours straight using oak wood shavings."
      }
    ]
  },
  {
    id: "post_2",
    artisanId: "artisan_2",
    type: "photo",
    media: ["https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&h=600&fit=crop&q=80"],
    caption: "Setting up the warp for the Indigo Herringbone throws. 480 individual threads aligned by eye.",
    craftStory: "Warping is the most meditative part of weaving. Each thread of unbleached linen must be threaded through its specific heddle in the harness. One single error here would ruin the diagonal symmetry of the herringbone weave.",
    linkedProductId: "prod_3",
    createdAt: "2026-08-15T11:00:00Z",
    likesCount: 95,
    savesCount: 22,
    comments: [
      { id: "c3", userName: "Priya S.", text: "The dedication is mindblowing. Buying this isn't just buying fabric, it's art.", createdAt: "2026-08-15T11:45:00Z" }
    ]
  },
  {
    id: "post_3",
    artisanId: "artisan_3",
    type: "photo",
    media: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop&q=80"],
    caption: "Rescued this beautiful chunk of dark rosewood from an old dismantled door frame. Ready to shape it into something useful.",
    craftStory: "Older wood holds incredible density and stability. This piece is nearly 70 years old. Working it releases an intense sweet floral aroma. I will be carving a live-edge table tray from this piece.",
    linkedProductId: "prod_4",
    createdAt: "2026-08-16T14:20:00Z",
    likesCount: 188,
    savesCount: 54,
    comments: []
  }
];

export const INITIAL_ORDERS = [
  {
    id: "order_1",
    customerId: "cust_1",
    artisanId: "artisan_1",
    productId: "prod_1",
    quantity: 1,
    price: 1850,
    customizationNotes: "No customization requested.",
    status: "delivered", // placed, confirmed, shipped, delivered, cancelled
    shippingAddress: {
      name: "Aarav Sharma",
      street: "12, Kasturba Gandhi Marg",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      phone: "+91 98765 43210"
    },
    paymentStatus: "paid",
    createdAt: "2026-08-10T10:00:00Z"
  },
  {
    id: "order_2",
    customerId: "cust_1",
    artisanId: "artisan_3",
    productId: "prod_4",
    quantity: 1,
    price: 3100,
    customizationNotes: "Please select a tray piece with heavy grain patterns.",
    status: "placed",
    shippingAddress: {
      name: "Aarav Sharma",
      street: "12, Kasturba Gandhi Marg",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      phone: "+91 98765 43210"
    },
    paymentStatus: "paid",
    createdAt: "2026-08-16T17:30:00Z"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev_1",
    orderId: "order_1",
    customerId: "cust_1",
    artisanId: "artisan_1",
    productId: "prod_1",
    rating: 5,
    text: "The pitcher is incredible! Water stays delightfully cool in it and it has a faint fragrance of earth that makes drinking water a beautiful sensory experience. Highly recommend Ananya's art.",
    createdAt: "2026-08-13T12:00:00Z",
    images: ["https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=200&h=200&fit=crop&q=80"]
  }
];
