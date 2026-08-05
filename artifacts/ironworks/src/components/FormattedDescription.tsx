type FormattedDescriptionProps = {
  text: string;
  className?: string;
  paragraphClassName?: string;
};

export function FormattedDescription({
  text,
  className = '',
  paragraphClassName = '',
}: FormattedDescriptionProps) {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return null;

  const paragraphs = normalized.split(/\n\s*\n/g).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={`whitespace-pre-line ${paragraphClassName}`}>
          {paragraph.trim()}
        </p>
      ))}
    </div>
  );
}
