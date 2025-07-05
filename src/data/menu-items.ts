import {
  AlarmClockCheck,
  Folder,
  Lightbulb,
  Network,
  NotebookPen,
  ScrollText,
  ShieldUser,
  Users,
} from 'lucide-react';

export const projectsItems = [
  {
    title: 'Proposals',
    url: '#',
    icon: Lightbulb,
  },
  {
    title: 'Projects',
    url: '#',
    icon: NotebookPen,
    isActive: true,
  },
  {
    title: 'My Tasks',
    url: '#',
    icon: AlarmClockCheck,
  },
  {
    title: 'Reports',
    url: '#',
    icon: ScrollText,
  },
];

export const membersItems = [
  {
    title: 'Directory',
    url: '#',
    icon: Folder,
  },
  {
    title: 'Hierarchy',
    url: '#',
    icon: Network,
  },
  {
    title: 'Chapters',
    url: '#',
    icon: Users,
  },
  {
    title: 'Roles',
    url: '#',
    icon: ShieldUser,
  },
];
