import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore"

type HashtagItemProps = {
  company: string
}
export default function HashtagItem({ company }: HashtagItemProps) {
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany)
  return (
    <li>
      <button onClick={() => selectCompany(company)}>#{company}</button>
    </li>
  )
}
