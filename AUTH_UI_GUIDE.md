# ShowTime Auth UI - Implementation Guide

## 📋 Overview

This refactored authentication UI provides a modern, production-ready cinema-themed login and signup experience with full light/dark mode support. All components are built with React + TypeScript and styled exclusively with Tailwind CSS.

---

## 🎯 Features

✨ **Modern Design**
- Cinematic theme inspired by Netflix & BookMyShow
- Glassmorphic effects with backdrop blur
- Smooth animations and transitions
- Gradient accents and backgrounds

🌓 **Dark Mode Support**
- Full light/dark mode using Tailwind's `dark:` class strategy
- System preference detection
- Persistent localStorage preference
- First-class dark mode (not inverted)

📱 **Mobile-First & Responsive**
- Touch-friendly interface (44px+ targets)
- Optimized for all screen sizes
- Progressive enhancement for larger screens

✅ **Accessibility**
- WCAG 2.1 AA compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Clear focus indicators

🔒 **Form Validation**
- Real-time validation feedback
- Clear error messaging
- Password strength requirements
- Email validation
- Terms acceptance

---

## 📁 File Structure

```
client/src/
├── components/
│   ├── auth/
│   │   ├── layout.component.tsx          # Main auth layout
│   │   ├── FormInput.component.tsx       # Reusable input
│   │   ├── FormButton.component.tsx      # Reusable button
│   │   ├── BrandLogo.component.tsx       # ShowTime logo
│   │   └── Divider.component.tsx         # Visual divider
│   └── ThemeToggle.component.tsx         # Dark mode toggle
├── context/
│   └── ThemeContext.tsx                  # Theme management
├── pages/
│   ├── login.page.tsx                    # Login page
│   └── signup.page.tsx                   # Signup page
└── routes/
    └── app.routes.tsx                    # Route definitions
```

---

## 🚀 Getting Started

### 1. Install Dependencies

Ensure you have all required dependencies installed:

```bash
npm install react react-dom react-router-dom typescript
npm install -D tailwindcss postcss autoprefixer
```

### 2. Configure Tailwind Dark Mode

Update your `tailwind.config.js`:

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Important: enables class-based dark mode
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
```

### 3. Wrap App with ThemeProvider

In your main `App.tsx` or `main.tsx`:

```tsx
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/app.routes';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
```

### 4. Ensure Dark Mode HTML Class

Make sure your `index.html` supports dark mode:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ... head content ... -->
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

The `dark` class will be automatically toggled on the HTML element by ThemeContext.

---

## 🎨 Component Guide

### FormInput

Reusable, accessible form input with validation support.

```tsx
import FormInput from './components/auth/FormInput.component';

<FormInput
  label="Email Address"
  type="email"
  name="email"
  placeholder="you@example.com"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  helperText="We'll never share your email"
  icon={<svg>...</svg>}
  disabled={isLoading}
/>
```

**Props:**
- `label?` (string) - Field label
- `type` (string) - Input type (email, password, text, etc.)
- `name` (string) - Input name
- `placeholder?` (string) - Placeholder text
- `value` (string) - Current value
- `onChange` (function) - Change handler
- `error?` (string) - Error message to display
- `helperText?` (string) - Helper/hint text
- `icon?` (ReactNode) - Icon to display on left
- `disabled?` (boolean) - Disabled state

---

### FormButton

Versatile button component with multiple variants and states.

```tsx
import FormButton from './components/auth/FormButton.component';

<FormButton
  type="submit"
  variant="primary"
  size="md"
  isLoading={isLoading}
  fullWidth
  icon="🎬"
>
  Login to ShowTime
</FormButton>
```

**Props:**
- `variant?` (primary | secondary | outline) - Button style
- `size?` (sm | md | lg) - Button size
- `isLoading?` (boolean) - Shows loading spinner
- `fullWidth?` (boolean) - 100% width
- `icon?` (string | ReactNode) - Icon/emoji to display
- `disabled?` (boolean) - Disabled state
- `children` (ReactNode) - Button text

**Variants:**
- `primary` - Red gradient, main actions (default)
- `secondary` - Purple-to-pink gradient
- `outline` - Bordered style, no fill

---

### BrandLogo

ShowTime branding component with responsive sizing.

```tsx
import BrandLogo from './components/auth/BrandLogo.component';

<BrandLogo 
  size="lg" 
  showText={true} 
  variant="auto"
/>
```

**Props:**
- `size?` (sm | md | lg) - Logo size
- `showText?` (boolean) - Show/hide text
- `variant?` (light | dark | auto) - Color scheme

---

### Divider

Visual separator with optional center text.

```tsx
import Divider from './components/auth/Divider.component';

<Divider text="or continue with" />
```

**Props:**
- `text?` (string) - Center text

---

### ThemeToggle

Dark mode toggle button.

```tsx
import ThemeToggle from './components/ThemeToggle.component';

