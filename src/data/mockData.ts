
import { Library } from '@/components/ui/LibraryCard';

export const mockLibraries: Library[] = [
  {
    id: 'lib-1',
    name: 'React',
    category: 'UI Libraries',
    version: '18.2.0',
    lastUpdated: 'May 12, 2023',
    stars: 201000,
    description: 'A JavaScript library for building user interfaces. React makes it painless to create interactive UIs.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    dependencies: ['prop-types', 'react-dom'],
    size: '42',
    tags: ['frontend', 'javascript', 'ui', 'web', 'meta']
  },
  {
    id: 'lib-2',
    name: 'Vue.js',
    category: 'UI Libraries',
    version: '3.3.0',
    lastUpdated: 'Apr 28, 2023',
    stars: 203000,
    description: 'An approachable, performant, and versatile framework for building web interfaces and single-page applications.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    dependencies: ['vue-router', 'vuex'],
    size: '33',
    tags: ['frontend', 'javascript', 'ui', 'web', 'progressive']
  },
  {
    id: 'lib-3',
    name: 'Angular',
    category: 'UI Libraries',
    version: '16.0.0',
    lastUpdated: 'May 3, 2023',
    stars: 86000,
    description: 'A platform and framework for building single-page client applications using HTML and TypeScript.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux'],
    dependencies: ['rxjs', 'zone.js'],
    size: '143',
    tags: ['frontend', 'typescript', 'google', 'spa', 'enterprise']
  },
  {
    id: 'lib-4',
    name: 'Redux',
    category: 'State Management',
    version: '4.2.1',
    lastUpdated: 'Dec 12, 2022',
    stars: 58700,
    description: 'A predictable state container for JavaScript apps. It helps you write applications that behave consistently.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    dependencies: ['react-redux'],
    size: '2',
    tags: ['state', 'frontend', 'react', 'predictable']
  },
  {
    id: 'lib-5',
    name: 'Axios',
    category: 'Data Fetching',
    version: '1.4.0',
    lastUpdated: 'Apr 7, 2023',
    stars: 97800,
    description: 'Promise based HTTP client for the browser and node.js. Makes it easy to send asynchronous HTTP requests.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    size: '13',
    tags: ['http', 'ajax', 'request', 'api', 'promise']
  },
  {
    id: 'lib-6',
    name: 'TensorFlow.js',
    category: 'Machine Learning',
    version: '4.4.0',
    lastUpdated: 'Mar 25, 2023',
    stars: 72300,
    description: 'A library for machine learning in JavaScript. Develop ML models in JavaScript, and use ML directly in the browser or in Node.js.',
    license: 'Apache-2.0',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux'],
    dependencies: ['tfjs-core', 'tfjs-converter'],
    size: '500',
    tags: ['ml', 'ai', 'deep-learning', 'neural-networks', 'google']
  },
  {
    id: 'lib-7',
    name: 'React Router',
    category: 'Routing',
    version: '6.11.1',
    lastUpdated: 'Apr 26, 2023',
    stars: 48600,
    description: 'Declarative routing for React. Helps you navigate through your React application with declarative routing.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    dependencies: ['react', 'react-dom'],
    size: '20',
    tags: ['react', 'routing', 'navigation', 'spa']
  },
  {
    id: 'lib-8',
    name: 'styled-components',
    category: 'Styling',
    version: '5.3.10',
    lastUpdated: 'Apr 22, 2023',
    stars: 38500,
    description: 'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    dependencies: ['react', 'react-dom'],
    size: '12',
    tags: ['css-in-js', 'react', 'styling', 'components']
  },
  {
    id: 'lib-9',
    name: 'Jest',
    category: 'Testing',
    version: '29.5.0',
    lastUpdated: 'Mar 28, 2023',
    stars: 41700,
    description: 'Delightful JavaScript Testing. Jest is a comprehensive JavaScript testing solution maintained by Facebook.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux'],
    dependencies: ['babel-jest', 'jest-circus'],
    size: '60',
    tags: ['testing', 'javascript', 'typescript', 'snapshot', 'facebook']
  },
  {
    id: 'lib-10',
    name: 'Lodash',
    category: 'Utilities',
    version: '4.17.21',
    lastUpdated: 'Feb 15, 2021',
    stars: 55900,
    description: 'A modern JavaScript utility library delivering modularity, performance & extras. It provides utility functions for common programming tasks.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    size: '25',
    tags: ['utilities', 'functional', 'modules', 'javascript']
  },
  {
    id: 'lib-11',
    name: 'Tailwind CSS',
    category: 'Styling',
    version: '3.3.2',
    lastUpdated: 'Apr 25, 2023',
    stars: 64200,
    description: 'A utility-first CSS framework for rapidly building custom user interfaces directly in your markup.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux'],
    dependencies: ['postcss', 'autoprefixer'],
    size: '8',
    tags: ['css', 'framework', 'utility', 'responsive', 'design']
  },
  {
    id: 'lib-12',
    name: 'Express',
    category: 'Backend',
    version: '4.18.2',
    lastUpdated: 'Oct 8, 2022',
    stars: 59900,
    description: 'Fast, unopinionated, minimalist web framework for Node.js. It provides a robust set of features for web and mobile applications.',
    license: 'MIT',
    cost: 'Free',
    os: ['Windows', 'macOS', 'Linux'],
    dependencies: ['body-parser', 'cookie-parser'],
    size: '11',
    tags: ['node', 'server', 'http', 'rest', 'api']
  }
];
