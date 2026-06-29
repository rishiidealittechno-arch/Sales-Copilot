import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
    {
        id: 1,
        name: "Welcome email",
        description: "Runs when a user signs up; sends onboarding and next-step links.",
    },
    {
        id: 4,
        name: "Order confirmed",
        description: "Sends receipt and shipping updates when purchase completes.",
    },
    {
        id: 5,
        name: "Segment entered",
        description: "Starts a journey when a profile matches a saved segment rule.",
    },
]
const CardsPageTrigger = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-4">
            {cards.map((card) => (
                <Card key={card.id} className="w-full h-full border-none !p-0 ring-0 rounded-2xl cursor-pointer shadow-none transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">{card.name}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">
                            Add trigger
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default CardsPageTrigger