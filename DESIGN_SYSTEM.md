# ShowTime Auth UI - Design System Documentation

## Overview

This document outlines the production-ready authentication UI design system for ShowTime, a modern movie ticket booking application. The design follows a cinematic, premium aesthetic inspired by Netflix and BookMyShow, with full light/dark mode support.

---

## Design Principles

### 1. **Mobile-First Responsive Design**
- All components are designed for mobile screens first
- Progressive enhancement for larger screens
- Touch-friendly sizing (minimum 44px for interactive elements)
- Flexible layouts using Tailwind's responsive prefixes

### 2. **Cinematic Theme**
- Premium, immersive aesthetic
- Gradient accents (red to darker red/purple)
- Subtle animations and transitions
- Dark mode as first-class citizen (not inverted light mode)
- Movie/cinema inspired visuals

### 3. **Accessibility**
- WCAG 2.1 AA compliant contrast ratios
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly labels
- Focus indicators for keyboard users
- Helper text for password requirements

### 4. **Visual Hierarchy**
- Clear distinction between primary and secondary actions
- Consistent typography scaling
- Strategic use of whitespace
- Icon usage to enhance understanding

---

## Color Palette

### Primary Colors
- **Red Gradient**: `from-red-600 to-red-700` - Primary action, cinematic feel
- **Dark Background**: `slate-950` (dark mode), `white` (light mode)

### Secondary Colors
- **Purple Gradient**: `from-purple-600 to-pink-600` - Secondary actions
- **Accent Gray**: Used for borders and dividers
  - Light: `gray-200`
  - Dark: `slate-700`

### Text Colors
- **Primary Text**:
  - Light: `gray-900`
  - Dark: `white`
- **Secondary Text**:
  - Light: `gray-600`
  - Dark: `gray-400`
- **Disabled**: `opacity-60` on both modes

### Status Colors
- **Error**: `red-600` / `red-500`
- **Success**: Inherited from primary gradient
- **Warning**: Can extend with amber colors

---

## Typography

### Font Family
- System stack (Tailwind default): -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.
- Ensures consistent rendering across platforms

### Font Sizes & Weights
- **Headings (h2)**:
  - Size: `text-3xl` (30px)
  - Weight: `font-black` (900)
  - Letter-spacing: `tracking-tight` for titles

- **Body Text**:
  - Size: `text-base` (16px)
  - Weight: `font-normal` (400)
  - Line-height: `leading-relaxed`

- **Labels**:
  - Size: `text-sm` (14px)
  - Weight: `font-semibold` (600)

- **Helper Text**:
  - Size: `text-sm` (14px)
  - Weight: `font-normal` (400)
  - Color: Secondary text color

### Line Height
- Headings: `leading-tight`
- Body: `leading-relaxed`
- Form labels: `leading-relaxed`

---

## Component Specifications

### FormInput Component
**Purpose**: Reusable text input for forms

**Features**:
- Optional label with semantic HTML
- Icon support (left-aligned)
- Error messaging
- Helper text
- Focus states with ring effect
- Dark mode support
- Disabled state styling
- 11px border-radius: `rounded-xl`

**States**:
1. **Default**: Gray border, light background
2. **Focus**: Red border, 4px ring with 20% opacity
3. **Error**: Red border, error message display
4. **Disabled**: Reduced opacity, cursor-not-allowed
5. **Hover**: Subtle border color change

**Padding**: `px-4 py-3` (12px padding)

### FormButton Component
**Purpose**: Reusable action button with multiple variants

**Variants**:
1. **Primary**: Red gradient (main actions)
   - Background: `from-red-600 to-red-700`
   - Hover: Darker shades
   - Shadow: `shadow-lg hover:shadow-xl`
   - Icon: Optional emoji/SVG

2. **Secondary**: Purple-to-Pink gradient
   - Background: `from-purple-600 to-pink-600`
   - For alternative actions

3. **Outline**: Bordered style
   - Border: 2px gray/slate
   - Transparent background
   - For tertiary actions

**Sizes**:
- `sm`: `px-4 py-2 text-sm`
- `md`: `px-6 py-3 text-base`
- `lg`: `px-8 py-4 text-lg`

**Features**:
- Loading spinner animation
- Disabled state
- Active scale effect (`active:scale-[0.98]`)
- Smooth transitions (300ms)
- Full-width option

### BrandLogo Component
**Purpose**: ShowTime branding with icon and text

**Features**:
- Responsive sizing (sm/md/lg)
- Optional text display
- Gradient icon background (red)
- Hover scale effect
- Dark mode aware color switching

**Sizes**:
- `sm`: 32px icon, text-xl
- `md`: 48px icon, text-2xl
- `lg`: 64px icon, text-3xl

### Divider Component
**Purpose**: Visual separator with optional label

**Features**:
- Gradient line effect
- Optional center text
- Symmetrical design
- Dark mode support

---

## Layout Structure

### Auth Layout
**Mobile View**:
1. Logo (centered, mb-8)
2. Form card with glassmorphism
3. Footer text
4. Full viewport height with safe spacing

**Desktop View** (hidden on md and below):
1. Left section (50% width):
   - Brand logo
   - Tagline
   - Feature list with icons
2. Right section (50% width):
   - Form card
   - Footer text

### Form Card Styling
**Glassmorphism Effect**:
- Background: `bg-white/80 dark:bg-slate-900/60`
- Backdrop blur: `backdrop-blur-xl`
- Border: `border border-white/20 dark:border-slate-700/30`
- Rounded: `rounded-2xl`
- Padding: `p-8 sm:p-10`
- Shadow: `shadow-2xl hover:shadow-3xl`

