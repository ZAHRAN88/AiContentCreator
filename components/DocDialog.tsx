import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { ScrollArea } from "@/components/ui/scroll-area";

  import { ArrowLeft } from "lucide-react";
  
  interface DocDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
  }
  
  export function DocDialog({ isOpen, onClose, title, content }: DocDialogProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl h-[80vh] bg-gray-900 border-gray-800">
          <DialogHeader className="border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <DialogTitle className="text-xl font-semibold text-white">{title}</DialogTitle>
            </div>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div className="prose prose-invert max-w-none">
              {content}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }