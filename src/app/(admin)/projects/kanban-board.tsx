'use client';
import { KanbanBadge } from '@/components/ui/kanban-badge';
import {
  DragEndEvent,
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanFooter,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/kanban';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessagesSquare, PlusCircle, SquareCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function KanbanBoardProject() {
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
  };
  return (
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
              <p className="mt-3 text-muted-foreground text-sm">
                Lorem ipsum dolor sit amet, libre unst consectetur adispicing elit. Lorem ipsum
                dolor sit amet, libre unst consectetur adispicing elit.
              </p>

              <div className=" flex items-center justify-between mt-5">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                  <Avatar>
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/48531182"
                      alt="@mayura-andrew"
                    />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/100839102"
                      alt="@thawshi-srikanth"
                    />
                    <AvatarFallback>TS</AvatarFallback>
                  </Avatar>
                </div>
                <div className=" flex item-center gap-2">
                  <div className=" flex flex-wrap">
                    <MessagesSquare width={20} height={20} className=" text-primary" />
                    <KanbanBadge variant={'ghost'}>11</KanbanBadge>
                  </div>
                  <div className=" flex flex-wrap">
                    <SquareCheck width={20} height={20} className=" text-primary" />
                    <KanbanBadge variant={'ghost'}>88+</KanbanBadge>
                  </div>
                </div>
              </div>
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
        <KanbanFooter>
          <Button variant={'secondary'}>
            <PlusCircle></PlusCircle>
          </Button>
        </KanbanFooter>
      </KanbanBoard>
    </KanbanProvider>
  );
}
