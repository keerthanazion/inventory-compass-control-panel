
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter, RefreshCw } from 'lucide-react';

// Mock data for inventory items
const mockInventoryData = [
  {
    id: 1,
    name: "Organic Apples",
    quantity: 150,
    threshold: 50,
    lastUpdated: "2024-01-15 14:30",
    unit: "kg"
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    quantity: 85,
    threshold: 30,
    lastUpdated: "2024-01-15 12:15",
    unit: "loaves"
  },
  {
    id: 3,
    name: "Free-Range Eggs",
    quantity: 200,
    threshold: 100,
    lastUpdated: "2024-01-15 16:45",
    unit: "dozen"
  },
  {
    id: 4,
    name: "Greek Yogurt",
    quantity: 25,
    threshold: 40,
    lastUpdated: "2024-01-15 11:20",
    unit: "containers"
  },
  {
    id: 5,
    name: "Pasta Sauce",
    quantity: 120,
    threshold: 25,
    lastUpdated: "2024-01-15 13:50",
    unit: "jars"
  },
  {
    id: 6,
    name: "Baby Spinach",
    quantity: 15,
    threshold: 20,
    lastUpdated: "2024-01-15 10:30",
    unit: "bags"
  }
];

export function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getSurplusStatus = (quantity: number, threshold: number) => {
    const surplusAmount = quantity - threshold;
    if (surplusAmount > threshold * 0.5) return { status: 'high', label: 'High Surplus', variant: 'destructive' as const };
    if (surplusAmount > 0) return { status: 'medium', label: 'Surplus', variant: 'secondary' as const };
    return { status: 'normal', label: 'Normal', variant: 'outline' as const };
  };

  const filteredData = mockInventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const surplus = getSurplusStatus(item.quantity, item.threshold);
    
    if (statusFilter === 'surplus') {
      return matchesSearch && surplus.status !== 'normal';
    }
    if (statusFilter === 'normal') {
      return matchesSearch && surplus.status === 'normal';
    }
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Inventory Items</span>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="surplus">Surplus Only</SelectItem>
                <SelectItem value="normal">Normal Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => {
              const surplus = getSurplusStatus(item.quantity, item.threshold);
              const hasSurplus = surplus.status !== 'normal';
              
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className="font-semibold">{item.quantity}</span>
                    <span className="text-gray-500 ml-1">{item.unit}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{item.threshold}</span>
                    <span className="text-gray-500 ml-1">{item.unit}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={surplus.variant}>
                      {surplus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {item.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      disabled={!hasSurplus}
                      className={hasSurplus ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {hasSurplus ? 'Redistribute' : 'No Action'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} items
        </div>
      </CardContent>
    </Card>
  );
}
