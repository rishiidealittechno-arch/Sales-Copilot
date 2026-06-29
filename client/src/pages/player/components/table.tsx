import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PLAYERS = [
  { name: "Marcus Webb", email: "marcus.webb@mail.com" },
  { name: "Elena Varga", email: "elena.varga@post.io" },
  { name: "Jonas Kline", email: "jkline88@inbox.net" },
  { name: "Priya Shah", email: "priya.shah@email.com" },
  { name: "Diego Alvarez", email: "d.alvarez@play.co" },
  { name: "Sofia Lind", email: "sofia.lind@mail.se" },
  { name: "Owen Carter", email: "owen.carter@fast.net" },
  { name: "Mei Chen", email: "mei.chen@web.de" },
  { name: "Viktor Novak", email: "v.novak@proton.me" },
  { name: "Amira Hassan", email: "amira.hassan@mail.com" },
  { name: "Luca Romano", email: "luca.romano@it.io" },
  { name: "Nina Kowalski", email: "nina.k@post.pl" },
  { name: "Ethan Brooks", email: "ethan.brooks@usa.net" },
  { name: "Yuki Tanaka", email: "yuki.t@mail.jp" },
  { name: "Andre Silva", email: "andre.silva@br.com" },
  { name: "Hannah Müller", email: "h.mueller@mail.de" },
  { name: "Ryan O'Neil", email: "ryan.oneil@ie.io" },
  { name: "Zara Khan", email: "zara.khan@uk.net" },
  { name: "Felix Dubois", email: "felix.d@fr.mail" },
  { name: "Tara Murphy", email: "tara.murphy@mail.ie" },
] as const

const churnScores = [72, 18, 45, 8, 61, 22, 55, 12, 38, 67, 5, 41, 29, 15, 52, 33, 48, 9, 58, 24]
const vipScores = [42, 88, 31, 95, 22, 76, 28, 91, 35, 18, 98, 47, 63, 85, 26, 54, 39, 92, 21, 71]
const riskScores = [28, 12, 55, 8, 62, 22, 48, 15, 38, 71, 5, 44, 33, 18, 52, 41, 36, 9, 58, 27]
const amounts = [
  "$1,240.00",
  "$8,920.50",
  "$340.25",
  "$24,100.00",
  "$89.00",
  "$3,450.75",
  "$560.00",
  "$19,800.00",
  "$1,005.40",
  "$220.10",
  "$42,000.00",
  "$2,180.30",
  "$6,700.00",
  "$11,250.00",
  "$415.60",
  "$990.00",
  "$1,888.90",
  "$30,400.00",
  "$275.00",
  "$4,120.00",
]
const lastDeposits = [
  "Today, 09:14",
  "Yesterday",
  "3d ago",
  "Today, 14:02",
  "12d ago",
  "1w ago",
  "2d ago",
  "Today, 11:30",
  "5d ago",
  "28d ago",
  "Today, 08:05",
  "4d ago",
  "1d ago",
  "2w ago",
  "6d ago",
  "Today, 16:45",
  "9d ago",
  "Yesterday",
  "15d ago",
  "3h ago",
]

const rows = PLAYERS.map((p, i) => ({
  id: `player-${i + 1}`,
  churnScore: churnScores[i],
  vipScore: vipScores[i],
  riskScore: riskScores[i],
  name: p.name,
  email: p.email,
  amount: amounts[i],
  lastDeposit: lastDeposits[i],
}))

export default function PlayerTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Email</TableHead>
              <TableHead className="h-9 py-2">Churn score</TableHead>
              <TableHead className="h-9 py-2">VIP score</TableHead>
              <TableHead className="h-9 py-2">Risk score</TableHead>
              <TableHead className="h-9 py-2">Amount</TableHead>
              <TableHead className="h-9 py-2">Last deposit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow onClick={()=>{window.location.href = `/player-details`}} key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.email}</TableCell>
                <TableCell className="py-2 tabular-nums">{row.churnScore}</TableCell>
                <TableCell className="py-2 tabular-nums">{row.vipScore}</TableCell>
                <TableCell className="py-2 tabular-nums">{row.riskScore}</TableCell>
                <TableCell className="py-2 tabular-nums">{row.amount}</TableCell>
                <TableCell className="py-2">{row.lastDeposit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
