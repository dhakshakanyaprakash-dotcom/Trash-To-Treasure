<div align="center">

# ♻️ T2T - Trash to Treasure

### Turning Waste into Creativity

**A web-based upcycling platform where reclaimed materials become handcrafted treasures, and every creation comes with its story.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2F5D3A?style=for-the-badge)](https://trash-to-treasure.vercel.app/)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

*Transform Waste. Create Treasure.*

[Live Demo](https://trash-to-treasure.vercel.app/) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---



---

##  About the Project

**Trash to Treasure (T2T)** is an upcycling social-commerce platform that connects creators, learners and conscious buyers. Creators publish what they made from waste, learners discover and recreate those ideas at home, and buyers support local makers directly.

> **Simple concept:** Waste Material → New Creation → Shared Journey.
> *Giving waste a second life.*

## The Problem

| Problem | What it means |
|---|---|
| ♻️ **Reusable materials are discarded** | Valuable resources are thrown away daily. Tamil Nadu alone generates 17,843+ (per day) of waste. |
|  **Creative reuse is under-used** | Upcycling ideas exist but are scattered and not widely practised in communities. |
|  **Creators lack visibility** | Local talent has no dedicated platform to showcase and sell their work. |

**The question:** *Can waste become something valuable?*

##  Our Solution

T2T gives every creation a structured story:

| Step | Question it answers |
|---|---|
|  **Material** | What waste was used? |
|  **Idea** | What inspired the creation? |
|  **Process** | How was it made? |
|  **Result** | What did it become? |

*Example: Plastic Bottle → DIY Process → Decorative Lamp*

The platform is built around five actions: **Reuse · Create · Share · Inspire · Sell**.

##  Key Features

-  **Explore** creations from makers around you, with search and filters by material and category
-  **Learn** the journey behind each piece through the Material, Idea, Process, Result story
-  **Try** your own version at home using step-by-step guides
-  **Buy** products and support the creator directly
-  **Connect** with likes, comments and follows
-  **Creator dashboard** to publish projects, manage products and receive orders
-  **Admin panel** to moderate users, content and products and to view reports
-  Secure authentication with JWT and role-based access control
-  Responsive design for mobile, tablet and desktop

**User journey:** `Explore → Learn → Try → Buy`

## 👥 User Roles

| Role | Capabilities |
|---|---|
|  **User** | Explore, learn, like / comment, follow creators, buy products |
|  **Creator** | Create projects, share the journey, manage products, receive orders |
|  **Admin** | Manage users, content, products and reports |

##  Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML, CSS, JavaScript, React |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose) / MySQL |
| **Auth & Security** | JWT, bcrypt, express-validator, CORS |
| **File Uploads** | Multer |
| **Deployment** | Vercel (frontend) |

## 🏗️ System Architecture

```
┌──────────────────────────────────────────┐
│  Browser  (Desktop / Tablet / Mobile)    │
└───────────────────┬──────────────────────┘
                    │  HTTPS / JSON
┌───────────────────▼──────────────────────┐
│  Presentation Layer  ·  React            │
└───────────────────┬──────────────────────┘
                    │  REST API
┌───────────────────▼──────────────────────┐
│  Application Layer  ·  Node + Express    │
│  JWT auth · Role guard · Business logic  │
└─────────┬─────────────────────┬──────────┘
          │                     │
┌─────────▼─────────┐  ┌────────▼─────────┐
│  MongoDB          │  │  File Storage    │
│  (Mongoose ODM)   │  │  (Image uploads) │
└───────────────────┘  └──────────────────┘
```

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Git](https://git-scm.com/)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### Run in development

```bash
# Terminal 1: start the API (http://localhost:5000)
cd server
npm run dev

# Terminal 2: start the React app (http://localhost:3000)
cd client
npm start
```

### Production build

```bash
cd client
npm run build
```

## 🔐 Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/trash-to-treasure
JWT_SECRET=replace_with_a_long_random_string
CLIENT_URL=http://localhost:3000
```

And, if needed, inside `client/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files. Make sure `.env` is listed in `.gitignore`.

## 📁 Project Structure

> Adjust this section to match your actual folders.

```
trash-to-treasure/
├── client/                  # React front end
│   └── src/
│       ├── components/      # ProjectCard, CommentBox, Navbar, SplashScreen ...
│       ├── pages/           # Home, Explore, ProjectDetail, Dashboard ...
│       └── context/         # AuthContext
├── server/                  # Node + Express back end
│   ├── models/              # User, Project, Product, Order, Comment
│   ├── routes/              # auth, projects, products, orders, admin
│   ├── middleware/          # auth, role, upload, errorHandler
│   └── server.js
├── docs/                    # Project report and diagrams
└── README.md
```

## 🔌 API Overview

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create an account |
| POST | `/api/auth/login` | Public | Log in and receive a token |
| GET | `/api/projects` | Public | List and search projects |
| GET | `/api/projects/:id` | Public | View a project story |
| POST | `/api/projects` | Creator, Admin | Create a project |
| POST | `/api/projects/:id/like` | Logged in | Like or unlike |
| POST | `/api/projects/:id/comments` | Logged in | Add a comment |
| GET | `/api/products` | Public | List approved products |
| POST | `/api/orders` | Logged in | Place an order |
| PATCH | `/api/orders/:id/status` | Creator | Update order status |
| GET | `/api/admin/reports` | Admin | Summary reports |

## 🗺️ Roadmap

- [x] User, Creator and Admin modules
- [x] Project stories (Material, Idea, Process, Result)
- [x] Product listing and ordering
- [x] Likes, comments and follows
- [ ]  **AI-Powered Waste Scanner**: a smart craft recommender based on the type of waste in a photo
- [ ]  **Gamification & Eco-Impact Points**: reward sustainable creativity
- [ ]  Online payment gateway (UPI / cards)
- [ ]  Delivery partner integration
- [ ]  Multilingual support (including Tamil)
- [ ]  Native mobile app

##  Impact

| Dimension | Outcome |
|---|---|
|  **Environmental** | More reuse, less waste |
|  **Creative** | More ideas, more skills |
|  **Social** | Creators, learners and community |
|  **Economic** | Create, showcase and sell |

##  Contributing

Contributions, issues and feature requests are welcome.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👩‍💻 Author

**P. Dhakshakanya**
B.Sc. Computer Technology, Nandha Arts and Science College (Autonomous), Erode
Affiliated to Bharathiar University, Coimbatore

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">

*"Don't see waste as garbage. See it as a possibility."*

**Trash to Treasure** · Transform Waste. Create Treasure. ♻️

</div>
