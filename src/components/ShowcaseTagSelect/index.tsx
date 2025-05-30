import React, {type ReactNode} from 'react';
import {useQueryStringList} from '@docusaurus/theme-common';
import {TagType} from '@site/src/data/femtech-companies';
import { cn } from '../../lib/utils';

export default function ShowcaseTagSelect({
  tag,
  label,
  description,
  icon,
}: {
  tag: TagType;
  label: string;
  description: string;
  icon: ReactNode;
}): ReactNode {
  const [tags, setTags] = useQueryStringList('tags');
  const selected = tags.includes(tag);
  const toggleTag = () => {
    const newTags = selected
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(newTags);
  };
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm transition-all border hover:scale-[1.02]",
        selected
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary-dark hover:shadow-sm"
          : "bg-background text-foreground border-border hover:bg-muted hover:border-primary/30",
      )}
      onClick={toggleTag}
      aria-label={`${label} ${description}`}>
      <span className="mr-1">{label}</span>
      {icon}
    </button>
  );
} 