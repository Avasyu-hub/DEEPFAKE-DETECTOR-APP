import React, { useCallback, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileVideo, FileImage, X } from "lucide-react";

export default function FileUploadZone({ onFileSelect, selectedFile }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    if (validFile) {
      onFileSelect(validFile);
    }
  }, [onFileSelect]);

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  if (selectedFile) {
    return (
      <Card className="border-2 border-dashed border-green-300 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedFile.type.startsWith('video/') ? (
                <FileVideo className="w-12 h-12 text-green-600" />
              ) : (
                <FileImage className="w-12 h-12 text-green-600" />
              )}
              <div>
                <p className="font-semibold text-green-900">{selectedFile.name}</p>
                <p className="text-sm text-green-700">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                </p>
                <p className="text-xs text-green-600 mt-1">✓ File ready for analysis</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="hover:bg-red-100 text-red-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className="relative"
    >
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      
      <Card className={`border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-blue-400 ${
        dragActive ? "border-blue-400 bg-blue-50" : "border-slate-300"
      }`}>
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Upload Image or Video
              </h3>
              <p className="text-slate-600 mb-4">
                Drag and drop your files here, or click to browse
              </p>
              
              <Button
                asChild
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FileImage className="w-4 h-4" />
                <span>Images</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FileVideo className="w-4 h-4" />
                <span>Videos</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400">
              Supported formats: JPG, PNG, GIF, MP4, AVI, MOV (Max 100MB)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}