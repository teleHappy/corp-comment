import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore"
import HashtagItem from "./HashtagItem"

export default function HashtagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList())
  // const selectCompany = useFeedbackItemsStore((state) => state.selectCompany)

  return (
    <ul className="hashtags">
      {companyList.map((company: string) => {
        return <HashtagItem key={company} company={company} />
      })}
    </ul>
  )
}