<ThemeToggle />
```

**Props:** None required

---

### useTheme Hook

Access theme state anywhere in your app.

```tsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {isDark ? 'Dark' : 'Light'}
    </button>
  );
}
```

---

## 🎨 Customization

### Changing Colors

Edit color values in components (e.g., `FormButton.component.tsx`):

```tsx
// Change primary color
primary: `
  bg-gradient-to-r from-blue-600 to-blue-700 
  hover:from-blue-700 hover:to-blue-800
  // ...
`
```

### Adjusting Spacing

Modify Tailwind utility classes:

```tsx
// In layout.component.tsx
<div className="space-y-6">  {/* Change to space-y-4, space-y-8, etc. */}
```

### Modifying Animation Duration

Update transition values:

```tsx
// Change from duration-300 to duration-200, duration-500, etc.
transition-all duration-300 ease-out
```

---

## 🔗 Integration with Backend

### Login Example

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      setErrors({ general: 'Invalid credentials' });
      return;
    }
    
    const data = await response.json();
    // Store token, update auth state
    localStorage.setItem('authToken', data.token);
    // Redirect to dashboard
    navigate('/dashboard');
    
  } catch (error) {
    setErrors({ general: 'Network error. Please try again.' });
  } finally {
    setIsLoading(false);
  }
};
```

### Signup Example

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  
  try {
    const { confirmPassword, ...payload } = formData;
    
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const error = await response.json();
      setErrors({ general: error.message || 'Signup failed' });
      return;
    }
    
    // Redirect to login or auto-login
    navigate('/auth/login');
    
  } catch (error) {
    setErrors({ general: 'Network error. Please try again.' });
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login page loads with correct styling
- [ ] Signup page loads with correct styling
- [ ] Form validation works (empty fields, invalid email, weak password)
- [ ] Error messages display correctly
- [ ] Loading states show spinner
- [ ] Dark mode toggle works
- [ ] Dark mode preference persists on reload
- [ ] Mobile responsive (test at 320px, 768px, 1024px)
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus indicators visible
- [ ] Social login buttons are interactive
- [ ] Links navigate correctly
- [ ] Background animations run smoothly

### Accessibility Testing

```bash
# Install tools
npm install -D axe-core jest-axe

# Run accessibility tests
npm test
```

---

## 🎬 Interactive Features

### Form Validation Flow

1. **On Input**: Clear errors for that field
2. **On Blur**: Validate specific field (optional)
3. **On Submit**: Validate all fields, show errors
4. **Real-Time**: Email format, password strength

### Dark Mode Flow

1. Check localStorage for saved preference
2. Fall back to system preference
3. On toggle: Update state, save to localStorage, toggle HTML class
4. All components respond via `dark:` classes

### Loading State Flow

1. User submits form
2. Show loading spinner on button
3. Disable all inputs
4. Wait for API response
5. Show error or redirect
6. Reset loading state

---

## 📱 Responsive Breakpoints

Using Tailwind's responsive prefixes:

- **Mobile**: Default (< 640px)
- **sm**: 640px and up
- **md**: 768px and up (hidden logo/left section)
- **lg**: 1024px and up (two-column layout)
- **xl**: 1280px and up

---

## 🎯 Performance Tips

1. **Lazy load components**: Use React.lazy() for routes
2. **Memoize functions**: Use useCallback for handlers
3. **Debounce validation**: For real-time field validation
4. **Minimize re-renders**: Use proper dependency arrays
5. **Optimize images**: SVG icons are already optimal

---

## 🐛 Troubleshooting

### Dark Mode Not Working

1. Verify `darkMode: 'class'` in `tailwind.config.js`
2. Check ThemeProvider wraps the app
3. Verify `dark` class is on HTML element
4. Check browser console for errors

### Validation Not Clearing

1. Ensure error state is cleared in `handleInputChange`
2. Check field names match error keys
3. Verify onChange handler is properly bound

### Buttons Not Responsive

1. Check `fullWidth` prop is set
2. Verify parent container allows flex
3. Check for CSS conflicts in global styles

### Dark Mode Not Persisting

1. Check localStorage is not blocked
2. Verify useEffect in ThemeContext runs
3. Check browser private mode settings

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)

---

## 🤝 Contributing

When making changes:

1. Maintain existing component APIs
2. Keep Tailwind-only styling
3. Ensure dark mode support
4. Test on mobile devices
5. Verify accessibility
6. Update this documentation

---

## 📝 Notes

- All components are TypeScript-first
- No CSS-in-JS libraries are used
- Icons are SVG or emoji for simplicity
- Mobile-first approach throughout
- Performance optimized for production

---

## 🎉 What's Next?

1. **Integrate with backend**: Connect to API endpoints
2. **Add social login**: Implement OAuth providers
3. **Setup email verification**: OTP or magic link flow
4. **Add two-factor auth**: Enhance security
5. **Create dashboard**: Main app after authentication
6. **Setup auth guards**: Protect routes

Happy coding! 🚀🎬
