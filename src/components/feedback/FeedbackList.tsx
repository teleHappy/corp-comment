import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner"
import ErrorMessage from "../ErrorMessage"
import { TFeedbackItem } from "../../lib/types"

type FeedbackListProps = {
  isLoading: boolean
  errorMessage: string
  feedbackItems: TFeedbackItem[]
}

export default function FeedbackList({
  isLoading,
  errorMessage,
  feedbackItems,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map((feedbackItem: TFeedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
      ))}
    </ol>
  )
}
