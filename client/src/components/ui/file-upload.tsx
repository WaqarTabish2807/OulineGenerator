import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, X } from "lucide-react";

interface FileUploadProps {
  onChange?: (fileId: number, fileName: string) => void;
  accept?: Record<string, string[]>;
  className?: string;
  maxSize?: number;
}

export function FileUpload({
  onChange,
  accept = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/msword': ['.doc'],
    'text/plain': ['.txt'],
    'application/pdf': ['.pdf'],
  },
  className,
  maxSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<{ id: number; name: string } | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        const response = await fetch("/api/upload-sample", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to upload file");
        }

        const data = await response.json();
        
        setFile({ id: data.id, name: data.name });
        onChange?.(data.id, data.name);
        
        toast({
          title: "File uploaded successfully",
          description: `File "${data.name}" has been uploaded.`,
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Failed to upload file",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    onChange?.(0, "");
  };

  return (
    <div className={className}>
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center transition-colors cursor-pointer",
            isDragActive
              ? "border-primary/70 bg-primary/5"
              : "hover:border-primary/40 dark:hover:border-primary/40",
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="text-2xl text-gray-400 dark:text-gray-500">
              {uploading ? (
                <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary/70" />
              ) : (
                <i className="fas fa-cloud-upload-alt mx-auto"></i>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {uploading
                ? "Uploading..."
                : isDragActive
                ? "Drop the file here"
                : "Drag and drop your file here"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">or</p>
            <Button
              variant="outline"
              size="sm"
              type="button"
              disabled={uploading}
            >
              Browse Files
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supports DOCX, DOC, TXT, PDF (max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="far fa-file-alt text-primary mr-2"></i>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {file.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
