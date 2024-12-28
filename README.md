# Pokédex Lite

A modern, responsive Pokédex application built with Next.js, TypeScript, and TailwindCSS. This application allows users to browse, search, and favorite Pokémon while providing a seamless user experience across all devices.


![Pokédex Lite Screenshot 1](<Screenshot from 2024-12-28 14-55-31.png>)
![Pokédex Lite Screenshot 2](<Screenshot from 2024-12-28 14-55-38.png>)

## 🌟 Features

- **Pokémon Listing**: Browse through all Pokémon with pagination support
- **Search & Filter**: Search Pokémon by name and filter by type
- **Favorites System**: Save your favorite Pokémon locally
- **Responsive Design**: Optimized for mobile, tablet, and desktop views
- **Dark Mode**: Toggle between light and dark themes
- **Grid/List View**: Switch between different viewing layouts
- **Detailed Information**: View comprehensive Pokémon statistics and details
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Type-based Styling**: Visual representation of Pokémon types with appropriate colors

## 🚀 Technologies Used

- **Next.js 15**: React framework for production-grade applications
  - App Router for improved routing and layouts
  - Server and Client Components
  - API Routes

- **TypeScript**: For type safety and better developer experience

- **TailwindCSS**: For styling and responsive design
  - Custom color schemes
  - Dark mode support
  - Responsive utilities

- **State Management**:
  - React Context for global state
  - TanStack Query for server state management

- **Additional Libraries**:
  - Framer Motion: For smooth animations
  - Headless UI: For accessible components
  - Heroicons: For consistent iconography
  - Axios: For API requests

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pokedex-lite.git
cd pokedex-lite
```
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Building for Production
```
npm run build
npm start
```

## 🎯 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 💪 Challenges and Solutions
#### 1. Dark Mode Implementation

- Challenge: Implementing dark mode with dynamic color schemes for Pokémon types
- Solution: Created a custom theme context with TailwindCSS dark mode utilities and persistent storage
#### 2.  Performance Optimization

- Challenge: Managing large lists of Pokémon data efficiently
- Solution: Implemented pagination and virtualization for better performance
#### 3. Type-Safe API Integration

- Challenge: Ensuring type safety with the PokéAPI responses
- Solution: Created comprehensive TypeScript interfaces for API responses
#### 4. Responsive Image Loading

- Challenge: Handling image loading and errors across different devices
- Solution: Implemented Next.js Image component with proper error handling and loading states
#### 5. State Management

- Challenge: Managing global state for favorites and theme
- Solution: Used React Context for global state and localStorage for persistence



## 🔄 API Integration

The application uses the [PokéAPI](https://pokeapi.co/) for Pokémon data. Key endpoints used:

- `/api/v2/pokemon`: List of Pokémon with pagination
- `/api/v2/pokemon/{id}`: Detailed Pokémon information

## 🎨 Design Decisions

1. **UI/UX**:
   - Clean, minimalist design
   - Intuitive navigation
   - Responsive layouts
   - Accessible components

2. **Performance**:
   - Image optimization
   - Code splitting
   - Lazy loading
   - Caching strategies


## 📦 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

### Environment Variables on Vercel

1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Add the following variables:
```env
NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2
NEXT_PUBLIC_SITE_URL=your-deployed-url.vercel.app
```

### Alternative Deployment Options

#### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Create a `netlify.toml` in your project root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

4. Deploy:
```bash
netlify deploy
```

For production:
```bash
netlify deploy --prod
```
## 🔜 Future Improvements

- [ ] Add authentication system
- [ ] Implement Pokémon comparison feature
- [ ] Add more detailed statistics
- [ ] Include evolution chains
- [ ] Add move lists and abilities details
- [ ] Implement team builder feature
- [ ] Add PWA support

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animation capabilities

## 📧 Contact

LinkedIn: [Uttkarrshh Pal](https://www.linkedin.com/in/uttkarrshh-pal/)

Project Link: [https://github.com/UttkarrshhPal/pokedex-lite](https://github.com/UttkarrshhPal/pokedex-lite)
