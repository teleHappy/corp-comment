import { useFeedbackItemsContext } from "../../contexts/FeedbackItemsContextProvider"
import FeedbackForm from "../feedback/FeedbackForm"
import Logo from "../Logo"
import PageHeader from "../PageHeader"
import Pattern from "../Pattern"

export default function Header() {
  const { handleAddToList } = useFeedbackItemsContext()

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeader />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  )
}
