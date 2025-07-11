import { redirect } from 'next/navigation';

import { ProjectSidebar } from '@/components/project-sidebar';
import { KanbanBoardProject } from './kanban-board';

import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/login');
  }

  return (
    <div className=" flex">
      <ProjectSidebar />
      <div className=" flex w-full overflow-x-scroll p-5">
        <KanbanBoardProject />
      </div>
    </div>
  );
}
