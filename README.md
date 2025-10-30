# 🍽️ DineQR — Complete Smart Restaurant Management System (Frontend + Backend)

**DineQR** is a full-stack restaurant management and ordering system designed to make dining faster, contactless, and smarter — using **QR-based menus**, **real-time tracking**, **OTP authentication**, and **instant notifications**.

Built with **React + TypeScript (Frontend)** and **Node.js + Express + TypeScript + MongoDB (Backend)**, DineQR connects **Guests, Staff, and Managers** seamlessly with **WebSocket-powered live updates**, **secure payments**, and **beautiful image handling with BlurHash**.

---

## 🚀 Key Highlights

- 📱 **QR Code Ordering** — Contactless menu ordering via table QR.
- ⚡ **Real-time Updates** — Powered by Socket.IO for instant synchronization.
- 🔐 **Mobile Number + OTP Login** — Simplified and secure user authentication.
- 💬 **Live Notifications** — Guests and Staff receive real-time messages on every order change.
- ✉️ **Live Email Updates** — Transactional emails sent via SendGrid on order status or payment events.
- 💳 **Online / Offline Payments** — Supports payment gateway integration (Razorpay, Stripe).
- 🌄 **BlurHash Image Optimization** — Beautiful image placeholders before full load.
- 🧠 **Session Storage + LocalForage** — Persistent and reliable client-side caching.
- 👥 **Multi-Role System** — Manager, Staff, and Guest with role-based dashboards.
- 🧾 **Menu & Kitchen Management** — Full control of dishes, availability, and status.
- ☁️ **Fully Deployed Setup** — Frontend (Netlify), Backend (Render), and DNS (Cloudflare).
- 💬 **Socket.IO Events** — Bi-directional data flow between all users.
- 🧩 **TypeScript Codebase** — Frontend & Backend with full type safety and modular design.

---

## 🧭 Real-World Workflow Overview

DineQR works through **three interconnected roles**, all communicating in real-time.

### 👤 Guest (Customer)
1. Scans the **table QR code**.
2. Opens the **menu** directly in browser:  
   👉 `https://dineqr.cfd/guest/login/<hotelKey>`
3. Logs in using **mobile number + OTP verification**.
4. Selects dishes, adds them to cart, and proceeds to checkout.
5. Chooses payment option:
   - 💳 **Online Payment** (via gateway)
   - 💵 **Pay Later / Cash**
6. Order confirmation triggers **live socket events** and **email notifications**.
7. Guest sees **real-time status** — *Preparing → Ready → Served*.
8. Can receive **in-app notifications** for updates or messages from staff.

---

### 👨‍🍳 Staff (Kitchen / Service)
1. Logs into **Staff Dashboard** using credentials or OTP.
2. Instantly sees **new orders** via WebSocket.
3. Updates order progress:
   - Preparing → Ready → Served
4. Each update notifies the **Guest** and **Manager** instantly through:
   - 🔔 **Live in-app notification**
   - ✉️ **Email trigger (optional)**
5. Can manage tables and update dish availability.

---

### 👨‍💼 Manager (Admin / Owner)
1. Monitors **all live orders**, staff performance, and revenues.
2. Manages staff accounts, menu items, and prices.
3. Tracks **online payments**, **refunds**, and **daily revenue summaries**.
4. Receives **real-time alerts** when new orders are placed or completed.
5. Can send **custom notifications or offers** to active guests.

---

## 🔄 Live Data Flow Diagram

```text
          ┌─────────────────────────────┐
          │     Guest Scans Table QR     │
          └──────────────┬───────────────┘
                         ↓
             ┌────────────────────────┐
             │ Opens Menu (React App) │
             └────────────┬───────────┘
                         ↓
           ┌────────────────────────────┐
           │ Mobile Number + OTP Login  │
           └────────────┬───────────────┘
                         ↓
             ┌────────────────────────┐
             │  Adds Dishes to Cart   │
             └────────────┬───────────┘
                         ↓
             ┌────────────────────────┐
             │  Proceeds to Payment   │
             └────────────┬───────────┘
                         ↓
   ┌────────────────────────────────────────────────────┐
   │ (Option A) 💳 Pay Online via Payment Gateway       │
   │ (Option B) 💵 Pay Later / Cash on Delivery         │
   └────────────────────────────────────────────────────┘
                         ↓
      ┌────────────────────────────────────┐
      │ Order Confirmed → Sent to Backend  │
      │       (via API + WebSocket)        │
      └────────────────────┬───────────────┘
                           ↓
   ┌────────────────────────────────────────────────────┐
   │ Staff Dashboard: New Order Appears (Live Socket)   │
   └────────────────────┬───────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────────────┐
   │ Staff Updates Status → Preparing → Ready           │
   └────────────────────┬───────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────────────┐
   │ Guest App: Live Status Updated (Socket.IO Sync)    │
   └────────────────────┬───────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────────────┐
   │ Manager Panel: Tracks Revenue + Live Activity      │
   └────────────────────────────────────────────────────┘
