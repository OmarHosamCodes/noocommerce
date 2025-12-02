# Project UI Structure & Pages

This document outlines the detailed UI structure for every page in the application.

## Global Layout
Applied to all pages via `src/app/layout.tsx`.
- **TopLoader**: Progress bar for navigation.
- **Header**: Main site header.
- **DesktopNavbar**: Navigation menu for desktop.
- **Main Content**: The specific page content.
- **MobileBottomNav**: Bottom navigation for mobile devices.
- **Footer**: Site footer.
- **Toaster**: Notification toast container (Sonner).

---

## Pages

### 1. Home Page
**Route**: `/` (`src/app/page.tsx`)
- **Hero**: Main banner/hero section.
- **CategorySliderClient**: Horizontal slider of product categories.
- **ProductsGalleryClient** ("New Arrivals"): Grid of new products.
- **ProductsGalleryClient** ("Best Sellings"): Grid of best-selling products.

### 2. Shop Page
**Route**: `/shop` (`src/app/(pages)/shop/page.tsx`)
- **Breadcrumb**: Navigation path (Home > Shop).
- **Layout**: Grid with Sidebar and Main Content.
    - **Sidebar**: `FilterShop` component (Categories, Price Range, etc.).
    - **Main Content**:
        - **Top Bar**:
            - `MobileFilterMenu`: Filter trigger for mobile.
            - Product Count: "Showing X of Y products".
            - Sort By: Dropdown (`Select`) for sorting (Default, Price, Newest).
        - **Product Grid**:
            - Displays `ProductCard` (Simple) or `VariableProductCard` (Variable).
            - Loading State: `ProductGridSkeleton`.
            - Error State: Error message.
            - Empty State: "No products found".
        - **Pagination**: Page navigation controls.

### 3. Product Page
**Route**: `/products/[slug]` (`src/app/(pages)/products/[slug]/page.tsx`)
- **Breadcrumb**: Navigation path (Home > Shop > Product Name).
- **Product View**:
    - **Simple Product**: `SimpleProductView` (Image, Title, Price, Add to Cart).
    - **Variable Product**: `VariableProductView` (Image, Title, Price, Variant Selection, Add to Cart).
- **Product Description**: Detailed description section (`ProductDescription`).

### 4. Cart / Checkout
**Route**: `/checkout` (`src/app/(pages)/checkout/page.tsx`)
- **Breadcrumb**: Navigation path (Home > Checkout).
- **Checkout Form**:
    - **Shipping Details** (Left Column):
        - First Name, Last Name
        - Email Address
        - Address, Country, ZIP/Postal Code
        - Phone Number
    - **Payment Method**:
        - Radio Group selection (currently "Cash on Delivery").
    - **Order Summary** (Right Column):
        - List of items (Image, Name, Variant, Price).
        - Subtotal.
        - Shipping Cost.
        - **Total**.
        - **Place Order Button**.

### 5. Order Success
**Route**: `/order-success` (`src/app/(pages)/order-success/page.tsx`)
- **Success Icon**: Large check circle.
- **Heading**: "Order Placed Successfully!".
- **Message**: Confirmation message.
- **Button**: "Back to Home".

### 6. Order Details
**Route**: `/order-details/[id]` (`src/app/(pages)/order-details/[id]/page.tsx`)
- **Back Button**: "← Back to Profile".
- **Order Header**:
    - Order Number.
    - Status Badge (Color-coded: Completed, Processing, Pending, etc.).
    - Date & Time.
- **Order Info**:
    - Payment Method.
    - Order Total.
- **Order Items**:
    - List of items with metadata (variations) and prices.
- **Order Totals**:
    - Subtotal, Shipping, Tax, Total.
- **Addresses**:
    - Billing Address details.
    - Shipping Address details.

### 7. Profile
**Route**: `/profile` (`src/app/(pages)/profile/page.tsx`)
- **Tabs**:
    - **Profile**:
        - Personal Information Form (First Name, Last Name, Email, Username).
        - "Edit Profile" / "Save Changes" buttons.
    - **Addresses**: `AddressManager` component.
    - **Orders**: `OrdersList` component.
    - **Reviews**: `ReviewsList` component.

### 8. Login
**Route**: `/login` (`src/app/(pages)/login/page.tsx`)
- **LoginForm**: Email/Username and Password fields, Login button.

### 9. Register
**Route**: `/register` (`src/app/(pages)/register/page.tsx`)
- **RegisterForm**: Registration fields, Sign Up button.

### 10. Info Pages (Dynamic)
**Route**: `/[slug]` (`src/app/(infoPage)/[slug]/page.tsx`)
- **Breadcrumb**: Navigation path (Home > Page Title).
- **Content**:
    - Page Title.
    - Page Description/Content.
- **404 State**: "Page Not Found" message if slug doesn't exist.
