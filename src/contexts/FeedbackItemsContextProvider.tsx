import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { TFeedbackItem } from "../lib/types"

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  companyList: string[]
  handleAddToList: (text: string) => void
  filteredFeedbackItems: TFeedbackItem[]
  handleSelectCompany: (company: string) => void
}

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
)

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
    [feedbackItems, selectedCompany]
  )

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((item, index, array) => array.indexOf(item) === index),
    [feedbackItems]
  )

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.startsWith("#"))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      badgeLetter: companyName[0].toUpperCase(),
      company: companyName,
      daysAgo: 0,
    }

    setFeedbackItems([...feedbackItems, newItem])

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    )
  }

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setErrorMessage("")
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        )
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        setFeedbackItems(data.feedbacks)
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        filteredFeedbackItems,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  )
}

// we could make this a hook then adjust all of ythe relevant imports
// eslint-disable-next-line react-refresh/only-export-components
export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext)

  if (!context) {
    throw new Error(
      "useFeedbackItems must be used within a FeedbackItemsContextProvider"
    )
  }

  return context
}
