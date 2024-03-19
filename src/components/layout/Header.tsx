import FeedbackForm from "../feedback/FeedbackForm"
import Logo from "../Logo"
import PageHeader from "../PageHeader"
import Pattern from "../Pattern"

type HeaderProps = {
  handleAddToList: (text: string) => void
}

export default function Header({ handleAddToList }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeader />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  )
}
