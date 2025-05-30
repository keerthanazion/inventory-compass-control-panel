
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Receipt, Search, Copy, CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock transaction data
const transactionData = [
  {
    id: 'TX-2024-001',
    from: 'Main Store',
    to: 'Downtown Branch',
    item: 'Organic Apples',
    quantity: '75 kg',
    status: 'Confirmed',
    timestamp: '2024-01-15 14:30:22',
    blockchainRef: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    value: '$89.50'
  },
  {
    id: 'TX-2024-002',
    from: 'Main Store',
    to: 'Community Kitchen',
    item: 'Whole Wheat Bread',
    quantity: '45 loaves',
    status: 'Pending',
    timestamp: '2024-01-15 13:15:10',
    blockchainRef: '0x5678901234abcdef567890abcdef123456789012',
    value: '$67.25'
  },
  {
    id: 'TX-2024-003',
    from: 'Main Store',
    to: 'West Side Location',
    item: 'Free-Range Eggs',
    quantity: '120 dozen',
    status: 'Confirmed',
    timestamp: '2024-01-15 11:45:33',
    blockchainRef: '0x9012345678abcdef9012345678abcdef90123456',
    value: '$156.00'
  },
  {
    id: 'TX-2024-004',
    from: 'Main Store',
    to: 'Downtown Branch',
    item: 'Greek Yogurt',
    quantity: '30 containers',
    status: 'Failed',
    timestamp: '2024-01-15 10:20:45',
    blockchainRef: '0x3456789012abcdef3456789012abcdef34567890',
    value: '$43.75'
  },
  {
    id: 'TX-2024-005',
    from: 'Main Store',
    to: 'Community Kitchen',
    item: 'Pasta Sauce',
    quantity: '60 jars',
    status: 'Confirmed',
    timestamp: '2024-01-14 16:22:18',
    blockchainRef: '0x7890123456abcdef7890123456abcdef78901234',
    value: '$95.20'
  },
  {
    id: 'TX-2024-006',
    from: 'Main Store',
    to: 'East Branch',
    item: 'Quinoa',
    quantity: '25 kg',
    status: 'Pending',
    timestamp: '2024-01-14 14:18:52',
    blockchainRef: '0xabcdef123456789012345678abcdef1234567890',
    value: '$78.30'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
    case 'Failed': return <XCircle className="w-4 h-4 text-red-600" />;
    default: return null;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'default';
    case 'Pending': return 'secondary';
    case 'Failed': return 'destructive';
    default: return 'outline';
  }
};

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Blockchain reference ID copied successfully",
    });
  };

  const filteredTransactions = transactionData.filter(transaction => {
    const matchesSearch = transaction.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Transaction History
        </CardTitle>
        
        {/* Filters */}
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TX ID</TableHead>
              <TableHead>From → To</TableHead>
              <TableHead>Item & Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Blockchain Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {transaction.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{transaction.from}</span>
                    <span className="text-xs text-gray-500">↓</span>
                    <span className="text-sm">{transaction.to}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{transaction.item}</span>
                    <span className="text-sm text-gray-500">{transaction.quantity}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(transaction.status)} className="flex items-center gap-1 w-fit">
                    {getStatusIcon(transaction.status)}
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {transaction.timestamp}
                </TableCell>
                <TableCell className="text-sm font-medium text-green-600">
                  {transaction.value}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs max-w-32 truncate">
                      {transaction.blockchainRef}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(transaction.blockchainRef)}
                      className="h-6 w-6"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
