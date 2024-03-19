import HashtagList from "./components/hashtag/HashtagList"
import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider"

function App() {
  return (
    <div className="app">
      <Footer />

      <FeedbackItemsContextProvider>
        <Container />

        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  )
}

export default App
