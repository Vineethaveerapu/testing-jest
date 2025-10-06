import type { PageLink, Service } from '@/types';

export const pageLinks: PageLink[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Contact Us',
    href: '/contact-us',
  },
];

export const ourServices: Service[] = [
  {
    id: 1,
    title: 'Weeding',
    description:
      'Weeding is the process of removing unwanted plants from a garden or lawn. It is a necessary part of maintaining a healthy garden and lawn.',
  },
  {
    id: 2,
    title: 'Watering',
    description:
      'Watering is the process of adding water to a garden or lawn. It is a necessary part of maintaining a healthy garden and lawn.',
  },
  {
    id: 3,
    title: 'Pruning and Trimming',
    description:
      'Pruning and trimming is the process of cutting back plants to maintain a healthy garden and lawn.',
  },
];
