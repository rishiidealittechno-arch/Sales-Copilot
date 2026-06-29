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
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    VenusAndMars,
    Briefcase,
    Globe,
    IdCard,
} from 'lucide-react';
import { HugeiconsIcon } from "@hugeicons/react";
import { MapPinpoint01Icon, PhoneCall } from "@hugeicons/core-free-icons";
const basicInformation = [
    {
        icon: User,
        title: 'Name',
        description: 'John Doe',
    },
    {
        icon: Mail,
        title: 'Email',
        description: 'john.doe@example.com',
    },
    {
        icon: Phone,
        title: 'Phone',
        description: '+1 (555) 123-4567',
    },
    {
        icon: Calendar,
        title: 'Date of Birth',
        description: '12 March 1995',
    },
    {
        icon: MapPin,
        title: 'Location',
        description: 'New York, USA',
    },
    {
        icon: VenusAndMars,
        title: 'Gender',
        description: 'Male',
    },
    {
        icon: Briefcase,
        title: 'Occupation',
        description: 'Software Engineer',
    },
    {
        icon: Globe,
        title: 'Website',
        description: 'www.johndoe.com',
    },
    {
        icon: IdCard,
        title: 'User ID',
        description: 'USR-102938',
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

const Page = () => {
    return (
        <div className='p-8 pb-4 pt-2 space-y-8 '>
            <div className='flex justify-between items-center border-b pb-4'>
                <div>

                    <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Clerk Johnson
                    </h4>
                    <p className="leading-7">
                        Clerk Johnson is a software engineer at Google. He is a master of JavaScript and React.
                    </p>
                </div>
                <div className='flex gap-2'>
                    <Button size={'lg'} variant={'outline'}>Edit</Button>
                    <Button size={'lg'} variant={'outline'}>View</Button>
                    <Button size={'lg'} variant={'outline'}>Delete</Button>
                    <Button size={'lg'} variant={'outline'}>View</Button>
                </div>
            </div>
            <div className='grid grid-cols-3'>
                <div className='col-span-2 space-y-8'>

                    <div className='space-y-4'>
                        <div>
                            <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                                Payments
                            </h4>
                            <p className="leading-7">
                                All Payment History of the player
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
                                Events
                            </h4>
                            <p className="leading-7">
                                All Events of the player
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
                            <div className='grid grid-cols-2 gap-4'>
                                {basicInformation.map((item) => (
                                    <div>
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

                    <Card className='p-0 rounded-none gap-4 shadow-none ring-0'>
                        <CardHeader>
                            <CardTitle>Identity & Preferences</CardTitle>
                            <CardDescription>Identity and preferences of the player</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-2 gap-4'>
                                {basicInformation.map((item,) => (
                                    <div>
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
                            <ItemTitle>Phone Number</ItemTitle>
                            <ItemDescription>
                                +1 (555) 123-4567
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm">
                                <HugeiconsIcon icon={PhoneCall}></HugeiconsIcon>
                                Call
                            </Button>
                        </ItemActions>
                    </Item>

                    <Separator className='my-8' />
                    <Item variant="outline">
                        <ItemContent>
                            <ItemTitle>Address</ItemTitle>
                            <ItemDescription>
                                123 Main St, Anytown, USA
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm">
                                <HugeiconsIcon icon={MapPinpoint01Icon}></HugeiconsIcon>
                                View on Map
                            </Button>
                        </ItemActions>
                    </Item>
                </div>
            </div>
        </div>
    )
}

export default Page