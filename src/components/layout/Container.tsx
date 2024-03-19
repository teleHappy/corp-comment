import { TFeedbackItem } from "../../lib/types"
import Header from "./Header"
import FeedbackList from "../feedback/FeedbackList"

type ContainerProps = {
  isLoading: boolean
  errorMessage: string
  feedbackItems: TFeedbackItem[]
  handleAddToList: (text: string) => void
}

export default function Container({
  isLoading,
  errorMessage,
  feedbackItems,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />

      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  )
}
