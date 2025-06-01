
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter } from 'lucide-react';

// Mock data for redistributions
const mockRedistributions = [
  {
    id: 1,
    itemName: "Organic Tomatoes",
    stockTransition: "Oversupply → Apt",
    from: "Main Branch",
    to: "Downtown Branch",
    quantity: "25 kg",
    status: "Scheduled" as const,
    scheduledDate: "2024-01-16",
    scheduledTime: "10:00 AM"
  },
  {
    id: 2,
    itemName: "Greek Yogurt",
    stockTransition: "Oversupply → Apt",
    from: "Main Branch",
    to: "West Side Location",
    quantity: "30 containers",
    status: "In Transit" as const,
    scheduledDate: "2024-01-15",
    scheduledTime: "2:00 PM"
  },
  {
    id: 3,
    itemName: "Whole Wheat Bread",
    stockTransition: "Undersupply → Apt",
    from: "Community Kitchen",
    to: "Main Branch",
    quantity: "15 loaves",
    status: "Delivered" as const,
    scheduledDate: "2024-01-15",
    scheduledTime: "9:30 AM"
  },
  {
    id: 4,
    itemName: "Free-Range Eggs",
    stockTransition: "Oversupply → Apt",
    from: "Main Branch",
    to: "Downtown Branch",
    quantity: "40 dozen",
    status: "Cancelled" as const,
    scheduledDate: "2024-01-14",
    scheduledTime: "11:00 AM"
  }
];

type RedistributionStatus = "Scheduled" | "In Transit" | "Delivered" | "Cancelled";

const getStatusVariant = (status: RedistributionStatus) => {
  switch (status) {
    case 'Scheduled':
      return 'secondary';
    case 'In Transit':
      return 'default';
    case 'Delivered':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusColor = (status: RedistributionStatus) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-yellow-100 text-yellow-800';
    case 'In Transit':
      return 'bg-blue-100 text-blue-800';
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function RedistributionTable() {
  const [redistributions, setRedistributions] = useState(mockRedistributions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [itemFilter, setItemFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  
  // Modal states
  const [cancelModal, setCancelModal] = useState<{open: boolean, id: number | null}>({open: false, id: null});
  const [rescheduleModal, setRescheduleModal] = useState<{open: boolean, id: number | null}>({open: false, id: null});
  const [editRouteModal, setEditRouteModal] = useState<{open: boolean, id: number | null}>({open: false, id: null});
  
  // Form states
  const [rescheduleDate, setRescheduleDate] = useState<Date>();
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [rescheduleNotes, setRescheduleNotes] = useState('');
  
  const { toast } = useToast();

  // Filter redistributions based on search and filters
  const filteredRedistributions = redistributions.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesItem = itemFilter === 'all' || item.itemName === itemFilter;
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'scheduled' && item.status === 'Scheduled') ||
                      (selectedTab === 'completed' && item.status === 'Delivered') ||
                      (selectedTab === 'cancelled' && item.status === 'Cancelled');
    
    return matchesSearch && matchesStatus && matchesItem && matchesTab;
  });

  const handleCancelRedistribution = () => {
    if (cancelModal.id) {
      setRedistributions(prev => 
        prev.map(item => 
          item.id === cancelModal.id 
            ? { ...item, status: 'Cancelled' as const }
            : item
        )
      );
      toast({
        title: "Redistribution Cancelled Successfully ✅",
        description: "The redistribution has been cancelled and logged.",
      });
      setCancelModal({open: false, id: null});
    }
  };

  const handleReschedule = () => {
    if (rescheduleModal.id && rescheduleDate && rescheduleTime) {
      setRedistributions(prev => 
        prev.map(item => 
          item.id === rescheduleModal.id 
            ? { ...item, scheduledDate: rescheduleDate.toISOString().split('T')[0], scheduledTime: rescheduleTime }
            : item
        )
      );
      toast({
        title: "New schedule confirmed for redistribution",
        description: `Rescheduled to ${rescheduleDate.toLocaleDateString()} at ${rescheduleTime}`,
      });
      setRescheduleModal({open: false, id: null});
      setRescheduleDate(undefined);
      setRescheduleTime('');
      setRescheduleNotes('');
    }
  };

  const uniqueItems = Array.from(new Set(redistributions.map(r => r.itemName)));

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by item name or kiosk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={itemFilter} onValueChange={setItemFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by item" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            {uniqueItems.map(item => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Redistributions</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Stock Transition</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Qty of Movement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRedistributions.map((redistribution) => (
                  <TableRow key={redistribution.id}>
                    <TableCell className="font-medium">{redistribution.itemName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {redistribution.stockTransition}
                      </Badge>
                    </TableCell>
                    <TableCell>{redistribution.from}</TableCell>
                    <TableCell>{redistribution.to}</TableCell>
                    <TableCell>{redistribution.quantity}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(redistribution.status)}>
                        {redistribution.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            ⋮
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {redistribution.status === 'Scheduled' && (
                            <>
                              <DropdownMenuItem onClick={() => setCancelModal({open: true, id: redistribution.id})}>
                                Cancel
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setRescheduleModal({open: true, id: redistribution.id})}>
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditRouteModal({open: true, id: redistribution.id})}>
                                Edit Route
                              </DropdownMenuItem>
                            </>
                          )}
                          {redistribution.status !== 'Scheduled' && (
                            <DropdownMenuItem disabled>
                              No actions available
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Cancel Confirmation Modal */}
      <Dialog open={cancelModal.open} onOpenChange={(open) => setCancelModal({open, id: null})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Redistribution</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this redistribution? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelModal({open: false, id: null})}>
              No, Go Back
            </Button>
            <Button variant="destructive" onClick={handleCancelRedistribution}>
              Yes, Cancel Redistribution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Modal */}
      <Dialog open={rescheduleModal.open} onOpenChange={(open) => setRescheduleModal({open, id: null})}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Redistribution</DialogTitle>
            <DialogDescription>
              Select a new date and time for this redistribution.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Date</label>
              <Calendar
                mode="single"
                selected={rescheduleDate}
                onSelect={setRescheduleDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Time</label>
              <Select value={rescheduleTime} onValueChange={setRescheduleTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Reason for rescheduling (optional)</label>
              <Input
                placeholder="Enter reason..."
                value={rescheduleNotes}
                onChange={(e) => setRescheduleNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleModal({open: false, id: null})}>
              Cancel
            </Button>
            <Button onClick={handleReschedule} disabled={!rescheduleDate || !rescheduleTime}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Route Modal */}
      <Dialog open={editRouteModal.open} onOpenChange={(open) => setEditRouteModal({open, id: null})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Route</DialogTitle>
            <DialogDescription>
              Modify the redistribution route and schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">From</label>
              <Select defaultValue="Main Branch">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Branch">Main Branch</SelectItem>
                  <SelectItem value="Downtown Branch">Downtown Branch</SelectItem>
                  <SelectItem value="West Side Location">West Side Location</SelectItem>
                  <SelectItem value="Community Kitchen">Community Kitchen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">To</label>
              <Select defaultValue="Downtown Branch">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Branch">Main Branch</SelectItem>
                  <SelectItem value="Downtown Branch">Downtown Branch</SelectItem>
                  <SelectItem value="West Side Location">West Side Location</SelectItem>
                  <SelectItem value="Community Kitchen">Community Kitchen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input type="time" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRouteModal({open: false, id: null})}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Route updated successfully",
                description: "The redistribution route has been updated.",
              });
              setEditRouteModal({open: false, id: null});
            }}>
              Save Route Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
