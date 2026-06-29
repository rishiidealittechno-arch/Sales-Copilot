import { ImportUsersDropdown, PlayerTable } from "./components"
import FilterPlayer from "./components/filter-player"

export default function PlayerPage() {
  return (
    <div className="space-y-4 px-8 py-4">
      <div className="flex justify-end">
        <ImportUsersDropdown />
      </div>
      <FilterPlayer />
      <PlayerTable />
    </div>
  )
}
