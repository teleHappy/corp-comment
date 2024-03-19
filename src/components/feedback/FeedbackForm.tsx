import { useState } from "react"
import { MAX_CHARS } from "../../lib/constants"

type FeedbackFormProps = {
  onAddToList: (text: string) => void
}

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("")
  const charCount = MAX_CHARS - text.length
  const [showValidIndicator, setShowValidIndicator] = useState(false)
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length > MAX_CHARS) {
      return
    }
    setText(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // basic validation
    if (text.includes("#") && text.length >= 5) {
      setShowValidIndicator(true)
      setTimeout(() => setShowValidIndicator(false), 2000)
    } else {
      setShowInvalidIndicator(true)
      setTimeout(() => setShowInvalidIndicator(false), 2000)
      return
    }
    onAddToList(text)
    setText("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder=""
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here. Remeber to #hashtag the company
      </label>
      <div>
        <p className="u-italic ">{charCount}</p>
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
