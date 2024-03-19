import { useFeedbackItemsContext } from "../../contexts/FeedbackItemsContextProvider"
import HashtagItem from "./HashtagItem"

export default function HashtagList() {
  const { companyList, handleSelectCompany } = useFeedbackItemsContext()
  return (
    <ul className="hashtags">
      {companyList.map((company: string) => {
        return (
          <HashtagItem
            key={company}
            company={company}
            onSelectCompany={handleSelectCompany}
          />
        )
      })}
    </ul>
  )
}
