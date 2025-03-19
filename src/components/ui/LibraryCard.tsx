
import React from 'react';
import { Check, Star, ArrowUpRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export interface Library {
  id: string;
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  stars: number;
  description: string;
  license: string;
  cost: string;
  os: string[];
  dependencies?: string[];
  size?: string;
  tags: string[];
}

interface LibraryCardProps {
  library: Library;
  isSelected: boolean;
  onSelect: (library: Library) => void;
  onViewDetails: (library: Library) => void;
}

export const LibraryCard: React.FC<LibraryCardProps> = ({
  library,
  isSelected,
  onSelect,
  onViewDetails
}) => {
  return (
    <Card className={`
      overflow-hidden transition-all duration-300 h-full
      ${isSelected ? 'ring-2 ring-theme-hover shadow-lg' : 'hover:shadow-md'}
    `}>
      <CardHeader className="p-4 pb-0 flex justify-between">
        <div className="flex items-start justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{library.name}</h3>
              <Badge variant="outline" className="text-xs">v{library.version}</Badge>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Updated {library.lastUpdated}</span>
              <span className="mx-2">•</span>
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              <span>{library.stars}</span>
            </div>
          </div>
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onSelect(library)}
            className="h-5 w-5"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {library.description}
        </p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Category:</span>
            <span className="ml-1 font-medium">{library.category}</span>
          </div>
          <div>
            <span className="text-muted-foreground">License:</span>
            <span className="ml-1 font-medium">{library.license}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Cost:</span>
            <span className="ml-1 font-medium">{library.cost}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Size:</span>
            <span className="ml-1 font-medium">{library.size || 'N/A'}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="text-sm text-muted-foreground mb-1">Compatible with:</div>
          <div className="flex flex-wrap gap-1">
            {library.os.map((os) => (
              <Badge key={os} variant="secondary" className="text-xs">
                {os}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {library.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="ghost" 
          className="text-sm w-full" 
          onClick={() => onViewDetails(library)}
        >
          View Details
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
