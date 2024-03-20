import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner"
import ErrorMessage from "../ErrorMessage"
import { TFeedbackItem } from "../../lib/types"
import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore"

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading)
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage)
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  )

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map((feedbackItem: TFeedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
      ))}
    </ol>
  )
}
