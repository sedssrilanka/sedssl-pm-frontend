'use client';
import { ProjectSidebar } from '@/components/project-sidebar';
import { KanbanBadge } from '@/components/ui/kanban-badge';
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
            <KanbanHeader>
              <div className="flex gap-2 w-full items-center px-2 py-2.5">
                <span className=" rounded-full h-3 w-3 bg-primary"></span>
                <h2 className=" text-lg font-medium">On-Going</h2>
              </div>
            </KanbanHeader>
            <KanbanCards>
              <KanbanCard
                key="draft-child-1"
                id="draft-child-1"
                name="draft-child-1"
                parent="draft"
                index={1}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap">
                    <KanbanBadge>Important</KanbanBadge>
                  </div>
                  <p className="m-0 flex-1 font-semibold text-lg">Task #0001</p>
                  <p className="mt-5 text-muted-foreground text-sm">
                    Lorem ipsum dolor sit amet, libre unst consectetur adispicing elit. Lorem ipsum
                    dolor sit amet, libre unst consectetur adispicing elit.
                  </p>
                </div>
              </KanbanCard>
              <KanbanCard
                key="draft-child-2"
                id="draft-child-2"
                name="draft-child-2"
                parent="draft"
                index={2}
              >
                <div className="flex  flex-col gap-1">
                  <div className="flex flex-wrap">
                    <KanbanBadge>Important</KanbanBadge>
                  </div>

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
