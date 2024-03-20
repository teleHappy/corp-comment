import { create } from "zustand"
import { TFeedbackItem } from "../lib/types"

type Store = {
  isLoading: boolean
  errorMessage: string
  feedbackItems: TFeedbackItem[]
  filteredFeedbackItems: TFeedbackItem[]
  selectedCompany: string
  getFilteredFeedbackItems: () => TFeedbackItem[]
  getCompanyList: () => string[]
  addItemToList: (text: string) => Promise<void>
  selectCompany: (company: string) => void
  fetchFeedbackItems: () => Promise<void>
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  isLoading: false,
  errorMessage: "",
  feedbackItems: [],
  filteredFeedbackItems: [],
  selectedCompany: "",
  getFilteredFeedbackItems: () => {
    const state = get()
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.company === state.selectedCompany
        )
      : state.feedbackItems
  },
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((item, index, array) => array.indexOf(item) === index)
  },
  addItemToList: async (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }))

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
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }))
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }))
    set(() => ({
      errorMessage: "",
    }))

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      )
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()
      set(() => ({
        feedbackItems: data.feedbacks,
      }))
    } catch (error) {
      set(() => ({
        errorMessage: "Something went wrong. Please try again later.",
      }))
    } finally {
      set(() => ({
        isLoading: false,
      }))
    }
  },
}))
