import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { settings } from 'carbon-components';
import { Upload16, TrashCan16, DocumentAdd32 } from '@carbon/icons-react';
import classNames from 'classnames';

const { prefix } = settings;

/* const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
  position: 'absolute',
  top: '0',
  height: '38rem',
  width: '550px',
  backgroundColor: 'unset',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
}; */

FileUploader.propTypes = {
  onFileUpload: PropTypes.func,
  reportBugState: PropTypes.object,
  removeFile: PropTypes.func,
  onFileFailure: PropTypes.func,
};

function FileUploader({ onFileUpload, reportBugState, removeFile, onFileFailure }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const reader = new FileReader();

      reader.onabort = () => {};
      reader.onerror = () => {};
      reader.onload = () => {
        onFileUpload(acceptedFiles[0]);
      };

      acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
    },
    [onFileUpload]
  );
  const onDropRejected = useCallback(() => {
    // file was too large, greater than 50mb
    onFileFailure();
  }, [onFileFailure]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // isDragAccept,
    // isDragReject,
  } = useDropzone({
    onDrop,
    maxSize: 52428800,
    onDropRejected,
    // noClick: true,
    // noKeyboard: true,
  });

  /* const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  ); */

  return (
    <div
      style={{
        minHeight: '5rem',
        padding: '0.25rem',
        position: reportBugState.isDragActive ? 'static' : 'relative',
      }}
    >
      <div
        className={classNames(`${prefix}--bmrg-report-bug__drop-zone`, {
          '--is-active': isDragActive,
          '--is-container-dragging': reportBugState.isDragActive,
        })}
        {...getRootProps()}
      >
        {isDragActive && (
          <div className={`${prefix}--bmrg-report-bug__drop-it`}>
            <p>Drop it</p>
          </div>
        )}
      </div>
      <input {...getInputProps()} />
      <div
        className={classNames(`${prefix}--bmrg-report-bug__file-drop`, {
          '--is-active': isDragActive,
        })}
      >
        {reportBugState.uploadedFiles && reportBugState.uploadedFiles.length > 0 ? (
          <p>Choose another file or drop it anywhere</p>
        ) : (
          <p>Choose a file or drop it anywhere</p>
        )}
        <Upload16 style={{ marginLeft: '10px', height: '18px', width: '18px' }} />
      </div>
      <div>
        {reportBugState.uploadedFiles && reportBugState.uploadedFiles.length > 0 && (
          <div className={`${prefix}--bmrg-report-bug-attachment-list`}>
            {reportBugState.uploadedFiles.map((file) =>
              file.type.startsWith('image/') ? (
                <div className={`${prefix}--bmrg-report-bug-attachment-container`}>
                  <img
                    key={file.name}
                    src={file.preview}
                    className={`${prefix}--bmrg-report-bug-attachment-container__preview`}
                    alt="preview"
                  />
                  <p className={`${prefix}--bmrg-report-bug-attachment-container__filename`}>
                    {file.name}
                  </p>
                  <button
                    style={{
                      padding: '0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeFile(file)}
                  >
                    <TrashCan16
                      fill="#FBFCFC"
                      className={`${prefix}--bmrg-report-bug-attachment-container__img`}
                    />
                  </button>
                </div>
              ) : (
                <div className={`${prefix}--bmrg-report-bug-attachment-container`}>
                  <DocumentAdd32
                    fill="#f2f4f8"
                    className={`${prefix}--bmrg-report-bug-attachment-container__preview`}
                  />
                  <p className={`${prefix}--bmrg-report-bug-attachment-container__filename`}>
                    {file.name}
                  </p>
                  <button
                    style={{
                      padding: '0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeFile(file)}
                  >
                    <TrashCan16
                      fill="#FBFCFC"
                      className={`${prefix}--bmrg-report-bug-attachment-container__img`}
                    />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
