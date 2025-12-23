"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageType } from "@/types/message";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { useParams } from "next/navigation";

type PropsType = {
  editModalActive: boolean;
  setEditModelActive: (value: boolean) => void;
  message: MessageType;
};

const EditModal = ({
  editModalActive,
  setEditModelActive,
  message,
}: PropsType) => {
  const [text, setText] = useState(message.text);
  const [loading, setLoading] = useState(false);

  const { contactId } = useParams();

  const socket = useSocket("chat");

  const handleSave = async () => {
    if (!text.trim() || text === message.text) {
      setEditModelActive(false);
      return;
    }

    setLoading(true);

    try {
      socket.emit("edit-message", { messageId: message.id, text, contactId });

      setEditModelActive(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={editModalActive} onOpenChange={setEditModelActive}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ویرایش پیام</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            className="h-12"
            placeholder="متن پیام را ویرایش کنید..."
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setEditModelActive(false)}
            disabled={loading}
          >
            انصراف
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
            ذخیره تغییرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
