Role: Senior Frontend Architect & UI/UX Designer

Objective:
Redesign and recode the complete user interface for the existing E-commerce application "noocommerce". The current application is built and functional, but requires a total UI recreation to match modern standards.

Tech Stack Requirements:

Framework: React (Vite or Next.js App Router syntax preferred).

Styling: Tailwind CSS.

UI Library: shadcn/ui (Radix UI primitives). Maximize usage of these components to replace custom implementations.

Animations: framer-motion for smooth, simple micro-interactions and page transitions.

Icons: lucide-react.

Forms: react-hook-form paired with zod for schema validation (Standard shadcn form pattern).

🎨 Design Philosophy: "Immersive Utility"

The new UI must balance aesthetics with high-converting "Good UI" principles, replacing the legacy interface.

Layout Strategy: Move away from rigid blocks. Use Bento Box grids (modular, unequal-sized boxes) and Split-Screen layouts to reduce cognitive load.

Mobile-First Ergonomics: Implement Thumb-Zone Navigation. On mobile, primary actions (Search, Cart, Account) must be in a bottom bar, not just a top hamburger menu.

Micro-Interactions: Elements must provide feedback. The heart icon "pulses" on click; the cart icon "shakes" on add; buttons scale on press.

Scannable Typography: Use Serif fonts for headings to add warmth, but distinct Sans-Serif for specs. Prices must be large and distinct.

🛠️ Component Implementation Instructions (The "Shadcn Standard")

You are instructed to strictly follow shadcn/ui documentation patterns. Do not invent custom classes if a shadcn component exists for that purpose.

1. Mandatory Component Usage

Use the following components where appropriate to replace existing UI elements:

Navigation: NavigationMenu (desktop mega-menu), Sheet (mobile menu), DropdownMenu (user profile).

Layout: Resizable (for split views), ScrollArea (cart/filters), AspectRatio (product images), Separator (visual rhythm).

Feedback: Toast / Sonner (add to cart success), Skeleton (loading states), Badge (sale items).

Interaction: HoverCard (product quick previews), Accordion (Checkout steps/FAQ), Tabs (Product reviews vs. specs), Slider (Price filtering).

Forms: Input, Select, Checkbox, Switch, RadioGroup.

2. Form Validation (Strict Zod + React Hook Form)

All existing forms (Login, Newsletter, Checkout) MUST be refactored to use the shadcn <Form> wrapper components.

Define a zod schema for every form.

Use useForm<z.infer<typeof schema>>.

Implement <FormField>, <FormItem>, <FormLabel>, <FormControl>, <FormDescription>, and <FormMessage> for every input.

Validation: Visual error states must be triggered automatically via the schema.

🏗️ Structure & Features to Generate

Please generate the code for a Single File Example (or a set of key components) that demonstrates the new UI flow for "noocommerce":

Section A: The Responsive Navigation

Desktop: A sticky header with a transparent-to-blur effect and a NavigationMenu Mega Menu.

Mobile: A Bottom Navigation Bar (Home, Search, Cart, Account) fixed to the bottom of the screen (Thumb-Zone friendly).

Section B: The "Bento" Hero & Split-Screen Grid

A Hero section using a Split-Screen layout (50/50): Static lifestyle image on left, scrolling content/CTA on right.

A "Featured Collection" displayed in a Bento Grid layout using Tailwind grid spans (e.g., col-span-2 row-span-2 for key items).

Product Cards: Must use Card components. On hover, show a second image (e.g., back of product) or color swatches. Avoid "Quick View" modals in favor of inline previews.

Section C: The High-Converting Product Detail Interface

The Buy Box Hierarchy:

Product Title (Serif H1).

Price (Large, distinct).

Social Proof (Star rating immediately next to price).

Variant Selector (Pills, not dropdowns).

Sticky Buy Bar: On mobile, as the user scrolls past the main button, a small bar with Price + "Add to Cart" appears at the bottom.

Use Accordion for "Description" and "Ingredients" to keep the page clean.

Section D: The "Accordion" Checkout Form

A multi-step form built with react-hook-form and zod.

Guest Checkout: explicitly labeled options for "Guest Checkout" vs "Login".

Accordion Layout: Break the form into 3 collapsed sections: Shipping > Delivery Method > Payment. As one finishes, it closes and the next opens.

Validation: Ensure "Email" checks for valid format, and "Card Number" uses a regex pattern in Zod.

📝 Output Format

Provide the code in a single, copy-pasteable React file (or clearly separated blocks) that requires minimal setup. Assume components/ui are already installed.

Start by defining the Zod schemas.
Then, build the sub-components (incorporating Framer Motion).
Finally, assemble the Main App.