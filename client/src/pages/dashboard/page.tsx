import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from '@/components/ui/item';
import { GoogleGeminiIcon, VerticalResizeFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
export const agents = [
  {
    id: "research",
    title: "Research Agent",
    description:
      "Research any topic by gathering information from trusted sources, summarizing findings, and generating structured reports with citations.",
    category: "Research",
  },
  {
    id: "market-intelligence",
    title: "Market Intelligence",
    description:
      "Analyze industries, competitors, market trends, customer segments, and emerging opportunities for strategic decision making.",
    category: "Business",
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    description:
      "Evaluate financial statements, KPIs, profitability, cash flow, valuation metrics, and investment opportunities.",
    category: "Finance",
  },
  {
    id: "document-analyst",
    title: "Document Analyst",
    description:
      "Extract insights from PDFs, Word documents, spreadsheets, contracts, and reports with contextual summaries.",
    category: "Documents",
  },
  {
    id: "Competitor",
    title: "Competitor Analysis",
    description:
      "Compare products, pricing, positioning, strengths, weaknesses, and market presence across competitors.",
    category: "Business",
  },
  {
    id: "news-monitor",
    title: "News Monitor",
    description:
      "Track the latest news, announcements, acquisitions, funding rounds, and industry developments in real time.",
    category: "Monitoring",
  },
  {
    id: "web-scraper",
    title: "Web Research",
    description:
      "Collect and organize information from websites, blogs, documentation, and public resources into structured knowledge.",
    category: "Research",
  },
  {
    id: "report-generator",
    title: "Report Generator",
    description:
      "Transform research findings into professional reports, executive summaries, presentations, and briefs.",
    category: "Reporting",
  },
  {
    id: "legal-review",
    title: "Legal Review",
    description:
      "Review contracts, policies, compliance documents, and legal agreements to identify important clauses and risks.",
    category: "Legal",
  },
  {
    id: "customer-insights",
    title: "Customer Insights",
    description:
      "Analyze reviews, surveys, support tickets, and feedback to uncover customer pain points and opportunities.",
    category: "Analytics",
  },
];

const stats = [
  {
    title: "Total Agents",
    value: 100,
  },
  {
    title: "Total Users",
    value: 100,
  },
  {
    title: "Total Deals",
    value: 100,
  },
  {
    title: "Total Revenue",
    value: 100,
  },
]
const Page = () => {
  return (
    <div className='space-y-8'>

      <div>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Welcome back, John Doe</h2>
        <p className='text-sm text-muted-foreground'>You've made 24 sales this month.</p>
      </div>

      <section>
        <div className='pl-2'>
          <h2 className='scroll-m-20 text-md font-semibold tracking-tight'>Stats</h2>
          <p className='text-sm text-muted-foreground'>Overview of activity and key metrics across your workspace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
          {stats.map((stts) => (
            <Item key={stts.title} variant="muted" className="w-full group/item hover:bg-muted h-full items-start border-none ring-0 rounded-2xl cursor-pointer shadow-none transition-all duration-300">
              <ItemContent>
                <ItemTitle>{stts.title}</ItemTitle>
                <ItemDescription>{stts.value}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </section>

      <section>
        <div className='pl-2'>
          <h2 className='scroll-m-20 text-md font-semibold tracking-tight'>Available Agents</h2>
          <p className='text-sm text-muted-foreground'>Select an agent to get started</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-4 gap-4">
          {agents.map((agent) => (
            <Item key={agent.id} variant="muted" className="w-full group/item hover:bg-muted h-full items-start border-none ring-0 rounded-2xl cursor-pointer shadow-none transition-all duration-300">
              <ItemContent>
                <ItemTitle>{agent.title}</ItemTitle>
                <ItemDescription>{agent.description}</ItemDescription>
                <ItemFooter>
                  <p>{agent.category}</p>
                </ItemFooter>
              </ItemContent>
              <ItemActions className='transition-colors group-hover/item:text-primary'>
                <HugeiconsIcon icon={GoogleGeminiIcon} fill="currentColor" strokeWidth={1} className='-rotate-45' />
              </ItemActions>
            </Item>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Page