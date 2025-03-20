import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const About = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data for charts
  const techStackData = [
    { name: 'React', value: 40 },
    { name: 'TypeScript', value: 30 },
    { name: 'Tailwind CSS', value: 20 },
    { name: 'Recharts', value: 10 },
  ];
  
  const projectTimelineData = [
    { name: 'Research', hours: 40 },
    { name: 'Design', hours: 60 },
    { name: 'Development', hours: 120 },
    { name: 'Testing', hours: 30 },
    { name: 'Documentation', hours: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, this would call an API to send an email
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-theme-dark">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Librena</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A UMBC Capstone project designed to help developers discover and compare software libraries.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Project Lead</h2>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5" />
                          <span>Rama Bhadra Sastry Kolluri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="h-5 w-5" />
                          <span>Software Engineering, UMBC</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Briefcase className="h-5 w-5" />
                          <span>Software Developer</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Connect</h3>
                      <div className="flex space-x-3">
                        <a 
                          href="https://github.com/KRBSASTRY" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://www.linkedin.com/in/rama-bhadra-sastry-kolluri-0150932ab" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a 
                          href="mailto:rbsastryk@gmail.com" 
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                        <a 
                          href="tel:+16674331296" 
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Phone className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-8">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Project Overview</h2>
                    <p className="text-muted-foreground">
                      Librena is a comprehensive platform designed to help developers discover, compare, and choose the right software libraries for their projects. This capstone project for UMBC aims to solve the challenge of library selection in the increasingly complex software development ecosystem.
                    </p>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-semibold">Project Highlights</h3>
                      <ul className="space-y-3">
                        <li className="flex">
                          <Award className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span>
                            <span className="font-medium">Award-winning Design:</span>{' '}
                            Recognized for intuitive user experience and clean interface design.
                          </span>
                        </li>
                        <li className="flex">
                          <Code2 className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span>
                            <span className="font-medium">Technical Innovation:</span>{' '}
                            Advanced search algorithms and comparison metrics to provide accurate library recommendations.
                          </span>
                        </li>
                        <li className="flex">
                          <BookOpen className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span>
                            <span className="font-medium">Research Quality:</span>{' '}
                            Extensively researched library attributes and metrics that matter most to developers.
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold mb-3">Skills & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'RESTful APIs', 'UI/UX Design', 'Database Design', 'Data Visualization', 'System Architecture'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 bg-white dark:bg-theme-dark">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Details</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the technologies and approach used to build Librena.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={techStackData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        animationDuration={1500}
                      >
                        {techStackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Usage']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Project Timeline</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectTimelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" angle={0} />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)'
                        }} 
                      />
                      <Bar 
                        dataKey="hours" 
                        fill="#0088FE" 
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">Key Features & Implementation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">Advanced Search Engine</h4>
                    <p className="text-muted-foreground text-sm">
                      Implemented using fuzzy search algorithms to provide accurate and relevant results even with partial queries. The search indexes library names, descriptions, tags, and categories.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">Visual Comparison Tools</h4>
                    <p className="text-muted-foreground text-sm">
                      Built with Recharts to visualize differences between libraries. Custom hooks handle data transformation for various chart types.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">Authentication System</h4>
                    <p className="text-muted-foreground text-sm">
                      Secure user authentication using JWT with role-based permissions for regular users and administrators.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">Responsive UI Design</h4>
                    <p className="text-muted-foreground text-sm">
                      Fully responsive interface built with Tailwind CSS and custom components. Follows Apple-inspired design principles with attention to detail.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">Admin Dashboard</h4>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive admin panel for managing library data, user accounts, and system settings with real-time updates.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg">Performance Optimization</h4>
                    <p className="text-muted-foreground text-sm">
                      Implemented code splitting, lazy loading, and memoization techniques to ensure fast loading times and smooth interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Feel free to reach out with any questions, suggestions, or collaboration opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:rbsastryk@gmail.com" 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        rbsastryk@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:+16674331296" 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        +1 (667) 433-1296
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Github className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a 
                        href="https://github.com/KRBSASTRY" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        github.com/KRBSASTRY
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Linkedin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/rama-bhadra-sastry-kolluri-0150932ab" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        linkedin.com/in/rama-bhadra-sastry-kolluri-0150932ab
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Message subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Your message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
