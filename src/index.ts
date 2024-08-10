const useBlobToFile = (dataUrl: string, filename: string) => {
  const parts = dataUrl?.split(";");
  const contentType = parts[0]?.split(":")[1];
  const base64 = parts[1]?.split(",")[1];

  /**
   * Convert the base64-encoded content to binary data
   */

  const binaryData = atob(base64);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  /**
   *  Create a Blob from the binary data
   */
  const blob = new Blob([uint8Array], { type: contentType });

  /**
   * Create a File object with the specified filename
   */
  const file = new File([blob], filename, { type: contentType });
  /**
   * Create a url for previewing the object. It will in the format of https://your-website/url-object
   * Assuming this is a hosted version. If it is in local it will be in http://localhost:your-port/url-object
   */
  const previewUrl = URL.createObjectURL(file);
  return { file, previewUrl };
};

export default useBlobToFile;
