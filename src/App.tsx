import { useEffect } from "react"
import HashtagList from "./components/hashtag/HashtagList"
import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import { useFeedbackItemsStore } from "./stores/FeedbackItemsStore"

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  )

  useEffect(() => {
    fetchFeedbackItems()
  }, [fetchFeedbackItems])
  return (
    <div className="app">
      <Footer />

      <Container />

      <HashtagList />
    </div>
  )
}

export default App
