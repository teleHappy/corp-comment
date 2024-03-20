# Corp-Comment

This is from a code-along React & Next.JS course from Wesley @ https://bytegrad.com/

This particular application demonstrates the progression from prop drilling to React's Context API to using Zustand as a data store for the broswer client

## Props drilling (main branch)

This is acceptable for simple projects where props are passed down through 1-2 layers of nested components. Tech debt accrues when code gets too hard to read. There is also the issue where components re-render when props change, even if those props are not used in the pass-through component.

## React's Context API (context-api branch)

This is acceptable for small to mid-sized apps as it organizes state in a more reasonable way via the context file(s). Does not solve the re-render issue above. Context is ultimately a component that wraps around some sections of you application's component tree.

## Zustand (zustand branch)

State data and methods are consolidated in Zustand stores. Solves the above mentioned re-render issue by providing selectors. Using selectors, components will re-render only when their specific pieces of state data changes.
