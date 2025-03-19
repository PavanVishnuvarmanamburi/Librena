
import React from 'react';
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
import { Library } from '@/components/ui/LibraryCard';

interface VisualComparisonProps {
  libraries: Library[];
}

export const VisualComparison: React.FC<VisualComparisonProps> = ({ libraries }) => {
  if (libraries.length === 0) return null;

  // Generate data for stars comparison
  const starsData = libraries.map((lib) => ({
    name: lib.name,
    stars: lib.stars,
  }));

  // Generate data for OS distribution
  const allOS = libraries.flatMap((lib) => lib.os);
  const uniqueOS = [...new Set(allOS)];
  
  const osData = uniqueOS.map((os) => {
    const count = libraries.filter((lib) => lib.os.includes(os)).length;
    return {
      name: os,
      value: count,
    };
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-10 py-8">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Popularity Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={starsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }} 
              />
              <Legend />
              <Bar 
                dataKey="stars" 
                name="GitHub Stars" 
                fill="#0088FE" 
                radius={[4, 4, 0, 0]}
                barSize={60}
                animationDuration={1500}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">OS Compatibility</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={osData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  animationDuration={1500}
                  isAnimationActive={true}
                >
                  {osData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
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
          <h3 className="text-xl font-semibold mb-4">Size Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={libraries.map(lib => ({ name: lib.name, size: parseInt(lib.size || '0') }))}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis type="number" domain={[0, 'dataMax']} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  formatter={(value) => [`${value} KB`, 'Size']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="size" 
                  name="Size (KB)" 
                  fill="#00C49F" 
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
