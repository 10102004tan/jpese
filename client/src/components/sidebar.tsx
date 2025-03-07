import { Select, SelectItem } from "@heroui/react"
import { BookOpen, HomeIcon, SquareChartGantt } from "lucide-react"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  const sources = [
    {
      key: "N4",
      label: "Minano Nihongo N4"
    }, {
      key: "N5",
      label: "Minano Nihongo N5"
    }
  ]
  return (
    <div>
      {/*  */}
      <Select
        className="max-w-xs mb-2 bg-[#EBF5FF] rounded font-semibold"
        items={sources}
        label="Khóa học"
        defaultSelectedKeys={["N4"]}
        placeholder="Chọn khóa học"
      >
        {(source) => <SelectItem key={source.key}>
          {source.label}
        </SelectItem>}
      </Select>
      {/* use select  */}
      {/* ul */}
      <ul className="flex flex-col gap-3">
        <li className="text-white">
          <NavLink to="/" className={({ isActive }) =>
            `flex text-sm items-center gap-3 px-3 py-4 font-semibold rounded-md transition-all ${isActive
              ? "bg-[#EBF5FF] text-[#2888FA]"
              : "hover:bg-[#EBF5FF] hover:text-[#2888FA]"
            }`
          }>
            <HomeIcon size={18} />
            Overview
          </NavLink>
        </li>
        <li className="text-white">
          <NavLink to="/study-plan" className={({ isActive }) =>
            `flex text-sm items-center gap-3 px-3 py-4 font-semibold rounded-md transition-all ${isActive
              ? "bg-[#EBF5FF] text-[#2888FA]"
              : "hover:bg-[#EBF5FF] hover:text-[#2888FA]"
            }`
          }>
            <SquareChartGantt size={18} />

            Study Plan
          </NavLink>
        </li>
        <li className="text-white">
          <NavLink to="/my-course" className={({ isActive }) =>
            `flex text-sm items-center gap-3 px-3 py-4 font-semibold rounded-md transition-all ${isActive
              ? "bg-[#EBF5FF] text-[#2888FA]"
              : "hover:bg-[#EBF5FF] hover:text-[#2888FA]"
            }`
          }>
            <BookOpen size={18} />
            My Course
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
