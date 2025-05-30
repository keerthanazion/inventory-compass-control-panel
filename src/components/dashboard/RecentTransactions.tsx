
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, CheckCircle, Clock, XCircle } from 'lucide-react';

export function RecentTransactions() {
  const transactions = [
    { id: 'T001', item: 'Organic Apples', from: 'Store A', to: 'Kiosk 12', status: 'Success', time: '2 hours ago' },
    { id: 'T002', item: 'Bread Loaves', from: 'Store B', to: 'Kiosk 8', status: 'Pending', time: '4 hours ago' },
    { id: 'T003', item: 'Dairy Products', from: 'Store C', to: 'Kiosk 15', status: 'Success', time: '6 hours ago' },
    { id: 'T004', item: 'Vegetables', from: 'Store A', to: 'Kiosk 3', status: 'Failed', time: '8 hours ago' },
    { id: 'T005', item: 'Packaged Meals', from: 'Store D', to: 'Kiosk 7', status: 'Success', time: '1 day ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{transaction.item}</div>
                <div className="text-sm text-gray-500">
                  {transaction.from} → {transaction.to} • {transaction.time}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(transaction.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
