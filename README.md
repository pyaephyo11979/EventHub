# BLACKPINK Ticket Selling App 🖤💖

A Laravel React Inertia.js application for selling BLACKPINK concert tickets with a stunning K-pop themed design.

## Features

### Public Features

- **Event Listings**: Browse upcoming BLACKPINK concerts worldwide
- **Animated Landing Page**: Stunning homepage with smooth animations and rotating hero images
- **Event Listings**: Browse and filter upcoming BLACKPINK concerts worldwide
- **Advanced Search**: Filter events by city, search venues, and sort by date/price
- **Ticket Purchasing**: Secure ticket ordering system
- **Order Management**: View order confirmations and ticket details
- **BLACKPINK Theme**: Beautiful pink and black gradient design throughout
- **Themed Authentication**: Login, register, and password reset pages with BLACKPINK styling
- **Smooth Animations**: Fade-in effects, hover animations, and interactive elements
- **Responsive Design**: Works perfectly on desktop and mobile

### Admin Features

- **Admin Dashboard**: Comprehensive overview with statistics and analytics
- **Event Management**: Create, edit, and manage concert events
- **Order Management**: View, update, and manage customer orders
- **User Management**: Manage system users and administrators
- **Role-based Access**: Secure admin-only areas with middleware protection

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite (easily configurable to other databases)
- **Build Tool**: Vite

## Installation

1. **Clone and install dependencies**:

    ```bash
    composer install
    npm install
    ```

2. **Set up environment**:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

3. **Run migrations and seed data**:

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

4. **Build assets**:

    ```bash
    npm run build
    # or for development
    npm run dev
    ```

5. **Start the server**:
    ```bash
    php artisan serve
    ```

## Sample Events

The app comes pre-seeded with 5 BLACKPINK concert events:

- **Seoul** - KSPO Dome ($150)
- **Los Angeles** - Crypto.com Arena ($180)
- **London** - The O2 Arena ($165)
- **Tokyo** - Tokyo Dome ($170)
- **Sydney** - Qudos Bank Arena ($175)

## Usage

### Public Users

1. **Browse Events**: Visit the homepage to see all upcoming BLACKPINK concerts
2. **View Event Details**: Click on any event to see detailed information
3. **Purchase Tickets**: Click "Buy Tickets Now" and fill in your information
4. **Order Confirmation**: Receive your order confirmation with ticket codes

### Admin Access

The application comes with pre-seeded admin and user accounts:

**Admin Account:**

- Email: `admin@blackpink.com`
- Password: `password`
- Access: Full admin dashboard with event, order, and user management

**Test User Account:**

- Email: `test@example.com`
- Password: `password`
- Access: Regular user dashboard

**Admin Features:**

1. **Dashboard**: View comprehensive statistics and recent activity
2. **Event Management**: Create, edit, delete, and manage concert events
3. **Order Management**: View, update status, and manage customer orders
4. **User Management**: Create, edit, delete users and manage roles

## Database Schema

### Events

- Event details (title, description, venue, date, price)
- Ticket availability tracking

### Tickets

- Individual ticket records with unique codes
- Seat assignments (section, row, number)
- Status tracking (available, sold, reserved)

### Orders

- Customer information
- Order tracking with unique order numbers
- Payment status and expiration

## Design Features

- **BLACKPINK Color Scheme**: Pink gradients on black backgrounds
- **Concert Atmosphere**: Dark theme with neon pink accents
- **K-pop Aesthetic**: Modern, sleek design inspired by BLACKPINK's visual identity
- **Responsive Layout**: Mobile-first design that works on all devices

## Development

```bash
# Start development server with hot reload
npm run dev

# Run Laravel server
php artisan serve

# Run both simultaneously
composer run dev
```

## Contributing

This is a demo application showcasing Laravel + React + Inertia.js with a BLACKPINK theme. Feel free to use it as a starting point for your own ticket selling applications!

---

**Note**: This is a demonstration app. For production use, implement proper payment processing, authentication, and security measures.
