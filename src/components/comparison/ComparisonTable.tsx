
import React from 'react';
import { Check, X } from 'lucide-react';
import { Library } from '@/components/ui/LibraryCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ComparisonTableProps {
  libraries: Library[];
}

interface AttributeDefinition {
  key: keyof Library;
  label: string;
  isArray?: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ libraries }) => {
  if (libraries.length === 0) return null;

  // Create a list of all possible attributes to compare
  const attributes: AttributeDefinition[] = [
    { key: 'name', label: 'Name' },
    { key: 'version', label: 'Version' },
    { key: 'category', label: 'Category' },
    { key: 'lastUpdated', label: 'Last Updated' },
    { key: 'stars', label: 'Stars' },
    { key: 'license', label: 'License' },
    { key: 'cost', label: 'Cost' },
    { key: 'size', label: 'Size' },
    { key: 'os', label: 'Operating Systems', isArray: true },
    { key: 'dependencies', label: 'Dependencies', isArray: true },
    { key: 'tags', label: 'Tags', isArray: true },
  ];

  const renderCellValue = (
    library: Library,
    attribute: AttributeDefinition
  ) => {
    const value = library[attribute.key];

    if (value === undefined || value === null) {
      return <span className="text-muted-foreground italic">Not available</span>;
    }

    if (attribute.isArray && Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      );
    }

    if (attribute.key === 'stars') {
      return <span className="font-semibold">{value}</span>;
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-900">
            <TableHead className="w-48">Attribute</TableHead>
            {libraries.map((library) => (
              <TableHead key={library.id} className="min-w-[250px] text-center">
                {library.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow key={attribute.key as string} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <TableCell className="font-medium bg-gray-50 dark:bg-gray-900/30">
                {attribute.label}
              </TableCell>
              {libraries.map((library) => (
                <TableCell key={`${library.id}-${attribute.key}`} className="text-center">
                  {renderCellValue(library, attribute)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
            <TableCell className="font-medium bg-gray-50 dark:bg-gray-900/30">
              Example Code
            </TableCell>
            {libraries.map((library) => (
              <TableCell key={`${library.id}-example`}>
                <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md text-xs overflow-x-auto">
                  <code>
                    {`// Example code for ${library.name}
import { ${library.name} } from '${library.name.toLowerCase()}';

// Initialize the library
const lib = new ${library.name}();

// Use the library
lib.doSomething();
`}
                  </code>
                </pre>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
