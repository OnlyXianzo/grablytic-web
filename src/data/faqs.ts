import { faqGroups } from './faq-groups';
import type { FaqItem } from './faq-groups';

export type { FaqItem };

// Landing short list — references (not copies) of faqGroups entries,
// so an answer edit in one place updates every surface + JSON-LD.
function find(q: string): FaqItem {
  const hit = faqGroups.flatMap((g) => g.items).find((f) => f.q === q);
  if (!hit) throw new Error(`faqs.ts: question not found in faq-groups: ${q}`);
  return hit;
}

export const faqs: FaqItem[] = [
  find('Is Grablytic really free?'),
  find('Where do I download it?'),
  find('Does it require an account or login?'),
  find('Which platforms and architectures are supported?'),
  find('Can I contribute to development or packaging?'),
  find('Where does the downloaded media come from?'),
];
