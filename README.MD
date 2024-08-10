# `useBlobToFile`

A React hook for effortlessly converting Data URLs / Blob files into File objects, complete with a preview URL for easy viewing and uploading.

## 📦 Installation

You can install the package using npm, Yarn, pnpm, or Bun:

### Using npm

```bash
npm install use-blob-to-file
```

### Using Yarn

```bash
yarn add use-blob-to-file
```

### Using pnpm

```bash
pnpm add use-blob-to-file
```

### Using Bun

```bash
bun add use-blob-to-file
```

## 🔧 Usage

Import and use the `useBlobToFile` hook in your React components:

```jsx
import React from 'react';
import useBlobToFile from 'use-blob-to-file';

const MyComponent = () => {
  const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA...'; // Replace with your Data URL
  const filename = 'my-image.png';
  
  const { file, previewUrl } = useBlobToFile({ dataUrl, filename });

  return (
    <div>
      <img src={previewUrl} alt="Preview" />
      <a href={previewUrl} download={filename}>Download File</a>
    </div>
  );
};

export default MyComponent;
```

## 🌟 Features

- **Convert Data URLs to File Objects**: Easily convert base64-encoded Data URLs into File objects.
- **Preview URL**: Generate a preview URL to view the file before uploading.
- **TypeScript Support**: Fully typed with TypeScript for a better development experience.

## 🛠️ React Hook

### `useBlobToFile`

```typescript
const useBlobToFile = (args: DataUrlToFileProps) => {
  // Returns an object with `file` and `previewUrl`
}
```

#### Parameters

- **`args`** (`DataUrlToFileProps`): The parameters for conversion.
  - `dataUrl` (string): The Data URL to convert.
  - `filename` (string): The name of the file to be created.

#### Returns

- **`file`** (`File`): The created File object.
- **`previewUrl`** (`string`): A URL for previewing the file.

## 📝 License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.