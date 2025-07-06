'use client';
import { ProjectSidebar } from '@/components/project-sidebar';
import {
  DragEndEvent,
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/kanban';

export default function Home() {
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
  };

  return (
    <div className=" flex">
      <ProjectSidebar />
      <div className=" flex w-full">
        <KanbanProvider onDragEnd={handleDragEnd}>
          <KanbanBoard key="draft" id="draft">
            <KanbanHeader>Header</KanbanHeader>
            <KanbanCards>
              <KanbanCard
                key="draft-child-1"
                id="draft-child-1"
                name="draft-child-1"
                parent="draft"
                index={1}
              >
                <div className="flex flex-col gap-1">
                  <p className="m-0 flex-1 font-medium text-sm">Hello</p>
                  <p className="m-0 text-muted-foreground text-xs">World</p>
                </div>
              </KanbanCard>
              <KanbanCard
                key="draft-child-2"
                id="draft-child-2"
                name="draft-child-2"
                parent="draft"
                index={2}
              >
                <div className="flex flex-col gap-1">
                  <p className="m-0 flex-1 font-medium text-sm">Hello</p>
                  <p className="m-0 text-muted-foreground text-xs">World</p>
                </div>
              </KanbanCard>
            </KanbanCards>
          </KanbanBoard>
        </KanbanProvider>
      </div>
    </div>
  );
}
