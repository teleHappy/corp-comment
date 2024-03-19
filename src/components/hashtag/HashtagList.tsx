import HashtagItem from "./HashtagItem"

type HashTagListProps = {
  companyList: string[]
  handleSelectCompany: (company: string) => void
}

export default function HashtagList({
  companyList,
  handleSelectCompany,
}: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => {
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
