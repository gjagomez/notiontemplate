import React from 'react';
import { useApp } from '../context/AppContext';
import EditableBlock from './EditableBlock';

interface BlockEditorProps {
  pageId: string;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ pageId }) => {
  const { getPageBlocks, addBlock, updateBlock, deleteBlock } = useApp();
  const blocks = getPageBlocks(pageId);

  const handleBlockContentChange = (blockId: string, content: string) => {
    updateBlock(blockId, { content });
  };

  const handleKeyDown = (e: React.KeyboardEvent, blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const newBlock = addBlock(pageId, blockId);
      setTimeout(() => {
        const newBlockElement = document.getElementById(`block-${newBlock.id}`);
        const input = newBlockElement?.querySelector('input, textarea') as HTMLElement;
        input?.focus();
      }, 0);
    } else if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      const blockIndex = blocks.findIndex(b => b.id === blockId);
      if (blockIndex > 0) {
        const prevBlock = blocks[blockIndex - 1];
        deleteBlock(blockId);
        setTimeout(() => {
          const prevBlockElement = document.getElementById(`block-${prevBlock.id}`);
          const input = prevBlockElement?.querySelector('input, textarea') as HTMLElement;
          input?.focus();
        }, 0);
      }
    }
  };

  return (
    <div className="relative">
      <div className="space-y-1">
        {blocks.map((block) => (
          <EditableBlock
            key={block.id}
            block={block}
            onContentChange={handleBlockContentChange}
            onKeyDown={handleKeyDown}
            onToggleCheck={(checked) => updateBlock(block.id, { checked })}
            onUpdateBlock={(updates) => updateBlock(block.id, updates)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockEditor;
