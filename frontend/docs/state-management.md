# State Management Patterns

## Zustand (Preferred for shared state)

Used for auth, modals, and global UI state. See existing stores in `src/stores/`.

Example pattern: `src/stores/` contains stores like auth store. Follow existing patterns.

## React Hook Form

For form handling with validation. Used throughout the codebase.

## useReducer

For complex state logic with multiple related values that change together.

## useRef

For values that shouldn't trigger re-renders (previous values, timers, etc.).

## Avoiding Common Pitfalls

### Synchronous setState in useEffect

Don't update state synchronously when parent is also updating - causes cascading renders.

Instead:

- Defer updates with `requestAnimationFrame`
- Or initialize on user action rather than in effect

See existing component patterns in `src/features/` for examples.
