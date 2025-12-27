import { MessageType } from "@/types/message";
import formatFileSize from "@/utils/formatFileSize";
import { Download, Eye } from "lucide-react";
import Link from "next/link";

const FileMessage = ({ message }: { message: MessageType }) => {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 max-w-[300px] bg-black">
      {/* file info */}
      <div className="flex flex-col min-w-0">
        <span className="truncate text-sm font-medium text-white">
          {message.fileKey ?? "File"}
        </span>

        {message.size && (
          <span className="text-xs text-muted-foreground text-white">
            {formatFileSize(message.size)}
          </span>
        )}
      </div>

      {/* actions */}
      <div className="flex items-center gap-1">
        <Link
          href={message.fileUrl!}
          target="_blank"
          className="p-2 bg-gray-500/20 rounded-xl"
          title="View file"
        >
          <Eye size={18} className="text-white" />
        </Link>

        <Link
          href={message.fileUrl!}
          download
          className="p-2 bg-gray-500/20 rounded-xl"
          title="Download file"
        >
          <Download size={18} className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default FileMessage;
