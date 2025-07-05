'use client';

import * as React from 'react';

import { NavMain } from '@/components/projects/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

const data = {
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
        },
        {
          title: 'Project #0000-000-002',
          url: '#',
        },
        {
          title: 'Project #0000-000-003',
          url: '#',
        },
      ],
    },
  ],
};

export function ProjectSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props} collapsible="none">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
