import { useEffect, useState } from 'react';

/**
 * Converts a data URL to a File object and generates a preview URL.
 * Handles both Base64-encoded and non-Base64 data URLs.
 * Automatically cleans up object URLs to prevent memory leaks.
 */
const useBlobToFile = (dataUrl: string, filename: string) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    /**
     * Process the data URL and convert it to a File object with a preview URL.
     * Handles Base64 and non-Base64 data URLs.
     */
    const processDataUrl = () => {
      const isBase64 = dataUrl.includes("base64");
      let data: string | Uint8Array = '';
      let contentType: string;
      const parts = dataUrl.split(";");

      if (isBase64) {
        /**
         * Extract the content type and Base64-encoded content from the data URL
         */
        contentType = parts[0].split(":")[1];
        data = parts[1].split(",")[1];

        /**
         * Convert the Base64-encoded content to binary data
         */
        const binaryData = atob(data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          /**
           * Converts each character to byte value
           */
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        data = uint8Array;
      } else {
        /**
         * This handles URL-encoded binary data
         */
        contentType = parts[0].split(":")[1];
        data = decodeURIComponent(parts[1].split(",")[1]);
      }

      /**
       * Create a Blob from the binary data or URL-decoded data
       */
      const blob = new Blob([data], { type: contentType });

      /**
       * Create a File object with the specified filename
       */
      const fileObj = new File([blob], filename, { type: contentType });

      /**
       * Generate a preview URL for the File object
       */
      objectUrl = URL.createObjectURL(fileObj);

      setFile(fileObj);
      setPreviewUrl(objectUrl);
    };

    processDataUrl();

    /**
     * Cleanup function to revoke the object URL and free memory
     */
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [dataUrl, filename]);

  return { file, previewUrl };
};

export default useBlobToFile;
