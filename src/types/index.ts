export interface Page {
  id: string;
  title: string;
  parentId: string | null;
  createdAt: Date;
  isExpanded?: boolean;
  icon?: string;
  tags?: { label: string; color: string }[];
}

export interface Workspace {
  id:string;
  name: string;
  icon: string;
}

export interface Block {
  id: string;
  type: 'text' | 'heading' | 'todo' | 'image' | 'toggle' | 'divider' | 'code' | 'brief';
  content: string;
  checked?: boolean;
  src?: string;
  language?: string;
  isExpanded?: boolean;
  children?: string[];
  pageId: string;
  parentBlockId?: string;
}

export interface BlockType {
  type: Block['type'];
  label: string;
  icon: string;
  description: string;
}
