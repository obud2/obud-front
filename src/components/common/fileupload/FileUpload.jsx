import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { BASE_IMG_URL } from 'src/constants';

import alert from 'src/helpers/alert';
import UploadToS3 from './UploadToS3';
import CustomImage from '../image/CustomImage';

import { SFileUpload } from './FileUpload.styled';
import { UploadingHelpMessage } from './FileUploading.styled';

import { readFile, removeStorageFile } from './FileUpload.function';
import FileUploading from './FileUploading';

/**
 *  @param {Ref} ref : 필수 값
 *
 *  @param {Promise} uploadKey : 업로드 될 키
 *
 *  @param {String} deleteId : 파일 삭제 할 시 참조 Id
 *  @param {Promise} deleteKey : 파일 삭제 할 시 API Key
 *
 *  @param {Number} limit : 업로드 파일 용량 제한 ( 기본값 5MB )
 *  @param {String} accept : 파일 포맷형식 ( 기본값 : image/* )
 *  @param {Number} maxCount : 최대 파일 업로드 수
 *
 *  @param {file} files : 파일 객체
 *  @param {String} folder : 파일 업로드 될 폴더
 *  @callback onFileHandler : 업로드 핸들러
 *
 *  파일 업로드는 업로드한 사진 확인 가능 용도 및 업로드 기능으로 만 사용 / 커스텀 버튼을 통해 업로드.
 */
const FileUpload = forwardRef((props, ref) => {
  const { uploadKey, deleteKey, onFileHandler, limit = 5, files, deleteId, folder, maxCount, accept = 'image/*' } = props;

  const fileRef = useRef();

  const [uploadList, setUploadList] = useState([]);
  const [uploadingItem, setUploadingItem] = useState({});

  const [errMessage, setErrMessage] = useState('');

  useImperativeHandle(ref, () => ({
    async open() {
      fileRef.current.click();
    },

    async upload(id) {
      if (!id) return alert('', 'Missing required key.');
      if (!(files?.length > 0)) return alert('', '업로드 된 파일이 존재하지 않습니다.');

      const param = { id };
      const upKey = uploadKey || 'images';

      param[upKey] = [];
      param.uploadKey = upKey;

      for await (const file of files) {
        const newFile = new File([file], file?.name, {
          name: file?.name,
          path: file?.path,
          lastModified: file?.lastModified,
          lastModifiedDate: file?.lastModified,
          size: file?.size,
          type: file?.type,
          webkitRelativePath: file?.webkitRelativePath,
        });

        const result = await UploadToS3(newFile, folder, id);
        const url = `${BASE_IMG_URL}${result?.key}`;

        param[upKey].push({
          key: result?.key,
          url,
          name: newFile?.name,
          type: newFile?.type,
          size: newFile?.size,
        });
      }

      return param;
    },
  }));

  useEffect(() => {
    if (files && files?.length > 0) {
      const newArr = [];

      for (let i = 0; i < files?.length; i++) {
        const url = files[i].url || files[i].path;

        if (url) {
          newArr.push({ url, ...files[i] });
        }
      }

      setUploadList([...newArr]);
    }
  }, [files]);

  useEffect(() => {
    if (errMessage) {
      setTimeout(() => {
        setErrMessage('');
      }, [5000]);
    }
  }, [errMessage]);

  const onChangeFile = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (maxCount && files.length > maxCount) {
      setErrMessage(`${maxCount}장까지 첨부 가능합니다.`);
      e.target.value = '';
      return;
    }
    if (maxCount && uploadList.length + files.length > maxCount) {
      setErrMessage(`${maxCount}장까지 첨부 가능합니다.`);
      e.target.value = '';
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const temp = files[i];

      await readFile(temp, limit)
        .then((file) => {
          temp.path = file.target.result;
        })
        .catch((err) => {
          onErrorHandler(err);
          e.target.value = '';
        });

      if (i === files.length - 1) {
        setUploadingItem(temp);
      }
    }

    e.target.value = '';
  };

  const onErrorHandler = (err) => {
    setErrMessage(err);
  };

  const removeUploadListFile = (idx, item) => {
    if (item?.key) {
      removeStorageFile(item, deleteId, uploadKey, deleteKey);
    }

    uploadList.splice(idx, 1);
    setUploadList([...uploadList]);
    onFileHandler([...uploadList], uploadKey);
  };

  const onClickCloseOptionBox = () => {
    setUploadingItem('');
  };

  const onOptionSelect = async (item) => {
    await setUploadList((prev) => [...prev, ...item]);
    await onFileHandler((prev) => [...prev, ...item], uploadKey);
    await setUploadingItem({});
  };

  return (
    <SFileUpload>
      <input
        className="fileupload-input"
        ref={fileRef}
        type="file"
        accept={accept}
        onChange={(e) => onChangeFile(e)}
        //
      />

      <FileUploading image={uploadingItem} onSubmit={onOptionSelect} onClose={onClickCloseOptionBox} />

      <div className="upload-list-view-box">
        {uploadList.map((item, idx) => (
          <div key={`file-gallery-${item?.path}`} className="upload-list-item">
            <button className="upload-delete-btn" onClick={() => removeUploadListFile(idx, item)} />

            <CustomImage
              className="upload-img"
              src={item?.path || item?.url}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100.png?text=noimage';
              }}
              alt="preview-img"
              layout="fill"
            />
          </div>
        ))}
      </div>

      <UploadingHelpMessage>
        {errMessage && (
          <div className="uploading-help-message">
            <b>* </b>
            {errMessage}
          </div>
        )}
      </UploadingHelpMessage>
    </SFileUpload>
  );
});

export default React.memo(FileUpload);
