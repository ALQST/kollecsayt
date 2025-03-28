'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (!file.type.startsWith('application/pdf')) {
      setUploadError('Yalnız PDF faylları qəbul edilir');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      await onUpload(file);
      
      // Create preview URL for PDF
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } catch (error) {
      setUploadError('Fayl yükləmə zamanı xəta baş verdi');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p>Fayl yüklənir...</p>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2">
              {isDragActive
                ? 'Faylı bura buraxın'
                : 'PDF faylını yükləmək üçün bura klikləyin və ya sürükləyin'}
            </p>
            <p className="text-sm text-gray-500">Maksimum fayl ölçüsü: 10MB</p>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {uploadError}
        </div>
      )}

      {preview && !uploading && !uploadError && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded flex items-center justify-between">
          <span>Fayl uğurla yükləndi!</span>
          <button
            onClick={() => setPreview(null)}
            className="text-sm underline hover:no-underline"
          >
            Təmizlə
          </button>
        </div>
      )}
    </div>
  );
}