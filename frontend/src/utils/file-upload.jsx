import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { FaRegImage, FaRegFileVideo } from "react-icons/fa6";

function FileUploadInput({ type = "image", onSelect, showSelection }) {
  const fileRef = useRef(null);
  const [fileSelected, setFileSelected] = useState(null);

  const handleFileSelection = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelect(file);
      setFileSelected(file);
    }
  };

  return (
    <>
      <Input
        ref={fileRef}
        type="file"
        accept={
          type === "image"
            ? "image/*"
            : type === "video"
            ? "video/*"
            : undefined
        }
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        className={`${
          showSelection
            ? "border border-slate-400 rounded-md overflow-x-clip"
            : ""
        } flex justify-start items-center gap-5`}
      >
        <Button
          type="button"
          onClick={handleFileSelection}
          className="flex items-center gap-2 hover:bg-blue-500"
        >
          {type === "image" && <FaRegImage className="h-5 w-5" />}
          {type === "video" && <FaRegFileVideo className="h-5 w-5" />}
        </Button>
        {showSelection && (
          <p className="text-sm text-gray-600">
            {fileSelected ? fileSelected.name : "Select file"}
          </p>
        )}
      </div>
    </>
  );
}

export default FileUploadInput;
