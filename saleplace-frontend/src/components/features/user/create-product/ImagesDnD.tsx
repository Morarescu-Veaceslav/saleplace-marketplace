import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { useTranslations } from "next-intl"

type ImageItem = {
    id: string
    src: string
}

type Props = {
    items: ImageItem[]
    onDelete?: (index: number) => void
    onReorder?: (from: number, to: number) => void
    showMainBadge?: boolean
    isDragDisabled?: boolean
}

export function ImagesDnD({
    items,
    onDelete,
    onReorder,
    showMainBadge,
    isDragDisabled
}: Props) {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination || !onReorder || isDragDisabled) return
        onReorder(result.source.index, result.destination.index)
    }

    const t = useTranslations('dashboard.product.imagesDnD')

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="grid grid-cols-3 gap-3 mt-4"
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                isDragDisabled={true}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="relative"
                                    >
                                        <img
                                            src={item.src}
                                            className="w-full h-32 object-cover rounded-md"
                                        />

                                        {showMainBadge && index === 0 && (
                                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 rounded">
                                                {t('main')}
                                            </span>
                                        )}

                                        {onDelete && !isDragDisabled && (
                                            <button
                                                type="button"
                                                onClick={() => onDelete(index)}
                                                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}