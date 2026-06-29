import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    TimerReset,
} from 'lucide-react';
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01FreeIcons } from "@hugeicons/core-free-icons";
import {
    Megaphone,
    FileText,
    Clock,
    Users,
    BadgeCheck,
    Target,
    BarChart3,
    Tag,
  } from 'lucide-react';
  
  const campaignInformation = [
    {
      icon: Megaphone,
      title: 'Campaign Name',
      description: 'Summer Flash Sale',
    },
    {
      icon: FileText,
      title: 'Description',
      description:
        'Boost customer engagement with limited-time discounts and exclusive offers.',
    },
    {
      icon: Calendar,
      title: 'Start Date',
      description: '01 June 2026',
    },
    {
      icon: Clock,
      title: 'End Date',
      description: '15 June 2026',
    },
    {
      icon: Users,
      title: 'Audience',
      description: 'All Active Users',
    },
    {
      icon: BadgeCheck,
      title: 'Status',
      description: 'Active',
    },
    {
      icon: Target,
      title: 'Goal',
      description: 'Increase conversions by 20%',
    },
    {
      icon: BarChart3,
      title: 'Reach',
      description: '12,500 Users',
    },
    {
      icon: Tag,
      title: 'Category',
      description: 'Promotional',
    },
    {
        icon: TimerReset,
        title: 'Attribution Window',
        description: '7 Days',
      },
    
  ];
const items = [
    {
        balance: "$1,250.00",
        email: "alex.t@company.com",
        id: "1",
        location: "San Francisco, US",
        name: "Alex Thompson",
        status: "Active",
    },
    {
        balance: "$600.00",
        email: "sarah.c@company.com",
        id: "2",
        location: "Singapore",
        name: "Sarah Chen",
        status: "Active",
    },
    {
        balance: "$650.00",
        email: "j.wilson@company.com",
        id: "3",
        location: "London, UK",
        name: "James Wilson",
        status: "Inactive",
    },
    {
        balance: "$0.00",
        email: "m.garcia@company.com",
        id: "4",
        location: "Madrid, Spain",
        name: "Maria Garcia",
        status: "Active",
    },
    {
        balance: "-$1,000.00",
        email: "d.kim@company.com",
        id: "5",
        location: "Seoul, KR",
        name: "David Kim",
        status: "Active",
    },
];

const campaignMetrics = [
    {
      title: 'Open Rate',
      description: '48.6%',
    },
    {
      title: 'Click Rate',
      description: '21.3%',
    },
    {
      title: 'Revenue',
      description: '$12,450',
    },
    {
      title: 'Conversion Rate',
      description: '9.8%',
    },
    {
      title: 'Engaged Users',
      description: '3,240',
    },
  ];

const Page = () => {
    return (
        <div className='p-8 pb-4 pt-2 space-y-8 '>
            <div className='flex justify-between items-center border-b pb-4'>
                <div>

                    <h4 className="scroll-m-20 mb-2 bg-muted px-2 w-max max-w-60 text-lg font-semibold tracking-tight">
                    Summer Flash Sale
                    </h4>
                    <p className="bg-muted px-2 leading-7">
                    Boost customer engagement with limited-time discounts and exclusive summer offers.
                    </p>
                </div>
                <div className='flex gap-2'>
                    <Button size={'lg'} variant={'outline'}>Edit</Button>
                    <Button size={'lg'} variant={'outline'}>View</Button>
                    <Button size={'lg'} variant={'outline'}>Delete</Button>
                    <Button size={'lg'} variant={'outline'}>View</Button>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 space-y-8'>
                
                <Card className='p-0 rounded-none gap-4 shadow-none ring-0'>
                        <CardHeader className="p-0">
                            <CardTitle>Campaign Metrics</CardTitle>
                            <CardDescription>Campaign metrics for the campaign</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0"> 
                            <div className='grid grid-cols-5 gap-4'>
                                {campaignMetrics.map((item) => (
                                    <Item variant="muted">
                                    <ItemContent>
                                      <ItemTitle>{item.title}</ItemTitle>
                                      <ItemDescription>
                                        {item.description}
                                      </ItemDescription>
                                    </ItemContent>
                                  </Item>
                            
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className='space-y-4'>
                        <div>
                            <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                                Campaign Logs
                            </h4>
                            <p className="leading-7">
                                All Campaign Logs for the campaign
                            </p>
                        </div>
                        <Table>
                            <TableHeader className="bg-transparent">
                                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
                                {items.map((item) => (
                                    <TableRow
                                        className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                                        key={item.id}
                                    >
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell className="text-right">{item.balance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                                Player Delivery Logs
                            </h4>
                            <p className="leading-7">
                                All Player Delivery Logs for the campaign
                            </p>
                        </div>
                        <Table>
                            <TableHeader className="bg-transparent">
                                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
                                {items.map((item) => (
                                    <TableRow
                                        className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                                        key={item.id}
                                    >
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell className="text-right">{item.balance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </div>
                <div className='col-span-1 '>
                    <Card className='p-0 rounded-none gap-4 shadow-none ring-0'>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Basic information about the player</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols gap-4'>
                                {campaignInformation.map((item, index) => (
                                    <div key={index} className="grid grid-cols-2">
                                        <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
                                            {item.title}
                                        </h4>

                                        <p className="leading-7">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className='my-8' />

                    <Item variant="outline">
                        <ItemContent>
                            <ItemTitle>Segment Attached</ItemTitle>
                                <ItemDescription>
                                Customers who have purchased in the last 30 days
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm">
                                <HugeiconsIcon icon={ArrowRight01FreeIcons}></HugeiconsIcon>
                                View Segment
                            </Button>
                        </ItemActions>
                    </Item>
                </div>
            </div>
        </div>
    )
}

export default Page