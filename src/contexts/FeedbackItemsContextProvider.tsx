import { createContext, useEffect, useMemo, useState } from "react"
import { TFeedbackItem } from "../lib/types"

const FeedbackItemsContext = createContext(null)

export default function FeedbackItemsContextProvider() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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

  return <FeedbackItemsContext value={
    {
      feedbackItems,
      isLoading,
      errorMessage,
      companyList,
      handleAddToList
    }
  }
  }>FeedbackItemsContextProvider</FeedbackItemsContext>
}
