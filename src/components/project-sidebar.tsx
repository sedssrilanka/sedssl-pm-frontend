'use client';

import * as React from 'react';

import { NavMain } from '@/components/projects/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

type Color = 'red' | 'green' | 'blue' | 'yellow';

interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  color: Color;
}

interface NavMainItem {
  title: string;
  url: string;
  isActive?: boolean;
  items?: NavItem[];
}

const data: { navMain: NavMainItem[] } = {
  navMain: [
    {
      title: 'New',
      url: '#',
      isActive: true,
      items: [
        {
          title: 'Project #0000-000-001',
          url: '#',
          isActive: true,
          color: 'red',
        },
        {
          title: 'Project #0000-000-002',
          url: '#',
          color: 'green',
        },
        {
          title: 'Project #0000-000-003',
          url: '#',
          color: 'blue',
        },
      ],
    },

    {
      title: 'Draft',
      url: '#',
      items: [
        {
          title: 'Project #0000-000-001',
          url: '#',
          color: 'red',
        },
        {
          title: 'Project #0000-000-002',
          url: '#',
          color: 'green',
        },
        {
          title: 'Project #0000-000-003',
          url: '#',
          color: 'blue',
        },
      ],
    },
    {
      title: 'Pending',
      url: '#',
      items: [
        {
          title: 'Project #0000-000-001',
          url: '#',
          color: 'red',
        },
        {
          title: 'Project #0000-000-002',
          url: '#',
          color: 'green',
        },
        {
          title: 'Project #0000-000-003',
          url: '#',
          color: 'blue',
        },
      ],
    },
  ],
};

export function ProjectSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className=" bg-white" {...props} collapsible="none">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
