import React, { useState, useCallback, useMemo } from 'react';
import { Upload, X, ArrowUpCircle, Loader2 } from 'lucide-react';
import './QRCodeSubmit.css'; // Import CSS file

const QRCodeSubmit = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILES = 8;
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;

  const filesCount = files.length;
  const isLimitReached = filesCount >= MAX_FILES;
  const canUpload = filesCount > 0 && !isLoading;

  const handleFileChange = useCallback((event) => {
    setMessage('');
    const newFilesArray = Array.from(event.target.files);

    const validNewFiles = newFilesArray.filter(file => {
      if (!file.type.startsWith('image/')) {
        setMessage(prev => prev + `\nSkipped: ${file.name} not an image.`);
        return false;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setMessage(prev => prev + `\nSkipped: ${file.name} too large.`);
        return false;
      }
      if (files.some(f => f.name === file.name && f.size === file.size)) {
        setMessage(prev => prev + `\nSkipped: ${file.name} already selected.`);
        return false;
      }
      return true;
    });

    const availableSlots = MAX_FILES - filesCount;
    const filesToAdd = validNewFiles.slice(0, availableSlots);

    if (filesToAdd.length < validNewFiles.length) {
      setMessage(prev => prev + `\nMaximum ${MAX_FILES} files allowed.`);
    }

    setFiles(prev => [...prev, ...filesToAdd]);
    event.target.value = null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMessage('');
  };

  const handleUpload = useCallback(async () => {
    if (!canUpload) return;
    setMessage('Uploading...');
    setIsLoading(true);

    const formData = new FormData();
    files.forEach(f => formData.append('qr', f));

    try {
      const res = await fetch('http://localhost:5004/QR/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage(`Successfully uploaded ${filesCount} files!`);
        setFiles([]);
      } else {
        setMessage(`Upload failed: ${res.statusText}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [canUpload, files, filesCount]);

  const filePreviews = useMemo(() => (
    files.map((file, index) => (
      <div key={index} className="file-card">
        <div className="file-preview">
          <img src={URL.createObjectURL(file)} alt={file.name} />
        </div>
        <div className="file-info">
          <p>{file.name}</p>
          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button className="remove-btn" onClick={() => handleRemoveFile(index)}>
          <X size={16} />
        </button>
      </div>
    ))
  ), [files]);

  return (
    <div className="uploader">
      <h1>Admin Image Upload</h1>

      <div className="upload-box">
        <p>Selected: {filesCount} / {MAX_FILES}</p>
        <label className={`upload-label ${isLimitReached ? 'disabled' : ''}`}>
          <Upload />
          <span>{isLimitReached ? 'Limit Reached' : 'Click to select images'}</span>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} disabled={isLimitReached || isLoading}/>
        </label>
      </div>

      {filesCount > 0 && (
        <div className="preview-list">
          {filePreviews}
        </div>
      )}

      <div className="actions">
        {message && <p className="message">{message}</p>}
        <button onClick={handleUpload} disabled={!canUpload || isLoading} className="upload-btn">
          {isLoading ? <><Loader2 className="spin"/> Uploading...</> : <><ArrowUpCircle/> Start Upload</>}
        </button>
      </div>
    </div>
  );
};

export default QRCodeSubmit;
