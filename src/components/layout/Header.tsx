import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore"
import FeedbackForm from "../feedback/FeedbackForm"
import Logo from "../Logo"
import PageHeader from "../PageHeader"
import Pattern from "../Pattern"

export default function Header() {
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList)
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeader />
      <FeedbackForm onAddToList={addItemToList} />
    </header>
  )
}
