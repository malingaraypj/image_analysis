export default function Button({
  children,
  textOnly,
  className = "",
  ...props
}) {
  let cssClasses = textOnly ? "text-button" : "";
  cssClasses += `${className}`.trim();
  return (
    <div>
      <button className={cssClasses} {...props}>
        {children}
      </button>
    </div>
  );
}
