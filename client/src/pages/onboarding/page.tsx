import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { DashedLineCircleFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
const items = [
  {
    content:
      "Add and manage products in your store effortlessly. Control product details, pricing, and inventory levels all in one place. Create categories to keep your products organized and easily accessible.",
    id: "1",
      title: "Add products",
    },
  {
    content:
      "Scan the QR code or send yourself the link to get the app. The mobile app is where you'll manage orders, track inventory, and view analytics on the go..",
    id: "2",
    title: "Get the point of sale application?",
  },
  {
    content:
      "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
    id: "3",
    title: "Is coss ui optimized for performance?",
  },
];

const sectionsWithItems = [
  {
    title: "Set up your online store",
    items: items,
  },
  {
    title: "Store settings",
    items: items,
  },
  {
    title: "Prepare for launch",
    items: items,
  },
]

const Page = () => {
  return (
    <div className="max-w-5xl min-h-screen mx-auto p-20">
      <div className="">
        <form className="space-y-4">
          {sectionsWithItems.map((item)=>{
            return (
              <FieldGroup>
              <FieldSet>
                <FieldLegend>{item.title}</FieldLegend>
                <FieldGroup>
                  <Field>
                    <Accordion
                      className="-space-y-px w-full"
                      collapsible
                      defaultValue="3"
                      type="single"
                    >
                      {items.map((item) => (
                        <AccordionItem
                          className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
                          key={item.id}
                          value={item.id}
                        >
                          <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 gap-3">
                            <HugeiconsIcon icon={DashedLineCircleFreeIcons} size={20} />
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2 text-muted-foreground">
                            {item.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
            )
          })}
        </form>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center gap-2">
            <CardTitle>
            Boost your online presence
            </CardTitle>
            <Badge variant={'outline'}>Free Plan</Badge>
            </div>
            <CardDescription>
            Take your e-commerce business to the next level with advanced features designed to increase sales and improve customer experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>
              Upgrade
            </Button>
          </CardContent>
        </Card>
        </div>
  )
}

export default Page