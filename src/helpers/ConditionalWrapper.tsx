export const ConditionalWrapper: React.FC<{
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
  fallbackWrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
}> = ({ condition, wrapper, fallbackWrapper, children }) =>
  condition ? wrapper(children) : fallbackWrapper(children);