### Background Elements
**Animated Gradient Orbs** (non-interactive):
- Red orb: `-top-40 -right-40` with `blur-3xl`
- Purple orb: `-bottom-40 -left-40` with `blur-3xl`
- Pink orb: Center with `blur-3xl`
- Animation: `animate-pulse`

---

## Spacing System

### Vertical Spacing
- Form sections: `space-y-6` (24px)
- Form inputs: `space-y-6` or individual gaps
- Component groups: `space-y-4` (16px)
- Minimal gaps: `space-y-2` (8px)

### Horizontal Spacing
- Input padding: `px-4 py-3`
- Card padding: `p-8 sm:p-10` (32px, 40px)
- Section padding: `px-4 md:px-8` (16px, 32px)

### Gaps
- Form sections: `gap-2` to `gap-4`
- Grid columns: `gap-3` (12px)

---

## Animation & Transitions

### Transition Duration
- Standard: `duration-300` (300ms)
- Form interactions: `ease-out`
- Fade-in: `0.6s ease-out`

### Animations
1. **Fade In**: Used for page load and staggered elements
2. **Pulse**: Background orbs animate continuously
3. **Spin**: Loading spinner on buttons
4. **Scale**: Buttons on active state (`scale-[0.98]`)
5. **Hover Effects**: Shadows and color shifts

### Stagger Animation
- Multiple elements animate with delay
- Calculated as: `i * 100ms`

---

## Form Validation & Error Handling

### Validation Features
- Real-time validation feedback (on blur/input)
- Error message display below field
- Visual error indicators (red border, icon)
- Helper text for requirements
- Terms acceptance checkbox

### Password Requirements (Signup)
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Confirmation field match

### Email Validation
- Standard email format check
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

## Dark Mode Implementation

### Tailwind Configuration
- Uses `dark` class strategy (not media query)
- Toggled via `ThemeContext`
- Persisted in localStorage
- Falls back to system preference

### Dark Mode Classes
All interactive elements use `dark:` prefixes:
- Text: `dark:text-white`, `dark:text-gray-300`
- Background: `dark:bg-slate-900`, `dark:bg-slate-800`
- Borders: `dark:border-slate-700`
- Focus rings: `dark:ring-red-500/30`

### First-Class Dark Mode
Dark mode is NOT simply an inverted light mode:
- Separate color considerations for readability
- Adjusted opacity values
- Gradient adjustments
- Custom contrast levels

---

## Accessibility Checklist

- ✅ Semantic HTML (form, label, input elements)
- ✅ ARIA labels where needed
- ✅ Focus indicators (blue/red rings)
- ✅ Color contrast (4.5:1 for text)
- ✅ Min touch target: 44px (iOS), 48px (Android)
- ✅ Keyboard navigation support
- ✅ Loading states indicated
- ✅ Error messages associated with fields
- ✅ Helper text for password requirements
- ✅ Form submission protection (loading state)

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome 5+
- Requires CSS Grid and Flexbox support
- CSS custom properties not required (Tailwind)

---

## Usage Examples

### Using ThemeContext
```tsx
import { useTheme } from "../context/ThemeContext";

function Component() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
```

### Using Form Components
```tsx
<FormInput
  label="Email"
  type="email"
  name="email"
  placeholder="you@example.com"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  icon={<svg>...</svg>}
/>

<FormButton
  type="submit"
  variant="primary"
  isLoading={isLoading}
  icon="🎬"
>
  Login
</FormButton>
```

---

## Performance Considerations

- Zero CSS-in-JS overhead (Tailwind only)
- Minimal JavaScript for animations
- Optimized SVG icons (inline)
- Lazy loading for background elements
- Efficient re-renders with proper state management

---

## Future Enhancements

1. **Internationalization (i18n)**: Support multiple languages
2. **Biometric Login**: Fingerprint/Face ID integration
3. **Progressive Web App**: PWA capabilities
4. **Advanced Password Manager**: Auto-fill support
5. **Social Login Integration**: OAuth implementation
6. **Email Verification Flow**: OTP/Magic links
7. **Two-Factor Authentication**: 2FA setup
8. **Custom Theming**: User-selectable themes

---

## Files Overview

### Component Files
- `FormInput.component.tsx` - Reusable input field
- `FormButton.component.tsx` - Reusable button
- `BrandLogo.component.tsx` - Brand identity
- `Divider.component.tsx` - Visual separator
- `layout.component.tsx` - Auth layout wrapper

### Page Files
- `login.page.tsx` - Login form with validation
- `signup.page.tsx` - Signup form with validation

### Context Files
- `ThemeContext.tsx` - Dark mode management

---

## Design Token Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary Red | `red-600/700` | Buttons, links, focus |
| Background Dark | `slate-950` | Dark mode background |
| Background Light | `white` | Light mode background |
| Border Radius | `rounded-xl` (11px) | Inputs, buttons |
| Border Radius Large | `rounded-2xl` (16px) | Cards |
| Transition | `300ms ease-out` | All animations |
| Padding Card | `p-8/10` | Form container |
| Shadow | `shadow-2xl` | Cards, hover states |
| Font Weight Bold | `font-black` (900) | Headings |

---

## Quality Assurance

- ✅ Tested on mobile devices (iOS/Android)
- ✅ Cross-browser compatible
- ✅ Keyboard navigation verified
- ✅ Screen reader tested
- ✅ Performance optimized
- ✅ Production-ready code
- ✅ Type-safe (TypeScript)
- ✅ Accessibility compliant
