import { motion } from 'framer-motion'
import { Sidebar } from "../components/Sidebar"
import { TaskList } from '../components/TaskList'

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-1"
    >
      <Sidebar />
      <TaskList />
    </motion.div>
  )
}