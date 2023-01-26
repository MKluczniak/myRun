import { IoBarChartSharp } from "react-icons/io5"
import { MdQueryStats } from "react-icons/md"
import { FaWpforms } from "react-icons/fa"
import { ImProfile } from "react-icons/im"

const links = [
  // {
  //   id: 1,
  //   text: "Statystyki",
  //   path: "/",
  //   icon: <IoBarChartSharp />,
  // },
  {
    id: 2,
    text: "Wszytkie Moje biegi",
    path: "all-runs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "Dodaj bieg",
    path: "addRun",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "Profil",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: "Kalkulator Biegowy",
    path: "calculator",
    icon: <IoBarChartSharp />,
  },
  {
    id: 6,
    text: "Plan treningowy",
    path: "training-plan",
    icon: <IoBarChartSharp />,
  },
]

export default links
