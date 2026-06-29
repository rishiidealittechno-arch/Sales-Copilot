import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ATTRIBUTES = [
  { label: "VIP tier", key: "vip_tier" },
  { label: "Lifetime value (USD)", key: "ltv_usd" },
  { label: "Favorite game slug", key: "favorite_game" },
  { label: "KYC status", key: "kyc_status" },
  { label: "Risk band", key: "risk_band" },
  { label: "Last deposit amount", key: "last_deposit_cents" },
  { label: "Preferred channel", key: "preferred_channel" },
  { label: "Country of residence", key: "country_code" },
  { label: "Self-exclusion until", key: "self_exclusion_until" },
  { label: "Acquisition source", key: "acquisition_source" },
  { label: "Affiliate code", key: "affiliate_code" },
  { label: "Device fingerprint hash", key: "device_fp_hash" },
  { label: "Email verified at", key: "email_verified_at" },
  { label: "Phone verified", key: "phone_verified" },
  { label: "Responsible gaming limit", key: "rg_daily_limit" },
  { label: "Bonus eligibility", key: "bonus_eligible" },
  { label: "Churn score (model)", key: "churn_score" },
  { label: "Session count (30d)", key: "sessions_30d" },
  { label: "Payment method fingerprint", key: "payment_fp" },
  { label: "Custom cohort tag", key: "cohort_tag" },
] as const

const types = [
  "Enum",
  "Number",
  "String",
  "String",
  "Enum",
  "Number",
  "Enum",
  "String",
  "Datetime",
  "String",
  "String",
  "String",
  "Datetime",
  "Boolean",
  "Number",
  "Boolean",
  "Number",
  "Number",
  "String",
  "String",
] as const

const rows = ATTRIBUTES.map((attr, i) => ({
  id: `attr-${i + 1}`,
  label: attr.label,
  key: attr.key,
  type: types[i],
  pii: (["No", "Yes", "No", "Yes", "No", "Yes", "No", "Yes", "Yes", "No", "No", "Yes", "Yes", "No", "No", "No", "No", "No", "Yes", "No"] as const)[i],
  segmentFilter: (["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "No", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "No", "Yes"] as const)[i],
  created: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"][i],
  owner: (["Marketing", "Data", "Product", "Compliance", "Risk", "Finance", "Marketing", "Legal", "Compliance", "Growth", "Partners", "Security", "Product", "Lifecycle", "RG", "Promotions", "Data", "Analytics", "Fraud", "Marketing"] as const)[i % 10],
  status: (["Active", "Active", "Active", "Active", "Active", "Draft", "Active", "Active", "Active", "Active", "Active", "Deprecated", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Draft"] as const)[i],
}))

export function AttributesTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Display name</TableHead>
              <TableHead className="h-9 py-2">Field key</TableHead>
              <TableHead className="h-9 py-2">Type</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.label}</TableCell>
                <TableCell className="py-2 font-mono text-xs">{row.key}</TableCell>
                <TableCell className="py-2">{row.type}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
